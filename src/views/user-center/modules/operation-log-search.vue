<script setup lang="ts">
import { ref } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'OperationLogSearch'
});

interface Emits {
  (e: 'search'): void;
  (e: 'reset'): void;
}

const emit = defineEmits<Emits>();

const { formRef } = useNaiveForm();

const model = defineModel<Api.Auth.OperationLogSearchParams, 'ip' | 'start_date' | 'end_date' | 'behavior' | 'object'>(
  'model',
  {
    required: true
  }
);

const dateRange = ref(null);

const options = [
  {
    label: $t('page.userCenter.operationLog.behaviorOption.changePassword'),
    value: '修改密码'
  },
  {
    label: $t('page.userCenter.operationLog.behaviorOption.addUser'),
    value: '添加用户'
  },
  {
    label: $t('page.userCenter.operationLog.behaviorOption.editUser'),
    value: '编辑用户'
  },
  {
    label: $t('page.userCenter.operationLog.behaviorOption.deleteUser'),
    value: '删除用户'
  },
  {
    label: $t('page.userCenter.operationLog.behaviorOption.addRole'),
    value: '添加角色'
  },
  {
    label: $t('page.userCenter.operationLog.behaviorOption.editRole'),
    value: '编辑角色'
  },
  {
    label: $t('page.userCenter.operationLog.behaviorOption.deleteRole'),
    value: '删除角色'
  }
];

function handleFormattedValue(value: [string, string]) {
  model.value.start_date = value[0];
  model.value.end_date = value[1];
}

async function reset() {
  emit('reset');
  dateRange.value = null;
  await search();
}

async function search() {
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="login-log-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="IP" class="pr-24px">
              <NInput v-model:value="model.ip" :placeholder="$t('page.userCenter.operationLog.form.ip')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.userCenter.operationLog.object')" class="pr-24px">
              <NInput v-model:value="model.object" :placeholder="$t('page.userCenter.operationLog.form.object')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.userCenter.operationLog.behavior')" class="pr-24px">
              <NSelect
                v-model:value="model.behavior"
                :placeholder="$t('page.userCenter.operationLog.form.behavior')"
                :options="options"
              ></NSelect>
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.userCenter.operationLog.createdAt')" class="pr-24px">
              <NDatePicker
                v-model:value="dateRange"
                date-value-on-close
                type="daterange"
                @update:formatted-value="handleFormattedValue"
              />
            </NFormItemGi>
            <NFormItemGi span="24 m:12" class="pr-24px">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
