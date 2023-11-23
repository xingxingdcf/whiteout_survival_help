import { appendSign } from '@/utils';
import defHttp from '@/utils/http/index';

export function getRoleInfoApi(data: any) {
   return defHttp.post({
      url: '/player',
      data: appendSign(data),
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
   });
}
export function exchangeCodeApi(data: any) {
   return defHttp.post({
      url: '/gift_code',
      data: appendSign(data),
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
   });
}
