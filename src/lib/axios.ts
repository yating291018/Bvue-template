import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from "element-plus";

const instance = axios.create({
  withCredentials: true,
  timeout: 100000
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

const resHanlder = (res: AxiosResponse, resolve: any, reject: any) => {
  const { code } = res.data || {};
  if (code === 0) {
    resolve(res.data);
  } else {
    if (code !== 0) {
      const { message } = res.data || {};
      ElMessage.error(message);
    }
    reject(res);
  }
};

export default {
  post (url: string, params: any, config?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      instance.post(url, params, config).then((res) => {
        resHanlder(res, resolve, reject);
      }).catch(err => {
        reject(err);
      });
    });
  },
  get (url: string, params: any, config?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      instance.get(url, { params, ...config }).then((res) => {
        resHanlder(res, resolve, reject);
      }).catch(err => {
        reject(err);
      });
    });
  }
};
