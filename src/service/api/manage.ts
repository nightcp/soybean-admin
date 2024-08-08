import { request } from '../request';

/** 用户列表 */
export function fetchUserList(params?: Api.Manage.UserSearchParams) {
  return request<Api.Manage.UserList>({
    url: 'admin-users',
    method: 'get',
    params
  });
}

/** 添加用户 */
export function fetchAddUser(params: Pick<Api.Manage.User, 'username' | 'password' | 'role_id'>) {
  return request({
    url: '/admin-users',
    method: 'post',
    data: params
  });
}

/** 编辑用户 */
export function fetchEditUser(id: number, params: Pick<Api.Manage.User, 'password' | 'role_id'>) {
  return request({
    url: `/admin-users/${id}`,
    method: 'put',
    data: params
  });
}

/** 删除用户 */
export function fetchDeleteUser(id: number) {
  return request({
    url: `/admin-users/${id}`,
    method: 'delete'
  });
}

/** 角色列表 */
export function fetchRoleList(params?: Api.Manage.RoleSearchParams) {
  return request<Api.Manage.RoleList>({
    url: 'admin-roles',
    method: 'get',
    params
  });
}
