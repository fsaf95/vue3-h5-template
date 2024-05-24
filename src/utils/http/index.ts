import Axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type AxiosRequestConfig
} from "axios";
import { ContentTypeEnum, ResultEnum } from "@/enums/requestEnum";
import NProgress from "../progress";
import { showFailToast } from "vant";
import "vant/es/toast/style";
import {
  calculateValidTime,
  getRefreshToken,
  getToken,
  getTokenType,
  handleLocalStorage,
  isRefreshTokenExpired
} from "@/utils/token";
import { smsRefresh } from "@/api";
import router from '@/router'; // 根据你的项目结构来导入 router

let isRefreshing = false; // 是否正在刷新的标记

// 默认 axios 实例请求配置
const configDefault = {
  headers: {
    "Content-Type": ContentTypeEnum.FORM_URLENCODED
  },
  timeout: 0,
  baseURL: import.meta.env.VITE_BASE_API,
  data: {}
};

class Http {
  // 当前实例
  private static axiosInstance: AxiosInstance;
  // 请求配置
  private static axiosConfigDefault: AxiosRequestConfig;

  // 请求拦截
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      config => {
        NProgress.start();
        // 发送请求前，可在此携带 token
        if (getToken()) {
          // 有效时间小于0分钟
          if (isRefreshTokenExpired()) {
            if (!isRefreshing) {
              isRefreshing = true;
              smsRefresh({ token_type: getTokenType(), refresh_token: getRefreshToken() })
                .then((res) => {
                  if (res.code !== 0) {

                  } else {
                    handleLocalStorage(res.data); // 存储新的token和刷新token
                    calculateValidTime(res.data.expires_in); // 计算token的有效时间
                    isRefreshing = false;
                  }
                }).catch(error => {

              });
            }
          } else {
            // 有效时间不小于一分钟
            if (!isRefreshTokenExpired(true)) {
              config.headers["Authorization"] = getTokenType() + " " + getToken();
            }
          }
        }
        return config;
      },
      (error: AxiosError) => {
        showFailToast(error.message);
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done();
        // 与后端协定的返回字段
        const { code, msg, data } = response.data;
        // 判断请求是否成功
        const isSuccess =
          data &&
          Reflect.has(response.data, "code") &&
          code === ResultEnum.SUCCESS;
        if (isSuccess) {
          return response.data;
        } else {
          // 处理请求错误
          showFailToast(msg);
          const redirect = window.location.pathname + window.location.search;
          if (code === 400031 || code === 400030 || code === 4031) {
            router.push({path: "/login",query:{redirect}})
          }
          return Promise.reject(response.data);
        }
      },
      (error: AxiosError) => {
        NProgress.done();
        // 处理 HTTP 网络错误
        let message = "";
        // HTTP 状态码
        const status = error.response?.status;
        switch (status) {
          case 400:
            message = "请求错误";
            break;
          case 401:
            message = "未授权，请登录";
            break;
          case 403:
            message = "拒绝访问";
            break;
          case 404:
            message = `请求地址出错: ${error.response?.config?.url}`;
            break;
          case 408:
            message = "请求超时";
            break;
          case 500:
            message = "服务器内部错误";
            break;
          case 501:
            message = "服务未实现";
            break;
          case 502:
            message = "网关错误";
            break;
          case 503:
            message = "服务不可用";
            break;
          case 504:
            message = "网关超时";
            break;
          case 505:
            message = "HTTP版本不受支持";
            break;
          default:
            message = "网络连接故障";
        }

        showFailToast(message);
        return Promise.reject(error);
      }
    );
  }

  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config;
    Http.axiosInstance = Axios.create(config);
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  // 通用请求函数
  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export const http = new Http(configDefault);
