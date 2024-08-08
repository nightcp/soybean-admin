<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchDeleteUser, fetchUserList } from '@/service/api/manage';
import UserSearch from './modules/user-search.vue';
import UserOperateDrawer from './modules/user-operate-drawer.vue';

const { data, loading, columns, pagination, searchParams, getData, resetSearchParams, getDataByPage } = useTable({
  showTotal: true,
  apiFn: fetchUserList,
  apiParams: {
    page_no: 1,
    page_size: 10,
    username: null
  },
  columns: () => [
    {
      key: 'id',
      title: 'ID',
      align: 'center',
      width: 64
    },
    {
      key: 'role_name',
      title: $t('page.manage.user.roleName'),
      align: 'center',
      width: 96
    },
    {
      key: 'username',
      title: $t('page.manage.user.username'),
      align: 'center',
      width: 96
    },
    {
      key: 'last_login_ip',
      title: $t('page.manage.user.lastLoginIp'),
      align: 'center',
      width: 96,
      render: rowData => {
        return rowData.last_login_ip || '-';
      }
    },
    {
      key: 'last_login_at',
      title: $t('page.manage.user.lastLoginAt'),
      align: 'center',
      width: 128,
      render: rowData => {
        return rowData.last_login_at || '-';
      }
    },
    {
      key: 'created_at',
      title: $t('common.createdAt'),
      align: 'center',
      width: 128
    },
    {
      key: 'updated_at',
      title: $t('common.updatedAt'),
      align: 'center',
      width: 128
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const { handleAdd, handleEdit, drawerVisible, operateType, editingData, onDeleted } = useTableOperate(data, getData);

function edit(id: number) {
  handleEdit(id);
}

async function handleDelete(id: number) {
  const { error } = await fetchDeleteUser(id);
  if (!error) {
    onDeleted();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.manage.user.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation :loading="loading" @add="handleAdd" @refresh="getData" />
      </template>
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
      <UserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<stype scope></stype>
