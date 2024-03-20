<template>
   <div class="mx-10 mt-5">
      <SearchBar @confirm="(cdk) => userTableRef?.startConfirm(cdk)"></SearchBar>

      <UserTable ref="userTableRef" />
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import SearchBar from './components/SearchBar.vue';
import UserTable from './components/UserTable.vue';

const userTableRef = ref<InstanceType<typeof UserTable> | null>(null);
</script>
