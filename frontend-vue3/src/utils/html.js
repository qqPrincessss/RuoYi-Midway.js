 export const stripHtml = (html, maxLength = 100) => {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  const text = tmp.textContent || tmp.innerText || ''
  const firstLine = text.replace(/\n/g, ' ').trim()
  return firstLine.length > maxLength ? firstLine.substring(0, maxLength) + '...' : firstLine
}
