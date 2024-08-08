import { request } from '../request';

/**
 * Login
 *
 * @param username User name
 * @param password Password
 */
export function fetchLogin(username: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/auth/profile' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}

/** 修改密码 */
export function fetchChangePassword(old_password: string, new_password: string, confirm_password: string) {
  return request({
    url: '/auth/password',
    method: 'put',
    data: {
      old_password,
      new_password,
      confirm_password
    }
  });
}

/** 登录日志 */
export function fetchLoginLog(params?: Api.Auth.LoginLogSearchParams) {
  return request<Api.Auth.LoginLogList>({
    url: '/auth/login-logs',
    method: 'get',
    params
  });
}

/** 操作日志 */
export function fetchOperationLlog(params?: Api.Auth.OperationLogSearchParams) {
  return request<Api.Auth.OperationLogList>({
    url: '/auth/operation-logs',
    method: 'get',
    params
  });
}
