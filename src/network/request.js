import axios from 'axios';

export function request (config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:5000/village/v1',
    timeout: 50000
  });
  // 2.请求拦截器
  instance.interceptors.request.use(config => {
    return config;
  }, error => {
    return Promise.reject(error);
  });
  // 3.响应拦截
  instance.interceptors.response.use(res => {
    try {
      if (res.data) {
        return res.data;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  }, error => {
    try {
      return {
        meta: {
          status: error.response.status
        }
      };
    } catch (e) {
      console.log(e);
    }
  });
  // 4.发送网络请求
  return instance(config);
}
