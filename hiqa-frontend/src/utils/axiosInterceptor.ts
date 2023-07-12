import axios from 'axios';
import Cookies from 'js-cookie';

import { toastr, logout } from '@/utils/helpers';
// import { handleApiErrors } from './global';

// declare module 'axios' {
//   export interface AxiosRequestConfig {
//     // url: string;
//     // method: string;
//   }
// }
axios.interceptors.request.use(
  (config: any) => {
    if (typeof window !== 'undefined') {
      document.body.style.pointerEvents = 'none';
    }
    return config;
  },
  (error: any) =>
    // Do something with request error
    Promise.reject(error),
);

axios.interceptors.response.use(
  (response: any) => {
    if (typeof window !== 'undefined') {
      document.body.style.pointerEvents = 'auto';
    }
    return response;
  },
  (error: any) => Promise.reject(error),
);

interface API {
  (
    url: string,
    method?: string,
    options?: {
      data?: unknown;
      responseType?: string;
      headers?: {
        language?: string;
        'Content-Type': string;
        Authorization?: string;
        sessionId?: string;
      };
    },
  ): void;
}

interface AxiosRequestConfig {
  url: string;
  method: string;
  data?: any;
  timeout?: number;
  headers?: {
    language?: string;
    'Content-Type': string;
    Authorization?: string;
    sessionId?: string;
  };
}
export const api: API = async (url, method = 'GET', options = {}) => {
  const lang = Cookies.get('lang') || 'en';
  const token = Cookies.get('token') || 'en';

  let config: AxiosRequestConfig = {
    url,
    method: method || 'GET',
    timeout: 30000,
  };
  if (!options.headers) {
    options['headers'] = {
      'Content-Type': 'application/json',
      language: lang as string,
    };
  }
  if (token) {
    options.headers['Authorization'] = token;
    options.headers['sessionId'] = Cookies.get('sessionId');
  }
  config = { ...config, ...options };
  try {
    const resp = await axios(config);
    return resp.data;
  } catch (e: any) {
    console.log('error', e);
    try {
      if (typeof window !== 'undefined') {
        document.body.style.pointerEvents = 'auto';
      }
      if (e?.response?.data) {
        if (e.response.status === 504) {
          toastr('API services are currently Offline', 'warning');
        }
        if (e.response?.data?.errors?.message === 'jwt expired') {
          logout();
        }
        return e.response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
