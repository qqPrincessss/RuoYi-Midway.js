import { request } from "./default";
interface UploadParams {
  url: string;
  file: FormData;
  token: string;
  type?: "default" | "chunk" | "onProgress";
  onProgress?: (progress: number) => void;
}
/**
 * 上传文件
 * @param params
 * @returns
 */
export const upload = async (params: UploadParams) => {
  const { url, file, token, type = "default", onProgress } = params;
  switch (type) {
    case "default":
      return uploadDefault(url, file, token);
    case "onProgress":
      return uploadWithProgress(url, file, token, onProgress);
    case "chunk":
      return uploadWithChunk(url, file, token);
    default:
      return uploadDefault(url, file, token);
  }
};
/**
 * 上传文件并监听进度
 * @param url
 * @param file
 * @param token
 * @param onProgress
 * @returns
 */
const uploadWithProgress = async (
  url: string,
  file: FormData,
  token: string,
  onProgress?: (progress: number) => void
) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Authorization", token ? `Bearer ${token}` : "");
    xhr.setRequestHeader("Content-Type", "multipart/form-data");

    xhr.upload.onprogress = e => {
      if (e.lengthComputable && onProgress) {
        const percentComplete = (e.loaded / e.total) * 100;
        onProgress(percentComplete);
      }
    };

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(100);
        resolve(xhr.response);
      } else {
        reject(new Error(`上传失败: ${xhr.status}`));
      }
    };

    xhr.onerror = function () {
      onProgress?.(0);
      reject(new Error("上传失败"));
    };

    xhr.send(file);
  });
};
/**
 * 上传文件默认方式
 * @param url
 * @param file
 * @param token
 * @returns
 */
const uploadDefault = async (url: string, file: FormData, token: string) => {
  return request(url, {
    method: "PUT",
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: file
  });
};
/**
 * 上传文件分块方式
 * @param url
 * @param file
 * @param token
 * @param onProgress
 * @returns
 */
const uploadWithChunk = async (url: string, file: FormData, token: string, onProgress?: (progress: number) => void) => {
  // todo 待完善
  console.log("uploadWithChunk", url, file, token, onProgress);
};
