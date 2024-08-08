<script setup lang="ts">
import ChangPassword from './modules/chang-password.vue';
import LoginLog from './modules/login-log.vue';
import OperationLog from './modules/operation-log.vue';
</script>

<template>
  <NFlex justify="center">
    <NTabs type="line" animated>
      <NTabPane name="changePassword" :tab="$t('page.userCenter.changePassword.title')">
        <ChangPassword />
      </NTabPane>
      <NTabPane name="loginLog" :tab="$t('page.userCenter.loginLog.title')">
        <LoginLog />
      </NTabPane>
      <NTabPane name="operationLog" :tab="$t('page.userCenter.operationLog.title')">
        <OperationLog />
      </NTabPane>
    </NTabs>
  </NFlex>
</template>

<style scoped></style>
