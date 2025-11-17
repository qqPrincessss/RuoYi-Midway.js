/** 接口加解密 */
import CryptoJS from 'crypto-js/crypto-js'

// 默认的 KEY 与 iv
const key = CryptoJS.enc.Utf8.parse('qingqing')
const iv = CryptoJS.enc.Utf8.parse('xierfloat')

// 是否开启加密
export const isOpenCrypt = true;

/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt (word) {
  const src = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 */
export function Decrypt (word) {
  const base64 = CryptoJS.enc.Base64.parse(word)
  const src = CryptoJS.enc.Base64.stringify(base64)

  const decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt);
}
