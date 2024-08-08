<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';

const authStore = useAuthStore();
const { formRef, validate, restoreValidation } = useNaiveForm();

interface FormModel {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const model: FormModel = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // inside computed to make locale reactive, if not apply i18n, you can define it without computed
  const { formRules, createConfirmPwdRule } = useFormRules();

  return {
    oldPassword: formRules.password,
    newPassword: formRules.password,
    confirmPassword: createConfirmPwdRule(model.newPassword)
  };
});

async function handleSubmit() {
  await validate();
  await authStore.changePassword(model.oldPassword, model.newPassword, model.confirmPassword);
}

async function handleReset() {
  await restoreValidation();
  model.oldPassword = '';
  model.newPassword = '';
  model.confirmPassword = '';
}
</script>

<template>
  <NGrid responsive="screen" item-responsive>
    <NGridItem span="6 m:6 l:6">
      <NCard :bordered="false" size="small" class="card-wrapper">
        <NForm ref="formRef" :model="model" :rules="rules" size="medium">
          <NFormItem path="oldPassword" :label="$t('page.userCenter.changePassword.oldPassword')">
            <NInput v-model:value="model.oldPassword" type="password" show-password-on="click" />
          </NFormItem>
          <NFormItem path="newPassword" :label="$t('page.userCenter.changePassword.newPassword')">
            <NInput v-model:value="model.newPassword" type="password" show-password-on="click" />
          </NFormItem>
          <NFormItem path="confirmPassword" :label="$t('page.userCenter.changePassword.confirmPassword')">
            <NInput v-model:value="model.confirmPassword" type="password" show-password-on="click" />
          </NFormItem>
          <NSpace :size="18" class="w-full" justify="end">
            <NButton type="primary" size="medium" round block :loading="authStore.loginLoading" @click="handleSubmit">
              {{ $t('common.confirm') }}
            </NButton>
            <NButton size="medium" round block @click="handleReset">
              {{ $t('common.reset') }}
            </NButton>
          </NSpace>
        </NForm>
      </NCard>
    </NGridItem>
  </NGrid>
</template>

<style scoped></style>
