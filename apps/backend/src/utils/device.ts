// 获取真实的ip地址，非本机ip地址
// 一定要配置nginx
// http {
// # 允许信任的代理服务器列表
//   proxy_set_header X-Real-IP $remote_addr;
//   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
// }
/**
 * 获取真实的ip地址，非本机ip地址,用于记录用户登录ip
 * @param ctx 
 * @returns 
 */
export const getIp = (ctx: any) => {
  let ip = ctx.request.header['x-forwarded-for'] ||
    ctx.request.header['x-real-ip'] ||
    ctx.request.header['cf-connecting-ip'] ||
    ctx.request.ip; // 如果没有代理，直接使用ctx.request.ip

  // 处理X-Forwarded-For可能包含多个IP地址的情况
  if (typeof ip === 'string' && ip.includes(',')) {
    ip = ip.split(',')[0].trim(); // 取第一个IP
  }
  return ip
}
