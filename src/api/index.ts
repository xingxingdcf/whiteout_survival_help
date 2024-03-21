import { appendSign } from '@/utils';
import defHttp from '@/utils/http/index';
import { RequestParams } from './model/userInfoModel';

export function getRoleInfoApi(data: RequestParams) {
   return defHttp.post({
      url: '/player',
      data: appendSign(data),
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
   });
}

export function exchangeCodeApi(data: RequestParams) {
   return defHttp.post({
      url: '/gift_code',
      data: appendSign(data),
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
   });
}
