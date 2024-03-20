import { NTag, NButton, NImage, NSwitch } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import type { UserData } from '@/store/modules/user';

export interface TableColumns extends UserData {
   loginCode: Nullable<number>;
   cdkCode: Nullable<number>;
   loginMsg: string;
   cdkMsg: string;
}

export const createColumns = ({ del }: { del: (row: TableColumns) => void }): DataTableColumns<TableColumns> => {
   return [
      {
         title: 'ID',
         key: 'fid',
         width: '100',
         align: 'center',
      },
      {
         title: 'Kid',
         key: 'kid',
         width: '50',
         align: 'center',
         render(row) {
            return <NTag bordered={false}>{row.userInfo?.kid ? row.userInfo?.kid : 'NLI'}</NTag>;
         },
      },
      {
         title: 'Nickname',
         key: 'nickname',
         width: '300',
         align: 'center',
         render(row) {
            return (
               <NTag bordered={false} type={row.loginCode === 0 ? 'success' : 'default'}>
                  {row.userInfo?.nickname ? row.userInfo?.nickname : 'NLI'}
               </NTag>
            );
         },
      },
      {
         title: 'Avatar',
         key: 'avatar_image',
         width: '120',
         align: 'center',

         render(row) {
            return (
               <NImage width={60} height={60} src={row.userInfo?.avatar_image} fallback-src={'@/assets/molly.png'} />
            );
         },
      },
      {
         title: 'Lever',
         key: 'stove_lv_content',
         width: '120',
         align: 'center',
         render(row) {
            return <NImage width={60} height={60} src={row.userInfo?.stove_lv_content} />;
         },
      },
      {
         title: 'Login Code',
         key: 'loginCode',
         width: '110',
         align: 'center',
         render(row) {
            return (
               <NTag bordered={false} type={row.loginCode === 0 ? 'success' : 'default'}>
                  {row.loginCode === 0 ? 'LS' : 'NLI'}
               </NTag>
            );
         },
      },
      {
         title: 'CDK Status',
         key: 'confirmStatus',
         width: '120',
         align: 'center',
         render(row) {
            return (
               <NTag bordered={false} type={row.cdkCode === 0 ? 'success' : 'default'}>
                  {row.cdkMsg ? row.cdkMsg : 'NLI'}
               </NTag>
            );
         },
      },
      {
         title: 'User Status',
         key: 'status',
         width: '120',
         align: 'center',
         render(row) {
            return <NSwitch v-model:value={row.status}></NSwitch>;
         },
      },
      {
         title: 'Action',
         key: 'actions',
         align: 'center',
         render(row) {
            return (
               <NButton ghost type={'error'} size={'small'} onClick={() => del(row)}>
                  Delete
               </NButton>
            );
         },
      },
   ];
};
