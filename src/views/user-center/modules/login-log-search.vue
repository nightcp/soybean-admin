<script setup lang="ts">
import { ref } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';

defineOptions({
  name: 'LoginLogSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef } = useNaiveForm();

const model = defineModel<Api.Auth.LoginLogSearchParams, 'ip' | 'start_date' | 'end_date'>('model', { required: true });

const dateRange = ref(null);

async function reset() {
  emit('reset');
  dateRange.value = null;
  await search();
}

async function search() {
  emit('search');
}

function handleFormattedValue(value: [string, string]) {
  model.value.start_date = value[0];
  model.value.end_date = value[1];
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="login-log-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="IP" class="pr-24px">
              <NInput v-model:value="model.ip" :placeholder="$t('page.userCenter.loginLog.form.ip')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.userCenter.loginLog.createdAt')" class="pr-24px">
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
