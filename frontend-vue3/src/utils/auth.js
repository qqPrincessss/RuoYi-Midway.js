import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// 检测是否在 Tauri 环境
const isTauri = typeof window !== 'undefined' && (
  window.__TAURI__ !== undefined ||
  window.__TAURI_INTERNALS__ !== undefined ||
  window.location.protocol === 'tauri:'
)

export function getToken() {
  if (isTauri) {
    // Tauri 环境使用 localStorage
    return localStorage.getItem(TokenKey)
  } else {
    // 浏览器环境使用 Cookie
    return Cookies.get(TokenKey)
  }
}

export function setToken(token) {
  if (isTauri) {
    // Tauri 环境使用 localStorage
    localStorage.setItem(TokenKey, token)
    return token
  } else {
    // 浏览器环境使用 Cookie
    return Cookies.set(TokenKey, token)
  }
}

export function removeToken() {
  if (isTauri) {
    // Tauri 环境使用 localStorage
    localStorage.removeItem(TokenKey)
  } else {
    // 浏览器环境使用 Cookie
    return Cookies.remove(TokenKey)
  }
}
