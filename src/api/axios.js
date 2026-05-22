/**
 * axios实例
 */
import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: `${config_settings.address_node}`,
});
service.defaults.timeout = 1000 * 60;
service.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=utf-8";

/* 添加请求拦截器 */
service.interceptors.request.use(
  (config) => {
    // 无需token验证
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/* 添加响应拦截器 */
service.interceptors.response.use(
  (res) => {
    // 无需身份验证处理
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;
