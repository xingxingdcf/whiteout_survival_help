export interface RequestParams {
   fid: string;
   time: number;
   cdk?: string;
}

export interface UserInfoModel {
   fid: number;
   nickname: string;
   kid: number;
   stove_lv: number;
   stove_lv_content: string;
   avatar_image: string;
}
