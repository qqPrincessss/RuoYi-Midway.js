/**
 * 发起 HTTP 请求
 * @param url 请求 URL
 * @param options 请求选项
 * @returns 响应数据
 */
export const request = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`请求失败：${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    return await Promise.reject(err);
  }
};
/**
 * 发起 GET 请求
 * @param url 请求 URL
 * @param data 请求参数
 * @param token 授权令牌
 * @returns 响应数据
 */
export const get = (url: string, data: Record<string, string>, token?: string) => {
  const queryString = new URLSearchParams(data);
  return request(`${url}${data ? "?" + queryString.toString() : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
};
/**
 * 发起 POST 请求
 * @param url 请求 URL
 * @param data 请求参数
 * @param token 授权令牌
 * @returns 响应数据
 */
export const post = (url: string, data: Record<string, string>, token?: string) => {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(data)
  });
};
/**
 * 发起 PUT 请求
 * @param url 请求 URL
 * @param data 请求参数
 * @param token 授权令牌
 * @returns 响应数据
 */
export const put = (url: string, data: Record<string, string>, token?: string) => {
  return request(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(data)
  });
};
/**
 * 发起 DELETE 请求
 * @param url 请求 URL
 * @param data 请求参数
 * @param token 授权令牌
 * @returns 响应数据
 */
export const del = (url: string, data: Record<string, string>, token?: string) => {
  return request(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(data)
  });
};
