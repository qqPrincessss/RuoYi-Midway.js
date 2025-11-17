/**
 * 删除标志: 0代表存在 1代表删除
 */
export enum DelFlagEnum {
  // 存在
  NORMAL = '0',
  // 删除
  DELETE = '1',
}

/**
 * 数据状态: 0正常,1停用
 */
export enum StatusEnum {
  // 正常
  NORMAL = '0',
  // 停用
  STOP = '1',
}

/**
 * 性别: 0男,1女
 */
export enum SexEnum {
  // 男
  MAN = '0',
  // 女
  WOMAN = '1',
}

/**
 * redis缓存的key 枚举
 */
export enum RedisEnum {
  /**
   * 登录用户 redis key
   */
  LOGIN_TOKEN_KEY = 'login_tokens:',

  /**
   * 参数管理 cache key
   */
  SYS_CONFIG_KEY = 'sys_config:',

  /**
   * 字典管理 cache key
   */
  SYS_DICT_KEY = 'sys_dict:',
}

/**
 * 数据过滤规则枚举
 */
export enum DataScopeEnum {
  // 全部数据权限
  DATA_SCOPE_ALL = '1',

  // 自定数据权限
  DATA_SCOPE_CUSTOM = '2',

  // 部门数据权限
  DATA_SCOPE_DEPT = '3',

  // 部门及以下数据权限
  DATA_SCOPE_DEPT_AND_CHILD = '4',

  // 仅本人数据权限
  DATA_SCOPE_SELF = '5',
}

/** 操作类别 */
export enum BusinessType {
  OTHER = 0, // 其他
  ADD = 1, // 新增
  EDIT = 2, // 修改
  REMOVE = 3, // 删除
  Auth = 4, // 授权
  EXPORT = 5, // 导出
  IMPORT = 6, // 导入
  LOGOUT = 7, // 强退
  GENCODE = 8, // 生成代码
  CLEAR = 9, // 清空数据
  LIST = 10, // 查询列表
  DETAIL = 11, // 查询详情
}