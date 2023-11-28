<template>
   <div class="gift-code">
      <div class="input">
         <el-input v-model.trim="cdk" placeholder="输入cdk" clearable maxlength="20"> </el-input>
         <el-button type="primary" @click="startConfirm" :disabled="!cdk">一键领取</el-button>
      </div>
      <div class="list">
         <el-table
            :data="tableData"
            style="width: 100%"
            border
            stripe
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            :row-style="{ height: '60px' }"
         >
            <el-table-column fixed type="index" label="#" width="50px" :index="indexMethod" />
            <el-table-column prop="id" label="id" width="100px" />
            <el-table-column prop="kid" label="大区" width="100px">
               <template #default="scope">
                  {{ scope.row.kid || '登录获取' }}
               </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
               <template #default="scope">
                  {{ scope.row.nickname || '登录获取' }}
               </template>
            </el-table-column>
            <el-table-column prop="avatar_image" label="头像" width="100px">
               <template #default="scope">
                  <el-image
                     style="width: 50px; height: 50px"
                     :src="scope.row.avatar_image"
                     :preview-src-list="[scope.row.avatar_image]"
                     preview-teleported
                  >
                     <template #error>
                        <div class="image-slot" style="width: 50px; height: 50px">
                           <el-icon><icon-picture size="50" /></el-icon>
                        </div>
                     </template>
                  </el-image>
               </template>
            </el-table-column>
            <el-table-column prop="loginStatus" label="登录状态" width="120px">
               <template #default="scope">
                  <el-tag class="ml-2" :type="scope.row.loginStatus === 0 ? 'success' : 'info'">
                     {{ scope.row.loginStatus === 0 ? '登录成功' : '未登录' }}</el-tag
                  >
               </template>
            </el-table-column>

            <el-table-column prop="confirmStatus" label="领取状态" width="120px">
               <template #default="scope">
                  <el-tag class="ml-2" :type="scope.row.getStatus === 0 ? 'success' : 'info'">
                     {{ scope.row.getStatus === 0 ? '领取成功' : '未领取' }}</el-tag
                  >
               </template>
            </el-table-column>
         </el-table>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getRoleInfoApi, exchangeCodeApi } from '@/api';
import { ids } from '@/assets/userData';
import { getTimestamp } from '@/utils';
import { Picture as IconPicture } from '@element-plus/icons-vue';

const cdk = ref('');
let isClick = ref(false);

const tableData = ref(
   ids.map((item) => {
      return {
         id: item,
         loginStatus: 1,
         getStatus: 1,
         nickname: '',
         avatar_image: '',
         kid: '',
      };
   })
);

async function startConfirm() {
   isClick.value = true;
   let i = 0;
   while (i < tableData.value.length) {
      let currentId = tableData.value[i].id;
      const data = { fid: currentId, time: getTimestamp(), cdk: cdk.value };
      try {
         const loginRes = await getRoleInfo(data, i);
         if (loginRes?.code === 0) {
            await exchangeCode(data, i);
         }
      } catch (error) {}
      i++;
   }
}

async function getRoleInfo(data: any, index: number) {
   const res = await getRoleInfoApi(data);
   tableData.value[index].loginStatus = res?.code;
   const { avatar_image, nickname, kid } = res.data;
   tableData.value[index].avatar_image = avatar_image;
   tableData.value[index].nickname = nickname;
   tableData.value[index].kid = kid;

   return res;
}

async function exchangeCode(data: any, index: number) {
   const res = await exchangeCodeApi(data);
   tableData.value[index].getStatus = res?.code;
   return res;
}

const indexMethod = (index: number) => {
   return index + 1;
};

// function filterStatus(code: number) {
//    switch (code) {
//       case 40007:
//          return '超出兑换时间';
//       case 20000:
//          return '领取成功';
//       case 40008:
//          return 'code已领取';
//       default:
//          break;
//    }
// }
</script>

<style scoped lang="less">
.gift-code {
   margin: 20px;
}
.input {
   display: flex;
}

.list {
   margin-top: 20px;

   text-align: center;
   .item {
      padding: 10px 0;
      .id {
         margin-left: 20px;
      }
   }
}

.el-image {
   max-width: 50px;
   max-height: 50px;
   width: 100%;
   height: 100%;
}

.image-slot {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100%;

   font-size: 30px;
}
.image-slot .el-icon {
   font-size: 30px;
}
</style>
