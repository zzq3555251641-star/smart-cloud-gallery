import axios from "axios";
import {message} from "ant-design-vue";

// 区分开发和生产环境
const DEV_BASE_URL = "http://localhost:8123";
// const PROD_BASE_URL = "http://81.69.229.63";
// 创建 Axios 实例
const myAxios = axios.create({
    baseURL: DEV_BASE_URL,
    timeout: 10000,
    withCredentials: true,
});

// 全局请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 显式以 UTF-8 字节发送 JSON 请求体，避免中文参数被按系统本地编码（GBK）发送
    const data = config.data
    const isJsonBody =
      data != null &&
      typeof data === 'object' &&
      !(data instanceof FormData) &&
      !(data instanceof Blob) &&
      !(data instanceof URLSearchParams) &&
      !(data instanceof ArrayBuffer) &&
      !ArrayBuffer.isView(data)
    if (isJsonBody) {
      config.data = new TextEncoder().encode(JSON.stringify(data))
      config.headers.set('Content-Type', 'application/json;charset=UTF-8')
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// 全局响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    const { data } = response
    // 未登录
    if (data.code === 40100) {
      // 不是获取用户信息的请求，并且用户目前不是已经在用户登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes('user/get/login') &&
        !window.location.pathname.includes('/user/login')
      ) {
        message.warning('请先登录')
        window.location.href = `/user/login?redirect=${window.location.href}`
      }
    }
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)

export default myAxios;
