import { defineStore } from 'pinia';
import { store } from '@/store';
import { exchangeCodeApi, getRoleInfoApi } from '@/api';
import { getTimestamp } from '@/utils';
import type { UserInfoModel } from '@/api/model/userInfoModel';

export interface UserData {
   fid: string;
   userInfo: UserInfoModel;
   status: boolean;
}

interface userState {
   userData: UserData[];
}

export const useUserStore = defineStore({
   id: 'user',
   state: (): userState => {
      return {
         userData: [],
      };
   },

   getters: {
      getUserData(state) {
         return state.userData;
      },
   },
   actions: {
      //user
      async addUserData(fid: string) {
         const isExist = this.isFidExist(fid);
         if (!isExist) {
            const userInfo = await this.getUserInfo(fid);
            const data = {
               fid,
               userInfo: userInfo.data,
               status: true,
            };
            this.userData = [...this.userData, data];
         }
      },
      delUser(fid: string) {
         const index = this.userData.findIndex((user) => user.fid === fid);
         this.userData.splice(index, 1);
      },
      async getUserInfo(fid: string) {
         const res = await getRoleInfoApi({ fid, time: getTimestamp() });
         return res;
      },

      async exchangeCode(fid: string, cdk: string) {
         const res = await exchangeCodeApi({ fid, time: getTimestamp(), cdk });

         return res;
      },

      isFidExist(fid: string) {
         return this.userData.find((user) => user.fid === fid) !== undefined;
      },
   },
   persist: true,
});
export function useAppStoreWithOut() {
   return useUserStore(store);
}
