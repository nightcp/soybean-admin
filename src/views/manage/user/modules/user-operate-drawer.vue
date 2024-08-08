<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchAddUser, fetchEditUser, fetchRoleList } from '@/service/api/manage';

defineOptions({
  name: 'UserOperateDrawer'
});

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData?: Api.Manage.User | null;
}
interface Emits {
  (e: 'submitted'): void;
}

type Model = Pick<Api.Manage.User, 'id' | 'username' | 'password' | 'role_id'>;
type RuleKey = Extract<keyof Model, 'username' | 'password' | 'role_id'>;

const { formRef, validate, restoreValidation } = useNaiveForm();
const { formRules, createRequiredRule } = useFormRules();

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const visible = defineModel<boolean>('visible', { default: false });
const model: Model = reactive(createDefaultModel());
// const rules: Record<RuleKey, App.Global.FormRule[]> = {
//   username: formRules.username,
//   password: props.operateType === 'edit' ? [] : formRules.password,
//   role_id: [createRequiredRule($t('page.manage.user.form.roleName'))]
// };
const rules: Record<RuleKey, App.Global.FormRule[]> = reactive(createDefautlRules());

const roleOptions = ref<CommonType.Option<string>[]>([]);

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.user.addUser'),
    edit: $t('page.manage.user.editUser')
  };
  return titles[props.operateType];
});

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    handleInitRules();
    restoreValidation();
    getRoleOptions();
  }
});

function createDefaultModel(): Model {
  return {
    id: 0,
    username: '',
    password: '',
    role_id: null
  };
}

function createDefautlRules(): Record<RuleKey, App.Global.FormRule[]> {
  return {
    username: formRules.username,
    password: formRules.password,
    role_id: [createRequiredRule($t('page.manage.user.form.roleName'))]
  };
}

async function getRoleOptions() {
  const { error, data } = await fetchRoleList({
    page_no: 1,
    page_size: 1000
  });

  if (!error) {
    const { lists } = data;
    const options = lists.map(item => ({
      label: item.name,
      value: `${item.id}`
    }));
    // // end
    roleOptions.value = [...options];
  }
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function handleInitRules() {
  Object.assign(rules, createDefautlRules());

  if (props.operateType === 'edit') {
    Reflect.deleteProperty(rules, 'password');
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  if (props.operateType === 'add') {
    const { error } = await fetchAddUser({
      username: model.username,
      password: model.password,
      role_id: model.role_id
    });
    if (!error) {
      window.$message?.success($t('common.addSuccess'));
      closeDrawer();
      emit('submitted');
    }
  } else {
    const { error } = await fetchEditUser(model.id, {
      password: model.password,
      role_id: model.role_id
    });
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      closeDrawer();
      emit('submitted');
    }
  }
}
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.manage.user.username')" path="username">
          <NInput v-model:value="model.username" :placeholder="$t('page.manage.user.form.username')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.password')" path="password">
          <NInput
            v-model:value="model.password"
            type="password"
            show-password-on="click"
            :placeholder="$t('page.manage.user.form.password')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.roleName')" path="role_id">
          <NSelect v-model:value="model.role_id" :options="roleOptions"></NSelect>
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
