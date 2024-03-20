<template>
   <n-flex justify="space-between" class="mb-2">
      <NInputGroup class="w-96">
         <NInput v-model:value="cdk" />
         <NButton type="primary" ghost @click="startConfirm" :disabled="!cdk"> {{ searchModal || 'Claim' }}</NButton>
      </NInputGroup>
      <NInputGroup class="w-64">
         <NInput v-model:value="fid" />
         <NButton class="flex justify-end" type="primary" :disabled="!fid" @click="handleAddUser">Add User</NButton>
      </NInputGroup>
   </n-flex>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue';
import { NButton, NInputGroup, NInput } from 'naive-ui';
import { useUserStore } from '@/store/modules/user';

const emit = defineEmits(['confirm']);
const userStore = useUserStore();

const cdk = ref('');
const fid = ref('');
const searchModal = ref(0);

function startConfirm() {
   emit('confirm', unref(cdk));
}
function handleAddUser() {
   userStore.addUserData(unref(fid));
}
</script>

<style scoped lang="less"></style>
