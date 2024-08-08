<script setup lang="ts">
import { useTable } from '@/hooks/common/table';
import { fetchOperationLlog } from '@/service/api/auth';
import { $t } from '@/locales';
import OperationLogSearch from './operation-log-search.vue';

const { columns, data, loading, pagination, searchParams, getDataByPage, resetSearchParams } = useTable({
  apiFn: fetchOperationLlog,
  apiParams: {
    page_no: 1,
    page_size: 10,
    ip: null,
    start_date: null,
    end_date: null,
    behavior: null,
    object: null
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
      title: $t('page.userCenter.operationLog.device'),
      align: 'center',
      width: 300,
      render(rowData, _) {
        const { platform, os, browser } = rowData;
        return `${platform} ${os} ${browser}`;
      }
    },
    {
      key: 'created_at',
      title: $t('page.userCenter.operationLog.createdAt'),
      align: 'center',
      width: 128
    },
    {
      key: 'behavior',
      title: $t('page.userCenter.operationLog.behavior'),
      align: 'center',
      width: '90'
    },
    {
      key: 'object',
      title: $t('page.userCenter.operationLog.object'),
      align: 'center',
      width: 300
    }
  ]
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <OperationLogSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
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
