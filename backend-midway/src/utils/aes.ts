/** 接口加解密 */
import { enc, AES, mode, pad } from 'crypto-js';

// 默认的 KEY 与 iv
const key = enc.Utf8.parse('qingqing')
const iv = enc.Utf8.parse('xierfloat')
/**
 * AES加密 ：字符串 key iv  返回base64
 */
export const Encrypt = (word: any) => {
  const src = enc.Utf8.parse(word);
  const encrypted = AES.encrypt(src, key, {
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7
  })
  return enc.Base64.stringify(encrypted.ciphertext)
}
/**
 * AES 解密 ：字符串 key iv  返回base64
 */
export const Decrypt = (word: any) => {
  const base64 = enc.Base64.parse(word)
  const src = enc.Base64.stringify(base64)
  const decrypt = AES.decrypt(src, key, {
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7
  })
  return enc.Utf8.stringify(decrypt);
}
