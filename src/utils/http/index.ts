import { BASE_URL, TIME_OUT } from './config';
import HYRequest from './request';

const defHttp = new HYRequest({
   baseURL: BASE_URL,
   timeout: TIME_OUT,
   interceptors: {
      requestSuccessFn: (config) => {
         return config;
      },
   },
});

export default defHttp;
