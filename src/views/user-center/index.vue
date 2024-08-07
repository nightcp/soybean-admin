<script setup lang="ts">
import ChangPassword from './modules/chang-password.vue';
import LoginLog from './modules/login-log.vue';
</script>

<template>
  <NFlex justify="center">
    <NTabs type="line" animated>
      <NTabPane name="changePassword" :tab="$t('page.userCenter.changePassword.title')">
        <ChangPassword />
      </NTabPane>
      <NTabPane name="loginLog" :tab="$t('page.userCenter.loginLog')">
        <LoginLog />
      </NTabPane>
      <NTabPane name="operationLog" :tab="$t('page.userCenter.operationLog')">七里香</NTabPane>
    </NTabs>
  </NFlex>
</template>

<style scoped></style>
