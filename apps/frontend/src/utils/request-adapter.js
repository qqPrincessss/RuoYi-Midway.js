// HTTP 请求适配器 - 自动选择 Tauri HTTP 或 axios

// 检测是否在 Tauri 环境中运行
const isTauri = typeof window !== 'undefined' && window.__TAURI__ !== undefined

let requestModule
let downloadFunc
let isReloginObj

if (isTauri) {
  // Tauri 环境 - 使用原生 HTTP 客户端（支持 Cookie）
  const tauriRequest = await import('./request-tauri.js')
  requestModule = tauriRequest.default
  downloadFunc = tauriRequest.download
  isReloginObj = tauriRequest.isRelogin
} else {
  // 浏览器环境 - 使用 axios
  const axiosRequest = await import('./request.js')
  requestModule = axiosRequest.default
  downloadFunc = axiosRequest.download
  isReloginObj = axiosRequest.isRelogin
}

export default requestModule
export const download = downloadFunc
export const isRelogin = isReloginObj
