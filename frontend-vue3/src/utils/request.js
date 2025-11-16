import axios from 'axios'
import { ElNotification, ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { tansParams, blobValidate } from '@/utils/ruoyi'
import cache from '@/plugins/cache'
import { saveAs } from 'file-saver'
import useUserStore from '@/store/modules/user'

let downloadLoadingInstance
// 是否显示重新登录
export let isRelogin = { show: false }

// Tauri 环境下的文件保存
let tauriSaveFile = null
const isTauriEnv = typeof window !== 'undefined' && (window.__TAURI__ !== undefined || window.__TAURI_INTERNALS__ !== undefined || window.location.protocol === 'tauri:')

if (isTauriEnv) {
  // 异步加载 Tauri 文件插件
  Promise.all([import('@tauri-apps/plugin-dialog'), import('@tauri-apps/plugin-fs')])
    .then(([dialogModule, fsModule]) => {
      tauriSaveFile = async (blob, defaultName) => {
        try {
          // 打开保存文件对话框
          const filePath = await dialogModule.save({
            defaultPath: defaultName,
            filters: [
              {
                name: 'All Files',
                extensions: ['*']
              }
            ]
          })

          if (filePath) {
            // 将 Blob 转换为 Uint8Array
            const arrayBuffer = await blob.arrayBuffer()
            const uint8Array = new Uint8Array(arrayBuffer)

            // 写入文件
            await fsModule.writeFile(filePath, uint8Array)
            ElMessage.success('文件已保存: ' + filePath)
          }
        } catch (error) {
          console.error('Tauri 文件保存失败:', error)
          ElMessage.error('文件保存失败: ' + error.message)
        }
      }
    })
    .catch((err) => {
      console.error('加载 Tauri 文件插件失败:', err)
    })
}

// 检测是否在 Tauri 环境中运行
// Tauri 2.x 使用 window.__TAURI_INTERNALS__ 或检查 Tauri API 是否存在
const isTauri =
  typeof window !== 'undefined' &&
  (window.__TAURI__ !== undefined ||
    window.__TAURI_INTERNALS__ !== undefined ||
    // 也可以通过检查协议来判断
    window.location.protocol === 'tauri:')

// Tauri 环境下的 fetch 加载 Promise
let tauriFetchPromise = null
if (isTauri) {
  tauriFetchPromise = import('@tauri-apps/plugin-http')
    .then((module) => {
      return module.fetch
    })
    .catch((err) => {
      console.error('❌ Failed to load Tauri HTTP plugin:', err)
      return null
    })
}

// 自定义 Tauri axios 适配器
async function tauriAdapter(config) {
  // 等待 Tauri fetch 加载完成
  const tauriFetch = await tauriFetchPromise

  if (!tauriFetch) {
    throw new Error('Tauri HTTP plugin not available, falling back to default adapter')
  }

  let { url, method, data, headers, timeout, responseType, baseURL } = config

  // 检查 URL 协议：Tauri HTTP plugin 只支持 HTTP/HTTPS
  if (url.includes('://') && !url.startsWith('http://') && !url.startsWith('https://')) {
    // 非 HTTP 协议（如 tauri://、file:// 等），拒绝处理
    throw new Error(`Tauri HTTP plugin does not support ${url.split('://')[0]} protocol. URL: ${url}`)
  }

  // 处理 baseURL 拼接（axios 的默认行为）
  if (baseURL && !url.startsWith('http://') && !url.startsWith('https://')) {
    url = baseURL.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '')
  }

  // 最终检查：确保 URL 是完整的 HTTP/HTTPS URL
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    throw new Error(
      `❌ Invalid URL for Tauri HTTP plugin: "${url}". ` +
      `The URL must be a complete HTTP/HTTPS URL. ` +
      `baseURL: "${baseURL || 'undefined'}". ` +
      `This usually means VITE_APP_BASE_API is not configured correctly. ` +
      `Please check your .env.production file.`
    )
  }

  try {
    // 处理请求体 - 正确处理 FormData
    let body = undefined
    let finalHeaders = { ...headers }

    if (data) {
      if (typeof data === 'string') {
        body = data
      } else if (data instanceof FormData) {
        // FormData 直接传递，不进行序列化
        body = data
        // 移除 content-type，让浏览器/Tauri 自动设置 multipart/form-data 的 boundary
        delete finalHeaders['content-type']
        delete finalHeaders['Content-Type']
      } else {
        // 其他对象序列化为 JSON
        body = JSON.stringify(data)
      }
    }

    const response = await tauriFetch(url, {
      method: method.toUpperCase(),
      headers: finalHeaders,
      body: body,
      timeout: timeout || 10000
    })

    // 处理二进制响应
    if (responseType === 'blob' || responseType === 'arraybuffer') {
      const blob = await response.blob()
      return {
        data: blob,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config,
        request: {
          responseType: config.responseType
        }
      }
    }

    // 处理 JSON 响应
    let resData
    try {
      const text = await response.text()
      resData = text ? JSON.parse(text) : {}
    } catch (e) {
      console.error('Failed to parse JSON response:', e)
      resData = {}
    }

    const axiosResponse = {
      data: resData,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config,
      request: {
        responseType: config.responseType
      }
    }

    // 模拟 axios 的行为：HTTP 错误状态码应该抛出错误
    if (!response.ok) {
      const axiosError = new Error(response.statusText || 'Request failed')
      axiosError.config = config
      axiosError.code = `ERR_BAD_RESPONSE`
      axiosError.request = {}
      axiosError.response = axiosResponse
      axiosError.isAxiosError = true
      axiosError.toJSON = function () {
        return {
          message: this.message,
          name: this.name,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response?.status
        }
      }
      throw axiosError
    }

    return axiosResponse
  } catch (error) {
    console.error('❌ Tauri fetch error:', error)

    // 如果已经是 axios 错误（从上面的 HTTP 错误检查抛出的），直接重新抛出
    if (error.isAxiosError) {
      throw error
    }

    // 否则创建新的 axios 错误对象（网络错误等）
    const axiosError = new Error(error.message || 'Tauri fetch failed')
    axiosError.config = config
    axiosError.code = error.code || 'ERR_NETWORK'
    axiosError.request = {}
    axiosError.response = null
    axiosError.isAxiosError = true
    axiosError.toJSON = function () {
      return {
        message: this.message,
        name: this.name,
        stack: this.stack,
        config: this.config,
        code: this.code
      }
    }
    throw axiosError
  }
}

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 获取 baseURL，确保在 Tauri 环境中必须是完整的 HTTP/HTTPS URL
const getBaseURL = () => {
  const envBaseURL = import.meta.env.VITE_APP_BASE_API

  // 在 Tauri 环境中，baseURL 必须是完整的 HTTP/HTTPS URL
  if (isTauri) {
    if (!envBaseURL || (!envBaseURL.startsWith('http://') && !envBaseURL.startsWith('https://'))) {
      // 如果环境变量未配置，使用 fallback API URL
      return 'https://sxxt.gdmu-stuorg.com/prod-api'
    }
  }

  return envBaseURL
}

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: getBaseURL(),
  // 超时
  timeout: 10000,
  // 跨域请求时发送Cookie
  withCredentials: true,
  // 在 Tauri 环境中使用自定义适配器
  adapter: isTauri ? tauriAdapter : undefined
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime()
      }
      const sessionObj = cache.session.getJSON('sessionObj')
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        cache.session.setJSON('sessionObj', requestObj)
      } else {
        const s_url = sessionObj.url // 请求地址
        const s_data = sessionObj.data // 请求数据
        const s_time = sessionObj.time // 请求时间
        const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
        if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
          const message = '数据正在处理，请勿重复提交'
          console.warn(`[${s_url}]: ` + message)
          return Promise.reject(new Error(message))
        } else {
          cache.session.setJSON('sessionObj', requestObj)
        }
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const msg = errorCode[code] || res.data.message || res.message || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true
        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', { confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning' })
          .then(() => {
            isRelogin.show = false
            useUserStore()
              .logOut()
              .then(() => {
                location.href = '/index'
              })
          })
          .catch(() => {
            isRelogin.show = false
          })
      }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
      // 不在这里显示消息，交给错误拦截器统一处理
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      // 不在这里显示消息，交给错误拦截器统一处理
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      ElNotification.error({ title: msg })
      return Promise.reject('error')
    } else {
      return Promise.resolve(res.data)
    }
  },
  (error) => {
    console.log('err' + error)
    let { message } = error

    // 优先使用后端返回的错误信息
    if (error.response && error.response.data) {
      const backendMessage = error.response.data.message || error.response.data.msg
      if (backendMessage) {
        message = backendMessage
      }
    }

    // 如果没有 response，但有 message（来自响应拦截器的 Promise.reject）
    // 这种情况下 message 已经是后端返回的错误信息了，直接使用
    if (!error.response && !message) {
      message = '系统异常'
    }

    // 处理特殊的网络错误
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }

    ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

// 通用下载方法
export async function download(url, params, filename, config) {
  downloadLoadingInstance = ElLoading.service({ text: '正在下载数据，请稍候', background: 'rgba(0, 0, 0, 0.7)' })
  return service
    .post(url, params, {
      transformRequest: [
        (params) => {
          return tansParams(params)
        }
      ],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
      ...config
    })
    .then(async (data) => {
      const isBlob = blobValidate(data)
      if (isBlob) {
        const blob = new Blob([data])

        // Tauri 环境使用原生文件对话框
        if (isTauriEnv && tauriSaveFile) {
          await tauriSaveFile(blob, filename)
        } else {
          // 浏览器环境使用 file-saver
          saveAs(blob, filename)
        }
      } else {
        const resText = await data.text()
        const rspObj = JSON.parse(resText)
        const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
        ElMessage.error(errMsg)
      }
      downloadLoadingInstance.close()
    })
    .catch((r) => {
      console.error(r)
      ElMessage.error('下载文件出现错误，请联系管理员！')
      downloadLoadingInstance.close()
    })
}

export default service
