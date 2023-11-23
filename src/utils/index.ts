import CryptoJS from 'crypto-js';

export function appendSign(obj: any) {
   var str = Object.keys(obj)
      .sort()
      .reduce(function (pre, cur) {
         return (
            (pre ? pre + '&' : '') + cur + '=' + (typeof obj[cur] === 'object' ? JSON.stringify(obj[cur]) : obj[cur])
         );
      }, '');
   return {
      sign: (0, CryptoJS.MD5)(str + 'w!C&5LQIkMr:FCv@wWYTd8L@&m,r(o').toString(CryptoJS.enc.Hex),
      ...obj,
   };
}

export function getTimestamp() {
   return Date.now();
}
