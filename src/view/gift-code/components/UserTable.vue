<template>
   <NDataTable :bordered="false" :columns="columns" :data="tableData" :pagination="pagination" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore, type UserData } from '@/store/modules/user';
import { createColumns, TableColumns } from './data';
import { randomDelay } from '@/utils';

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);
const tableData = ref<TableColumns[]>([]);

watch(
   () => userData.value,
   (newVal) => {
      tableData.value = newVal.map((item): TableColumns => {
         return {
            ...item,
            loginCode: null,
            cdkCode: null,
            loginMsg: '',
            cdkMsg: '',
         };
      });
   },
   { immediate: true, deep: true }
);

const columns = createColumns({
   del(row: UserData) {
      console.log(row.fid);
      userStore.delUser(row.fid);
   },
});

const pagination = {
   pageSize: 10,
};

async function startConfirm(cdk: string) {
   console.log(cdk);

   for (let i = 0; i < tableData.value.length; i++) {
      const currentItem = tableData.value[i];
      if (!currentItem.status) {
         continue;
      }

      const roleRes = await userStore.getUserInfo(currentItem.fid);
      currentItem.loginCode = roleRes.code;
      currentItem.loginMsg = roleRes.msg;

      // add delay
      await randomDelay();
      // request giftCode
      roleRes?.code === 0 && (await exchangeCode(currentItem, cdk));

      // add delay
      await randomDelay();
   }
}

async function exchangeCode(item: TableColumns, cdk: string) {
   const res = await userStore.exchangeCode(item.fid, cdk);

   item.cdkCode = res?.code;
   item.cdkMsg = res?.msg;
   return res;
}

defineExpose({
   startConfirm,
});
</script>

<style scoped lang="less"></style>
