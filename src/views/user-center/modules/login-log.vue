<script setup lang="ts">
import { useTable } from '@/hooks/common/table';
import { fetchLoginLog } from '@/service/api/auth';
import { $t } from '@/locales';
import LoginLogSearch from './login-log-search.vue';

const { columns, data, loading, pagination, searchParams, resetSearchParams, getDataByPage } = useTable({
  showTotal: true,
  apiFn: fetchLoginLog,
  apiParams: {
    page_no: 1,
    page_size: 10,
    ip: null,
    start_date: null,
    end_date: null
  },
  columns: () => [
    {
      key: 'id',
      title: 'ID',
      align: 'center',
      width: 64
    },
    {
      key: 'ip',
      title: 'IP',
      align: 'center',
      width: 128
    },
    {
      key: 'platform',
      title: $t('page.userCenter.loginLog.device'),
      align: 'center',
      width: 300,
      render(rowData, _) {
        const { platform, os, browser } = rowData;
        return `${platform} ${os} ${browser}`;
      }
    },
    {
      key: 'created_at',
      title: $t('page.userCenter.loginLog.createdAt'),
      align: 'center',
      width: 128
    }
  ]
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <LoginLogSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <NDataTable
        :columns="columns"
        :data="data"
        size="small"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="pagination"
        class="sm:h-full"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
