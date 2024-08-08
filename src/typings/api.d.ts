/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      page_no: number;
      /** page size */
      page_size: number;
      /** total count */
      count: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      lists: T[];
    }

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = '1' | '2';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record create time */
      created_at: string;
      /** record update time */
      updated_at: string;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page_no' | 'page_size'>;

    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      username: string;
      roles: string[];
      buttons: string[];
    }

    /** login log */
    type LoginLog = Common.CommonRecord<{
      ip: string;
      platform: string;
      os: string;
      browser: string;
      start_date: string;
      end_date: string;
    }>;

    /** login log search params */
    type LoginLogSearchParams = CommonType.RecordNullable<
      Pick<Api.Auth.LoginLog, 'ip' | 'start_date' | 'end_date'> & CommonSearchParams
    >;

    /** login log list */
    type LoginLogList = Common.PaginatingQueryRecord<LoginLog>;

    /** operation log */
    type OperationLog = Common.CommonRecord<{
      ip: string;
      platform: string;
      os: string;
      browser: string;
      behavior: string;
      object: string;
      start_date: string;
      end_date: string;
    }>;

    /** operation log search params */
    type OperationLogSearchParams = CommonType.RecordNullable<
      Pick<Api.Auth.OperationLog, 'ip' | 'behavior' | 'object' | 'start_date' | 'end_date'> & CommonSearchParams
    >;

    /** operation log list */
    type OperationLogList = Common.PaginatingQueryRecord<OperationLog>;
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * namespace Manage
   *
   * backend api module: "manage"
   */
  namespace Manage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page_no' | 'page_size'>;

    /** user */
    type User = Common.CommonRecord<{
      username: string;
      password: string;
      role_id: string | null;
      role_name: string;
      last_login_at: string;
      last_login_ip: string;
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<Pick<Api.Manage.User, 'username'> & CommonSearchParams>;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /** role */
    type Role = Common.CommonRecord<{
      name: string;
    }>;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<CommonSearchParams>;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;
  }
}
