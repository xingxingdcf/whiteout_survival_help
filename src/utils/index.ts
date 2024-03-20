import cryptoJs from 'crypto-js';
import type { RequestParams } from '@/api/model/userInfoModel';

export const appendSign = (obj: RequestParams) => {
   var str = Object.keys(obj)
      .sort()
      .reduce(function (pre, cur) {
         return (
            (pre ? pre + '&' : '') + cur + '=' + (typeof obj[cur] === 'object' ? JSON.stringify(obj[cur]) : obj[cur])
         );
      }, '');
   return {
      sign: cryptoJs.MD5(str + 'tB87#kPtkxqOS2').toString(cryptoJs.enc.Hex),
      ...obj,
   };
};

export function getTimestamp() {
   return Date.now();
}

export async function randomDelay() {
   const delay = Math.random() * 3000 + 2000; // 随机时间在 2 到 4 秒之间
   return new Promise((resolve) => setTimeout(resolve, delay));
}
