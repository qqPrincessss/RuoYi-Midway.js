import { fetch } from '@tauri-apps/plugin-http'
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

const baseURL = import.meta.env.VITE_APP_BASE_API
const timeout = 10000

// Tauri HTTP 请求封装
async function tauriRequest(config) {
  const { url, method = 'GET', data, params, headers = {}, responseType } = config

  // 构建完整 URL
  let fullUrl = url.startsWith('http') ? url : baseURL + url

  // 处理 GET 请求的 params
  if (method.toUpperCase() === 'GET' && params) {
    const queryString = tansParams(params)
    fullUrl = fullUrl + '?' + queryString.slice(0, -1)
  }

  // 设置默认 headers
  const requestHeaders = {
    'Content-Type': 'application/json;charset=utf-8',
    ...headers
  }

  // 添加 token
  const isToken = headers.isToken === false
  if (getToken() && !isToken) {
    requestHeaders['Authorization'] = 'Bearer ' + getToken()
  }

  // 防重复提交检查
  const isRepeatSubmit = headers.repeatSubmit === false
  if (!isRepeatSubmit && (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT')) {
    const requestObj = {
      url: fullUrl,
      data: typeof data === 'object' ? JSON.stringify(data) : data,
      time: new Date().getTime()
    }
    const sessionObj = cache.session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url
      const s_data = sessionObj.data
      const s_time = sessionObj.time
      const interval = 1000
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交'
        console.warn(`[${s_url}]: ` + message)
        throw new Error(message)
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
  }

  try {
    // 使用 Tauri 的 fetch
    const response = await fetch(fullUrl, {
      method: method.toUpperCase(),
      headers: requestHeaders,
      body: data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined,
      timeout: timeout
    })

    // 处理二进制响应
    if (responseType === 'blob' || responseType === 'arraybuffer') {
      const blob = await response.blob()
      return blob
    }

    // 获取响应数据
    const resData = await response.json()

    // 处理业务状态码
    const code = resData.code || 200
    const msg = errorCode[code] || resData.message || resData.msg || errorCode['default']

    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true
        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        })
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
      throw new Error('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
      throw new Error(msg)
    } else if (code === 601) {
      throw new Error(msg)
    } else if (code !== 200) {
      ElNotification.error({ title: msg })
      throw new Error('error')
    } else {
      return resData
    }
  } catch (error) {
    console.log('err' + error)
    let message = error.message || '系统异常'

    // 处理特殊的网络错误
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    }

    ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    throw error
  }
}

// 通用下载方法
export async function download(url, params, filename, config) {
  downloadLoadingInstance = ElLoading.service({
    text: '正在下载数据，请稍候',
    background: 'rgba(0, 0, 0, 0.7)'
  })

  try {
    const data = await tauriRequest({
      url,
      method: 'POST',
      data: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
      ...config
    })

    const isBlob = blobValidate(data)
    if (isBlob) {
      const blob = new Blob([data])
      saveAs(blob, filename)
    } else {
      const resText = await data.text()
      const rspObj = JSON.parse(resText)
      const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
      ElMessage.error(errMsg)
    }
    downloadLoadingInstance.close()
  } catch (r) {
    console.error(r)
    ElMessage.error('下载文件出现错误，请联系管理员！')
    downloadLoadingInstance.close()
  }
}

// 导出统一接口
export default {
  get(url, params, config = {}) {
    return tauriRequest({ url, method: 'GET', params, ...config })
  },
  post(url, data, config = {}) {
    return tauriRequest({ url, method: 'POST', data, ...config })
  },
  put(url, data, config = {}) {
    return tauriRequest({ url, method: 'PUT', data, ...config })
  },
  delete(url, config = {}) {
    return tauriRequest({ url, method: 'DELETE', ...config })
  }
}
