/*
 Navicat Premium Dump SQL

 Source Server         : ruoyi
 Source Server Type    : MySQL
 Source Server Version : 80407 (8.4.7)
 Source Host           : 43.139.220.39:3306
 Source Schema         : ruoyi

 Target Server Type    : MySQL
 Target Server Version : 80407 (8.4.7)
 File Encoding         : 65001

 Date: 19/11/2025 16:57:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for gen_table
-- ----------------------------
DROP TABLE IF EXISTS `gen_table`;
CREATE TABLE `gen_table`  (
  `table_id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
  `table_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '表名称',
  `table_comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '表描述',
  `sub_table_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '关联子表的表名',
  `sub_table_fk_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '子表关联的外键名',
  `class_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '实体类名称',
  `tpl_category` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'crud' COMMENT '使用的模板（crud单表操作 tree树表操作）',
  `tpl_web_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '前端模板类型（element-ui模版 element-plus模版）',
  `package_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '生成包路径',
  `module_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '生成模块名',
  `business_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '生成业务名',
  `function_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '生成功能名',
  `function_author` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '生成功能作者',
  `gen_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '生成代码方式（0zip压缩包 1自定义路径）',
  `gen_path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '/' COMMENT '生成路径（不填默认项目路径）',
  `options` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '其它生成选项',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '状态（0正常 1停用）',
  PRIMARY KEY (`table_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '代码生成业务表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gen_table
-- ----------------------------
INSERT INTO `gen_table` VALUES (5, 'sys_user', '用户信息表', NULL, NULL, 'SysUser', 'crud', '', 'system', 'system', 'sysUser', '用户信息表', 'xierfloat', '0', '/', NULL, 'admin', '2025-11-19 13:55:15', '', NULL, NULL, '0');

-- ----------------------------
-- Table structure for gen_table_column
-- ----------------------------
DROP TABLE IF EXISTS `gen_table_column`;
CREATE TABLE `gen_table_column`  (
  `column_id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
  `table_id` bigint NULL DEFAULT NULL COMMENT '归属表编号',
  `column_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '列名称',
  `column_comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '列描述',
  `column_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '列类型',
  `java_type` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'JAVA类型',
  `java_field` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'JAVA字段名',
  `is_pk` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否主键（1是）',
  `is_increment` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否自增（1是）',
  `is_required` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否必填（1是）',
  `is_insert` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否为插入字段（1是）',
  `is_edit` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否编辑字段（1是）',
  `is_list` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否列表字段（1是）',
  `is_query` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否查询字段（1是）',
  `query_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'EQ' COMMENT '查询方式（等于、不等于、大于、小于、范围）',
  `html_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '显示类型（文本框、文本域、下拉框、复选框、单选框、日期控件）',
  `dict_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典类型',
  `sort` int NULL DEFAULT NULL COMMENT '排序',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `column_default` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '默认值',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`column_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '代码生成业务表字段' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gen_table_column
-- ----------------------------
INSERT INTO `gen_table_column` VALUES (1, 5, 'user_id', '用户ID', 'bigint', 'Number', 'userId', '1', '1', '1', '0', '1', '1', '1', 'EQ', 'input', '', 1, 'admin', NULL, 'admin', NULL, NULL, '0', NULL);
INSERT INTO `gen_table_column` VALUES (2, 5, 'dept_id', '部门ID', 'bigint', 'Number', 'deptId', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 2, 'admin', NULL, 'admin', NULL, NULL, '0', NULL);
INSERT INTO `gen_table_column` VALUES (3, 5, 'user_name', '用户账号', 'varchar', 'String', 'userName', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 3, 'admin', NULL, 'admin', NULL, NULL, '0', NULL);
INSERT INTO `gen_table_column` VALUES (4, 5, 'nick_name', '用户昵称', 'varchar', 'String', 'nickName', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 4, 'admin', NULL, 'admin', NULL, NULL, '0', NULL);
INSERT INTO `gen_table_column` VALUES (5, 5, 'user_type', '用户类型（00系统用户）', 'varchar', 'String', 'userType', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 5, 'admin', NULL, 'admin', NULL, '00', '0', NULL);
INSERT INTO `gen_table_column` VALUES (6, 5, 'email', '用户邮箱', 'varchar', 'String', 'email', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 6, 'admin', NULL, 'admin', NULL, '', '0', NULL);
INSERT INTO `gen_table_column` VALUES (7, 5, 'phonenumber', '手机号码', 'varchar', 'String', 'phonenumber', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 7, 'admin', NULL, 'admin', NULL, '', '0', NULL);
INSERT INTO `gen_table_column` VALUES (8, 5, 'sex', '用户性别（0男 1女 2未知）', 'char', 'String', 'sex', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 8, 'admin', NULL, 'admin', NULL, '0', '0', NULL);
INSERT INTO `gen_table_column` VALUES (9, 5, 'avatar', '头像地址', 'varchar', 'String', 'avatar', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 9, 'admin', NULL, 'admin', NULL, '', '0', NULL);
INSERT INTO `gen_table_column` VALUES (10, 5, 'password', '密码', 'varchar', 'String', 'password', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 10, 'admin', NULL, 'admin', NULL, '', '0', NULL);
INSERT INTO `gen_table_column` VALUES (11, 5, 'status', '帐号状态（0正常 1停用）', 'char', 'String', 'status', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 11, 'admin', NULL, 'admin', NULL, '0', '0', NULL);
INSERT INTO `gen_table_column` VALUES (12, 5, 'del_flag', '删除标志（0代表存在 2代表删除）', 'char', 'String', 'delFlag', '0', '0', '0', NULL, NULL, NULL, NULL, 'EQ', 'input', '', 12, 'admin', NULL, 'admin', NULL, '0', '0', NULL);
INSERT INTO `gen_table_column` VALUES (13, 5, 'login_ip', '最后登录IP', 'varchar', 'String', 'loginIp', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 13, 'admin', NULL, 'admin', NULL, '', '0', NULL);
INSERT INTO `gen_table_column` VALUES (14, 5, 'login_date', '最后登录时间', 'datetime', 'Date', 'loginDate', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'datetime', '', 14, 'admin', NULL, 'admin', NULL, NULL, '0', NULL);
INSERT INTO `gen_table_column` VALUES (15, 5, 'create_by', '创建者', 'varchar', 'String', 'createBy', '0', '0', '0', NULL, NULL, NULL, NULL, 'EQ', 'input', '', 15, 'admin', NULL, 'admin', NULL, '', '0', NULL);
INSERT INTO `gen_table_column` VALUES (16, 5, 'create_time', '创建时间', 'datetime', 'Date', 'createTime', '0', '0', '0', NULL, NULL, NULL, NULL, 'EQ', 'datetime', '', 16, 'admin', NULL, 'admin', NULL, NULL, '0', NULL);
INSERT INTO `gen_table_column` VALUES (17, 5, 'update_by', '更新者', 'varchar', 'String', 'updateBy', '0', '0', '0', '1', '1', NULL, NULL, 'EQ', 'input', '', 17, 'admin', NULL, 'admin', NULL, '', '0', NULL);
INSERT INTO `gen_table_column` VALUES (18, 5, 'update_time', '更新时间', 'datetime', 'Date', 'updateTime', '0', '0', '0', '1', '1', NULL, NULL, 'EQ', 'datetime', '', 18, 'admin', NULL, 'admin', NULL, NULL, '0', NULL);
INSERT INTO `gen_table_column` VALUES (19, 5, 'remark', '备注', 'varchar', 'String', 'remark', '0', '0', '0', '1', '1', '1', NULL, 'EQ', 'input', '', 19, 'admin', NULL, 'admin', NULL, NULL, '0', NULL);

-- ----------------------------
-- Table structure for monitor_job
-- ----------------------------
DROP TABLE IF EXISTS `monitor_job`;
CREATE TABLE `monitor_job`  (
  `job_id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '任务名称',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'DEFAULT' COMMENT '任务组名',
  `invoke_target` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '调用目标字符串',
  `cron_expression` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT 'cron执行表达式',
  `misfire_policy` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '3' COMMENT '计划执行错误策略（1立即执行 2执行一次 3放弃执行）',
  `concurrent` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '是否并发执行（0允许 1禁止）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '状态（0正常 1暂停）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '备注信息',
  PRIMARY KEY (`job_id`, `job_name`, `job_group`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '定时任务调度表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of monitor_job
-- ----------------------------
INSERT INTO `monitor_job` VALUES (1, '系统默认（无参）', 'DEFAULT', 'ryTask.ryNoParams', '0/10 * * * * ?', '3', '1', '1', 'admin', '2025-11-18 15:16:55', '', NULL, '');
INSERT INTO `monitor_job` VALUES (2, '系统默认（有参）', 'DEFAULT', 'ryTask.ryParams(\'ry\')', '0/15 * * * * ?', '3', '1', '1', 'admin', '2025-11-18 15:16:55', '', NULL, '');
INSERT INTO `monitor_job` VALUES (3, '系统默认（多参）', 'DEFAULT', 'ryTask.ryMultipleParams(\'ry\', true, 2000L, 316.50D, 100)', '0/20 * * * * ?', '3', '1', '1', 'admin', '2025-11-18 15:16:55', '', NULL, '');

-- ----------------------------
-- Table structure for monitor_job_log
-- ----------------------------
DROP TABLE IF EXISTS `monitor_job_log`;
CREATE TABLE `monitor_job_log`  (
  `job_log_id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务日志ID',
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务名称',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务组名',
  `invoke_target` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '调用目标字符串',
  `job_message` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '日志信息',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '执行状态（0正常 1失败）',
  `exception_info` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '异常信息',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`job_log_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '定时任务调度日志表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of monitor_job_log
-- ----------------------------

-- ----------------------------
-- Table structure for monitor_login_infor
-- ----------------------------
DROP TABLE IF EXISTS `monitor_login_infor`;
CREATE TABLE `monitor_login_infor`  (
  `info_id` bigint NOT NULL AUTO_INCREMENT COMMENT '访问ID',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '用户账号',
  `ipaddr` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '登录IP地址',
  `browser` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '浏览器类型',
  `os` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `login_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '登陆地点',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '登录状态（0成功 1失败）',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '提示信息',
  `login_time` datetime NULL DEFAULT NULL COMMENT '访问时间',
  PRIMARY KEY (`info_id`) USING BTREE,
  INDEX `idx_sys_logininfor_s`(`status` ASC) USING BTREE,
  INDEX `idx_sys_logininfor_lt`(`login_time` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 116 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统访问记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of monitor_login_infor
-- ----------------------------
INSERT INTO `monitor_login_infor` VALUES (100, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-18 16:38:12');
INSERT INTO `monitor_login_infor` VALUES (101, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-18 17:36:14');
INSERT INTO `monitor_login_infor` VALUES (102, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-18 20:44:11');
INSERT INTO `monitor_login_infor` VALUES (103, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-18 22:32:06');
INSERT INTO `monitor_login_infor` VALUES (104, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-18 22:33:17');
INSERT INTO `monitor_login_infor` VALUES (105, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-18 22:33:44');
INSERT INTO `monitor_login_infor` VALUES (106, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-18 23:33:07');
INSERT INTO `monitor_login_infor` VALUES (107, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-19 00:40:35');
INSERT INTO `monitor_login_infor` VALUES (108, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-19 01:06:58');
INSERT INTO `monitor_login_infor` VALUES (109, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-19 01:25:07');
INSERT INTO `monitor_login_infor` VALUES (110, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-19 03:00:06');
INSERT INTO `monitor_login_infor` VALUES (111, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-19 13:02:33');
INSERT INTO `monitor_login_infor` VALUES (112, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-19 15:06:02');
INSERT INTO `monitor_login_infor` VALUES (113, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-19 15:46:50');
INSERT INTO `monitor_login_infor` VALUES (114, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-19 15:53:03');
INSERT INTO `monitor_login_infor` VALUES (115, 'admin', '::1', 'Chrome 142.0.0', 'Windows', '', '0', '', '2025-11-19 16:22:12');

-- ----------------------------
-- Table structure for monitor_oper_log
-- ----------------------------
DROP TABLE IF EXISTS `monitor_oper_log`;
CREATE TABLE `monitor_oper_log`  (
  `oper_id` bigint NOT NULL AUTO_INCREMENT COMMENT '日志主键',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '模块标题',
  `business_type` int NULL DEFAULT 0 COMMENT '业务类型（0其它 1新增 2修改 3删除）',
  `method` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '方法名称',
  `request_method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '请求方式',
  `operator_type` int NULL DEFAULT 0 COMMENT '操作类别（0其它 1后台用户 2手机端用户）',
  `oper_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '操作人员',
  `dept_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '部门名称',
  `oper_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '请求URL',
  `oper_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '主机地址',
  `oper_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '操作地点',
  `oper_param` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '请求参数',
  `json_result` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '返回参数',
  `status` int NULL DEFAULT 0 COMMENT '操作状态（0正常 1异常）',
  `error_msg` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '错误消息',
  `oper_time` datetime NULL DEFAULT NULL COMMENT '操作时间',
  `cost_time` bigint NULL DEFAULT 0 COMMENT '消耗时间',
  PRIMARY KEY (`oper_id`) USING BTREE,
  INDEX `idx_sys_oper_log_bt`(`business_type` ASC) USING BTREE,
  INDEX `idx_sys_oper_log_s`(`status` ASC) USING BTREE,
  INDEX `idx_sys_oper_log_ot`(`oper_time` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 164 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '操作日志记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of monitor_oper_log
-- ----------------------------
INSERT INTO `monitor_oper_log` VALUES (100, '个人信息', 2, 'UserController.changeStatus', 'PUT', 0, 'admin', '', '/system/user/changeStatus', '::1', '', '{\"userId\":2,\"status\":\"1\"}', '{\"code\":200,\"message\":\"状态修改成功\"}', 0, '', '2025-11-18 16:53:18', 22);
INSERT INTO `monitor_oper_log` VALUES (101, '个人信息', 2, 'UserController.changeStatus', 'PUT', 0, 'admin', '', '/system/user/changeStatus', '::1', '', '{\"userId\":2,\"status\":\"0\"}', '{\"code\":200,\"message\":\"状态修改成功\"}', 0, '', '2025-11-18 16:53:24', 17);
INSERT INTO `monitor_oper_log` VALUES (102, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"500\",\"menuName\":\"操作日志\",\"parentId\":\"108\",\"orderNum\":1,\"path\":\"operlog\",\"component\":\"monitor/operlog/index\",\"query\":\"\",\"isFrame\":1,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"system:operlog:list\",\"icon\":\"form\",\"remark\":\"操作日志菜单\"}', '{\"code\":500,\"message\":\"Duplicate entry \'500\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 17:55:55', 231);
INSERT INTO `monitor_oper_log` VALUES (103, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"500\",\"menuName\":\"操作日志\",\"parentId\":\"108\",\"orderNum\":1,\"path\":\"operlog\",\"component\":\"monitor/operlog/index\",\"query\":\"\",\"isFrame\":1,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"system:operlog:list\",\"icon\":\"form\",\"remark\":\"操作日志菜单\"}', '{\"code\":500,\"message\":\"Duplicate entry \'500\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 17:56:05', 153);
INSERT INTO `monitor_oper_log` VALUES (104, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"500\",\"menuName\":\"操作日志\",\"parentId\":\"108\",\"orderNum\":1,\"path\":\"operlog\",\"component\":\"monitor/operlog/index\",\"query\":\"\",\"isFrame\":1,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"system:operlog:list\",\"icon\":\"form\",\"remark\":\"操作日志菜单\"}', '{\"code\":500,\"message\":\"Duplicate entry \'500\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 18:01:24', 149);
INSERT INTO `monitor_oper_log` VALUES (105, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"500\",\"menuName\":\"操作日志\",\"parentId\":\"108\",\"orderNum\":1,\"path\":\"operlog\",\"component\":\"monitor/operlog/index\",\"query\":\"\",\"isFrame\":1,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"system:operlog:list\",\"icon\":\"form\",\"remark\":\"操作日志菜单\"}', '{\"code\":500,\"message\":\"Duplicate entry \'500\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 19:07:11', 67);
INSERT INTO `monitor_oper_log` VALUES (106, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"500\",\"menuName\":\"操作日志\",\"parentId\":\"108\",\"orderNum\":1,\"path\":\"operlog\",\"component\":\"monitor/operlog/index\",\"query\":\"\",\"isFrame\":1,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"system:operlog:list\",\"icon\":\"form\",\"remark\":\"操作日志菜单\"}', '{\"code\":500,\"message\":\"Duplicate entry \'500\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 19:12:02', 124);
INSERT INTO `monitor_oper_log` VALUES (107, '用户管理', 2, 'UserController.update', 'PUT', 0, 'admin', '', '/system/user', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":\"2025-11-18T08:53:26.000Z\",\"userId\":2,\"deptId\":\"105\",\"userName\":\"ry\",\"nickName\":\"若依\",\"userType\":\"00\",\"email\":\"ry@qq.com\",\"phonenumber\":\"15666666666\",\"sex\":\"1\",\"avatar\":\"\",\"password\":\"$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2\",\"status\":\"0\",\"loginIp\":\"127.0.0.1\",\"loginDate\":\"2025-11-18T07:16:51.000Z\",\"remark\":\"测试员\",\"dept\":{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"deptId\":\"105\",\"parentId\":\"101\",\"ancestors\":\"0,100,101\",\"deptName\":\"测试部门\",\"orderNum\":3,\"leader\":\"若依\",\"phone\":\"15888888888\",\"email\":\"ry@qq.com\",\"status\":\"0\",\"delFlag\":\"0\"},\"roles\":[{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"roleId\":\"2\",\"roleName\":\"普通角色\",\"roleKey\":\"common\",\"roleSort\":2,\"dataScope\":\"2\",\"menuCheckStrictly\":true,\"deptCheckStrictly\":true,\"status\":\"0\",\"delFlag\":\"0\",\"remark\":\"普通角色\"}],\"posts\":[{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"postId\":\"2\",\"postCode\":\"se\",\"postName\":\"项目经理\",\"postSort\":2,\"status\":\"0\",\"remark\":\"\"}],\"postIds\":[\"2\"],\"roleIds\":[\"2\"]}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 20:44:20', 219);
INSERT INTO `monitor_oper_log` VALUES (108, '角色管理', 2, 'RoleController.update', 'PUT', 0, 'admin', '', '/system/role', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"roleId\":\"2\",\"roleName\":\"普通角色\",\"roleKey\":\"common\",\"roleSort\":2,\"dataScope\":\"2\",\"menuCheckStrictly\":true,\"deptCheckStrictly\":true,\"status\":\"0\",\"delFlag\":\"0\",\"remark\":\"普通角色\",\"menuIds\":[\"1\",\"100\",\"1000\",\"1001\",\"1002\",\"1003\",\"1004\",\"1005\",\"1006\",\"101\",\"1007\",\"1008\",\"1009\",\"1010\",\"1011\",\"102\",\"1012\",\"1013\",\"1014\",\"1015\",\"103\",\"1016\",\"1017\",\"1018\",\"1019\",\"104\",\"1020\",\"1021\",\"1022\",\"1023\",\"1024\",\"105\",\"1025\",\"1026\",\"1027\",\"1028\",\"1029\",\"106\",\"1030\",\"1031\",\"1032\",\"1033\",\"1034\",\"107\",\"1035\",\"1036\",\"1037\",\"1038\",\"108\",\"500\",\"1039\",\"1040\",\"1041\",\"501\",\"1042\",\"1043\",\"1044\",\"1045\",\"2\",\"109\",\"1046\",\"1047\",\"1048\",\"110\",\"1049\",\"1050\",\"1051\",\"1052\",\"1053\",\"1054\",\"111\",\"112\",\"113\",\"3\",\"114\",\"115\",\"1055\",\"1056\",\"1058\",\"1057\",\"1059\",\"1060\",\"116\",\"4\"]}', '{\"code\":400,\"message\":\"\\\"deptCheckStrictly\\\" 必须是数值\"}', 1, '', '2025-11-18 20:44:28', 85);
INSERT INTO `monitor_oper_log` VALUES (109, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"4\",\"menuName\":\"若依官网\",\"parentId\":\"0\",\"orderNum\":4,\"path\":\"http://ruoyi.vip\",\"component\":null,\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"\",\"icon\":\"guide\",\"remark\":\"若依官网地址\"}', '{\"code\":500,\"message\":\"Duplicate entry \'4\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 20:44:59', 88);
INSERT INTO `monitor_oper_log` VALUES (110, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"4\",\"menuName\":\"若依官网\",\"parentId\":\"0\",\"orderNum\":4,\"path\":\"http://ruoyi.vip\",\"component\":null,\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"\",\"icon\":\"guide\",\"remark\":\"若依官网地址\"}', '{\"code\":500,\"message\":\"Duplicate entry \'4\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 20:51:06', 78);
INSERT INTO `monitor_oper_log` VALUES (111, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"4\",\"menuName\":\"若依官网\",\"parentId\":\"0\",\"orderNum\":4,\"path\":\"http://ruoyi.vip\",\"component\":null,\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"\",\"icon\":\"guide\",\"remark\":\"若依官网地址\"}', '{\"code\":500,\"message\":\"Duplicate entry \'4\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 20:54:52', 154);
INSERT INTO `monitor_oper_log` VALUES (112, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"4\",\"menuName\":\"若依官网\",\"parentId\":\"0\",\"orderNum\":4,\"path\":\"http://ruoyi.vip\",\"component\":null,\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"\",\"icon\":\"guide\",\"remark\":\"若依官网地址\"}', '{\"code\":500,\"message\":\"Duplicate entry \'4\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 20:55:15', 140);
INSERT INTO `monitor_oper_log` VALUES (113, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"4\",\"menuName\":\"若依官网\",\"parentId\":\"0\",\"orderNum\":4,\"path\":\"http://ruoyi.vip\",\"component\":null,\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"\",\"icon\":\"guide\",\"remark\":\"若依官网地址\"}', '{\"code\":500,\"message\":\"Duplicate entry \'4\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 20:57:58', 211);
INSERT INTO `monitor_oper_log` VALUES (114, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"4\",\"menuName\":\"若依官网\",\"parentId\":\"0\",\"orderNum\":4,\"path\":\"http://ruoyi.vip\",\"component\":null,\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"\",\"icon\":\"guide\",\"remark\":\"若依官网地址\"}', '{\"code\":500,\"message\":\"Duplicate entry \'4\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 21:00:11', 374);
INSERT INTO `monitor_oper_log` VALUES (115, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":4,\"menuName\":\"若依官网\",\"parentId\":0,\"orderNum\":4,\"path\":\"http://ruoyi.vip\",\"component\":null,\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"\",\"icon\":\"guide\",\"remark\":\"若依官网地址\"}', '{\"code\":500,\"message\":\"Duplicate entry \'4\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 21:06:21', 183);
INSERT INTO `monitor_oper_log` VALUES (116, '菜单管理', 1, 'MenuController.addMenu', 'POST', 0, 'admin', '', '/system/menu', '', '', '{\"parentId\":0,\"menuName\":\"qqqqq\",\"icon\":\"404\",\"menuType\":\"C\",\"orderNum\":2,\"isFrame\":\"1\",\"isCache\":\"0\",\"visible\":\"0\",\"status\":\"0\",\"path\":\"dfsdf\"}', '{\"code\":500,\"message\":\"Cannot read properties of undefined (reading \'split\')\"}', 1, '', '2025-11-18 21:08:50', 222);
INSERT INTO `monitor_oper_log` VALUES (117, '菜单管理', 1, 'MenuController.addMenu', 'POST', 0, 'admin', '', '/system/menu', '', '', '{\"parentId\":0,\"menuName\":\"qqqqq\",\"icon\":\"404\",\"menuType\":\"C\",\"orderNum\":2,\"isFrame\":\"1\",\"isCache\":\"0\",\"visible\":\"0\",\"status\":\"0\",\"path\":\"dfsdf\",\"component\":\"dfsdf\"}', '{\"code\":500,\"message\":\"qqqqq已存在\"}', 1, '', '2025-11-18 21:09:02', 23);
INSERT INTO `monitor_oper_log` VALUES (118, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2000', '::1', '', '{\"menuId\":\"2000\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 21:09:13', 34);
INSERT INTO `monitor_oper_log` VALUES (119, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"4\",\"menuName\":\"若依官网\",\"parentId\":\"0\",\"orderNum\":4,\"path\":\"http://ruoyi.vip\",\"component\":null,\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"\",\"icon\":\"guide\",\"remark\":\"若依官网地址\"}', '{\"code\":500,\"message\":\"Duplicate entry \'4\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 21:09:39', 133);
INSERT INTO `monitor_oper_log` VALUES (120, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"4\",\"menuName\":\"若依官网\",\"parentId\":\"0\",\"orderNum\":4,\"path\":\"http://ruoyi.vip\",\"component\":null,\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"\",\"icon\":\"guide\",\"remark\":\"若依官网地址\"}', '{\"code\":500,\"message\":\"Duplicate entry \'4\' for key \'sys_menu.PRIMARY\'\"}', 1, '', '2025-11-18 21:10:34', 220);
INSERT INTO `monitor_oper_log` VALUES (121, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"4\",\"menuName\":\"若依官网\",\"parentId\":\"0\",\"orderNum\":4,\"path\":\"http://ruoyi.vip\",\"component\":null,\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"\",\"icon\":\"guide\",\"remark\":\"若依官网地址\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 21:11:16', 50);
INSERT INTO `monitor_oper_log` VALUES (122, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2025-11-18T13:11:18.000Z\",\"menuId\":\"4\",\"menuName\":\"若依官网\",\"parentId\":\"0\",\"orderNum\":4,\"path\":\"http://ruoyi.vip\",\"component\":null,\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"\",\"icon\":\"guide\",\"remark\":\"若依官网地址\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 21:11:24', 110);
INSERT INTO `monitor_oper_log` VALUES (123, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"500\",\"menuName\":\"操作日志\",\"parentId\":\"108\",\"orderNum\":1,\"path\":\"operlog\",\"component\":\"monitor/operlog/index\",\"query\":\"\",\"isFrame\":1,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"system:operlog:list\",\"icon\":\"form\",\"remark\":\"操作日志菜单\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 21:11:58', 33);
INSERT INTO `monitor_oper_log` VALUES (124, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"501\",\"menuName\":\"登录日志\",\"parentId\":\"108\",\"orderNum\":2,\"path\":\"logininfor\",\"component\":\"monitor/logininfor/index\",\"query\":\"\",\"isFrame\":1,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"system:logininfor:list\",\"icon\":\"logininfor\",\"remark\":\"登录日志菜单\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 21:12:06', 72);
INSERT INTO `monitor_oper_log` VALUES (125, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/111', '::1', '', '{\"menuId\":\"111\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 21:20:47', 166);
INSERT INTO `monitor_oper_log` VALUES (126, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/112', '::1', '', '{\"menuId\":\"112\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 21:20:50', 26);
INSERT INTO `monitor_oper_log` VALUES (127, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/113', '::1', '', '{\"menuId\":\"113\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 21:20:52', 21);
INSERT INTO `monitor_oper_log` VALUES (128, '登录信息', 5, 'LoginInforController.export', 'POST', 0, 'admin', '', '/monitor/logininfor/export', '::1', '', '{\"pageNum\":\"1\",\"pageSize\":\"10\"}', '{\"message\":\"操作成功\",\"code\":200}', 0, '', '2025-11-18 22:39:26', 156);
INSERT INTO `monitor_oper_log` VALUES (129, '菜单管理', 1, 'MenuController.addMenu', 'POST', 0, 'admin', '', '/system/menu', '::1', '', '{\"parentId\":\"2\",\"menuName\":\"服务监控\",\"icon\":\"server\",\"menuType\":\"C\",\"orderNum\":4,\"isFrame\":\"1\",\"isCache\":\"1\",\"visible\":\"0\",\"status\":\"0\",\"path\":\"server\",\"component\":\"monitor/server/index\",\"perms\":\"monitor:server:list\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:16:17', 365);
INSERT INTO `monitor_oper_log` VALUES (130, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2002', '::1', '', '{\"menuId\":\"2002\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:16:36', 31);
INSERT INTO `monitor_oper_log` VALUES (131, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2003', '::1', '', '{\"menuId\":\"2003\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:16:38', 23);
INSERT INTO `monitor_oper_log` VALUES (132, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2004', '::1', '', '{\"menuId\":\"2004\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:16:41', 25);
INSERT INTO `monitor_oper_log` VALUES (133, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2005', '::1', '', '{\"menuId\":\"2005\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:16:44', 22);
INSERT INTO `monitor_oper_log` VALUES (134, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2006', '::1', '', '{\"menuId\":\"2006\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:16:46', 23);
INSERT INTO `monitor_oper_log` VALUES (135, '菜单管理', 1, 'MenuController.addMenu', 'POST', 0, 'admin', '', '/system/menu', '::1', '', '{\"parentId\":\"2\",\"menuName\":\"缓存监控\",\"icon\":\"redis\",\"menuType\":\"C\",\"orderNum\":5,\"isFrame\":\"1\",\"isCache\":\"1\",\"visible\":\"0\",\"status\":\"0\",\"path\":\"cache\",\"perms\":\"monitor:cache:list\",\"component\":\"monitor/cache/index\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:25:32', 296);
INSERT INTO `monitor_oper_log` VALUES (136, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2008', '::1', '', '{\"menuId\":\"2008\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:25:40', 28);
INSERT INTO `monitor_oper_log` VALUES (137, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2009', '::1', '', '{\"menuId\":\"2009\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:25:42', 18);
INSERT INTO `monitor_oper_log` VALUES (138, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2010', '::1', '', '{\"menuId\":\"2010\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:25:44', 19);
INSERT INTO `monitor_oper_log` VALUES (139, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2011', '::1', '', '{\"menuId\":\"2011\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:25:47', 21);
INSERT INTO `monitor_oper_log` VALUES (140, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2012', '::1', '', '{\"menuId\":\"2012\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:25:49', 18);
INSERT INTO `monitor_oper_log` VALUES (141, '菜单管理', 1, 'MenuController.addMenu', 'POST', 0, 'admin', '', '/system/menu', '::1', '', '{\"parentId\":\"2\",\"menuName\":\"缓存列表\",\"icon\":\"redis-list\",\"menuType\":\"C\",\"orderNum\":6,\"isFrame\":\"1\",\"isCache\":\"1\",\"visible\":\"0\",\"status\":\"0\",\"path\":\"cacheList\",\"component\":\"monitor/cache/list\",\"perms\":\"monitor:cache:list\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:26:25', 303);
INSERT INTO `monitor_oper_log` VALUES (142, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2014', '::1', '', '{\"menuId\":\"2014\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:37:53', 239);
INSERT INTO `monitor_oper_log` VALUES (143, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2015', '::1', '', '{\"menuId\":\"2015\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:37:55', 21);
INSERT INTO `monitor_oper_log` VALUES (144, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2016', '::1', '', '{\"menuId\":\"2016\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:37:56', 19);
INSERT INTO `monitor_oper_log` VALUES (145, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2017', '::1', '', '{\"menuId\":\"2017\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:37:58', 19);
INSERT INTO `monitor_oper_log` VALUES (146, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/2018', '::1', '', '{\"menuId\":\"2018\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-18 23:38:00', 22);
INSERT INTO `monitor_oper_log` VALUES (147, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"116\",\"menuName\":\"系统接口\",\"parentId\":\"3\",\"orderNum\":3,\"path\":\"swagger\",\"component\":\"tool/swagger/index\",\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"tool:swagger:list\",\"icon\":\"swagger\",\"remark\":\"系统接口菜单\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 01:26:20', 51);
INSERT INTO `monitor_oper_log` VALUES (148, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2025-11-18T17:26:23.000Z\",\"menuId\":\"116\",\"menuName\":\"系统接口\",\"parentId\":\"3\",\"orderNum\":3,\"path\":\"swagger\",\"component\":\"tool/swagger/index\",\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"tool:swagger:list\",\"icon\":\"swagger\",\"remark\":\"系统接口菜单\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 01:27:22', 41);
INSERT INTO `monitor_oper_log` VALUES (149, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2025-11-18T17:27:25.000Z\",\"menuId\":\"116\",\"menuName\":\"系统接口\",\"parentId\":\"3\",\"orderNum\":3,\"path\":\"swagger\",\"component\":\"tool/swagger/index\",\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"tool:swagger:list\",\"icon\":\"swagger\",\"remark\":\"系统接口菜单\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 02:24:39', 25);
INSERT INTO `monitor_oper_log` VALUES (150, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2025-11-18T18:24:42.000Z\",\"menuId\":\"116\",\"menuName\":\"系统接口\",\"parentId\":\"3\",\"orderNum\":3,\"path\":\"swagger\",\"component\":\"tool/swagger/index\",\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"tool:swagger:list\",\"icon\":\"swagger\",\"remark\":\"系统接口菜单\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 02:26:06', 18);
INSERT INTO `monitor_oper_log` VALUES (151, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2025-11-18T18:26:09.000Z\",\"menuId\":\"116\",\"menuName\":\"系统接口\",\"parentId\":\"3\",\"orderNum\":3,\"path\":\"swagger\",\"component\":\"tool/gen/index\",\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"tool:swagger:list\",\"icon\":\"swagger\",\"remark\":\"系统接口菜单\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 02:34:20', 23);
INSERT INTO `monitor_oper_log` VALUES (152, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2025-11-18T18:34:23.000Z\",\"menuId\":\"116\",\"menuName\":\"系统接口\",\"parentId\":\"3\",\"orderNum\":3,\"path\":\"swagge\",\"component\":\"tool/swagger/index\",\"query\":\"\",\"isFrame\":0,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"tool:swagger:list\",\"icon\":\"swagger\",\"remark\":\"系统接口菜单\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 02:41:44', 24);
INSERT INTO `monitor_oper_log` VALUES (153, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"menuId\":\"114\",\"menuName\":\"表单构建\",\"parentId\":\"3\",\"orderNum\":1,\"path\":\"build\",\"component\":\"tool/swagger/index\",\"query\":\"\",\"isFrame\":1,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"tool:build:list\",\"icon\":\"build\",\"remark\":\"表单构建菜单\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 09:32:18', 27);
INSERT INTO `monitor_oper_log` VALUES (154, '菜单管理', 2, 'MenuController.update', 'PUT', 0, 'admin', '', '/system/menu', '::1', '', '{\"createBy\":\"admin\",\"createTime\":\"2025-11-18T07:16:51.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2025-11-19T01:32:21.000Z\",\"menuId\":\"114\",\"menuName\":\"表单构建\",\"parentId\":\"3\",\"orderNum\":1,\"path\":\"build\",\"component\":\"tool/build/index\",\"query\":\"\",\"isFrame\":1,\"isCache\":0,\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"tool:build:list\",\"icon\":\"build\",\"remark\":\"表单构建菜单\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 13:04:17', 25);
INSERT INTO `monitor_oper_log` VALUES (155, '菜单管理', 3, 'MenuController.delMenu', 'DELETE', 0, 'admin', '', '/system/menu/116', '::1', '', '{\"menuId\":\"116\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 13:04:35', 236);
INSERT INTO `monitor_oper_log` VALUES (156, '菜单管理', 1, 'MenuController.addMenu', 'POST', 0, 'admin', '', '/system/menu', '::1', '', '{\"parentId\":\"3\",\"menuName\":\"系统接口\",\"icon\":\"swagger\",\"menuType\":\"C\",\"orderNum\":4,\"isFrame\":\"1\",\"isCache\":\"1\",\"visible\":\"0\",\"status\":\"0\",\"path\":\"swagger\",\"component\":\"tool/swagger/index\",\"perms\":\"tool:swagger:list\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 13:06:05', 427);
INSERT INTO `monitor_oper_log` VALUES (157, '代码生成', 3, 'GenTableController.delete', 'DELETE', 0, 'admin', '', '/tool/gen/1', '::1', '', '{\"tableId\":\"1\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 13:32:38', 14);
INSERT INTO `monitor_oper_log` VALUES (158, '代码生成', 3, 'GenTableController.delete', 'DELETE', 0, 'admin', '', '/tool/gen/2', '::1', '', '{\"tableId\":\"2\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 13:46:14', 18);
INSERT INTO `monitor_oper_log` VALUES (159, '代码生成', 3, 'GenTableController.delete', 'DELETE', 0, 'admin', '', '/tool/gen/3', '::1', '', '{\"tableId\":\"3\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 13:51:27', 68);
INSERT INTO `monitor_oper_log` VALUES (160, '代码生成', 3, 'GenTableController.delete', 'DELETE', 0, 'admin', '', '/tool/gen/3', '', '', '{\"tableId\":\"3\"}', '{\"code\":500,\"message\":\"read ECONNRESET\"}', 1, '', '2025-11-19 13:51:46', 19192);
INSERT INTO `monitor_oper_log` VALUES (161, '代码生成', 3, 'GenTableController.delete', 'DELETE', 0, 'admin', '', '/tool/gen/4', '::1', '', '{\"tableId\":\"4\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 13:55:10', 18);
INSERT INTO `monitor_oper_log` VALUES (162, '通知公告', 1, 'NoticeController.create', 'POST', 0, 'admin', '', '/system/notice', '::1', '', '{\"noticeTitle\":\"11\",\"noticeType\":\"1\",\"noticeContent\":\"<p>111</p>\",\"status\":\"0\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 16:00:00', 199);
INSERT INTO `monitor_oper_log` VALUES (163, '通知公告', 3, 'NoticeController.delete', 'DELETE', 0, 'admin', '', '/system/notice/10', '::1', '', '{\"noticeId\":\"10\"}', '{\"code\":200,\"message\":\"操作成功\"}', 0, '', '2025-11-19 16:00:03', 43);

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `config_id` int NOT NULL AUTO_INCREMENT COMMENT '参数主键',
  `config_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '参数名称',
  `config_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '参数键名',
  `config_value` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '参数键值',
  `config_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'N' COMMENT '系统内置（Y是 N否）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`config_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '参数配置表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES (1, '主框架页-默认皮肤样式名称', 'sys.index.skinName', 'skin-blue', 'Y', 'admin', '2025-11-18 15:16:55', '', NULL, '蓝色 skin-blue、绿色 skin-green、紫色 skin-purple、红色 skin-red、黄色 skin-yellow');
INSERT INTO `sys_config` VALUES (2, '用户管理-账号初始密码', 'sys.user.initPassword', '123456', 'Y', 'admin', '2025-11-18 15:16:55', '', NULL, '初始化密码 123456');
INSERT INTO `sys_config` VALUES (3, '主框架页-侧边栏主题', 'sys.index.sideTheme', 'theme-dark', 'Y', 'admin', '2025-11-18 15:16:55', '', NULL, '深色主题theme-dark，浅色主题theme-light');
INSERT INTO `sys_config` VALUES (4, '账号自助-是否开启用户注册功能', 'sys.account.registerUser', 'false', 'Y', 'admin', '2025-11-18 15:16:55', '', NULL, '是否开启注册用户功能（true开启，false关闭）');
INSERT INTO `sys_config` VALUES (5, '用户登录-黑名单列表', 'sys.login.blackIPList', '', 'Y', 'admin', '2025-11-18 15:16:55', '', NULL, '设置登录IP黑名单限制，多个匹配项以;分隔，支持匹配（*通配、网段）');

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `dept_id` bigint NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `parent_id` bigint NULL DEFAULT 0 COMMENT '父部门id',
  `ancestors` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '祖级列表',
  `dept_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '部门名称',
  `order_num` int NULL DEFAULT 0 COMMENT '显示顺序',
  `leader` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '负责人',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '部门状态（0正常 1停用）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`dept_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 200 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '部门表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES (100, 0, '0', '若依科技', 0, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2025-11-18 15:16:50', '', NULL);
INSERT INTO `sys_dept` VALUES (101, 100, '0,100', '深圳总公司', 1, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2025-11-18 15:16:50', '', NULL);
INSERT INTO `sys_dept` VALUES (102, 100, '0,100', '长沙分公司', 2, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2025-11-18 15:16:50', '', NULL);
INSERT INTO `sys_dept` VALUES (103, 101, '0,100,101', '研发部门', 1, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2025-11-18 15:16:51', '', NULL);
INSERT INTO `sys_dept` VALUES (104, 101, '0,100,101', '市场部门', 2, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2025-11-18 15:16:51', '', NULL);
INSERT INTO `sys_dept` VALUES (105, 101, '0,100,101', '测试部门', 3, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2025-11-18 15:16:51', '', NULL);
INSERT INTO `sys_dept` VALUES (106, 101, '0,100,101', '财务部门', 4, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2025-11-18 15:16:51', '', NULL);
INSERT INTO `sys_dept` VALUES (107, 101, '0,100,101', '运维部门', 5, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2025-11-18 15:16:51', '', NULL);
INSERT INTO `sys_dept` VALUES (108, 102, '0,100,102', '市场部门', 1, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2025-11-18 15:16:51', '', NULL);
INSERT INTO `sys_dept` VALUES (109, 102, '0,100,102', '财务部门', 2, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2025-11-18 15:16:51', '', NULL);

-- ----------------------------
-- Table structure for sys_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_data`;
CREATE TABLE `sys_dict_data`  (
  `dict_code` bigint NOT NULL AUTO_INCREMENT COMMENT '字典编码',
  `dict_sort` int NULL DEFAULT 0 COMMENT '字典排序',
  `dict_label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典标签',
  `dict_value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典键值',
  `dict_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典类型',
  `css_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '样式属性（其他样式扩展）',
  `list_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '表格回显样式',
  `is_default` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'N' COMMENT '是否默认（Y是 N否）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`dict_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典数据表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
INSERT INTO `sys_dict_data` VALUES (1, 1, '男', '0', 'sys_user_sex', '', '', 'Y', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '性别男');
INSERT INTO `sys_dict_data` VALUES (2, 2, '女', '1', 'sys_user_sex', '', '', 'N', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '性别女');
INSERT INTO `sys_dict_data` VALUES (3, 3, '未知', '2', 'sys_user_sex', '', '', 'N', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '性别未知');
INSERT INTO `sys_dict_data` VALUES (4, 1, '显示', '0', 'sys_show_hide', '', 'primary', 'Y', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '显示菜单');
INSERT INTO `sys_dict_data` VALUES (5, 2, '隐藏', '1', 'sys_show_hide', '', 'danger', 'N', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '隐藏菜单');
INSERT INTO `sys_dict_data` VALUES (6, 1, '正常', '0', 'sys_normal_disable', '', 'primary', 'Y', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (7, 2, '停用', '1', 'sys_normal_disable', '', 'danger', 'N', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '停用状态');
INSERT INTO `sys_dict_data` VALUES (8, 1, '正常', '0', 'sys_job_status', '', 'primary', 'Y', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (9, 2, '暂停', '1', 'sys_job_status', '', 'danger', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '停用状态');
INSERT INTO `sys_dict_data` VALUES (10, 1, '默认', 'DEFAULT', 'sys_job_group', '', '', 'Y', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '默认分组');
INSERT INTO `sys_dict_data` VALUES (11, 2, '系统', 'SYSTEM', 'sys_job_group', '', '', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '系统分组');
INSERT INTO `sys_dict_data` VALUES (12, 1, '是', 'Y', 'sys_yes_no', '', 'primary', 'Y', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '系统默认是');
INSERT INTO `sys_dict_data` VALUES (13, 2, '否', 'N', 'sys_yes_no', '', 'danger', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '系统默认否');
INSERT INTO `sys_dict_data` VALUES (14, 1, '通知', '1', 'sys_notice_type', '', 'warning', 'Y', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '通知');
INSERT INTO `sys_dict_data` VALUES (15, 2, '公告', '2', 'sys_notice_type', '', 'success', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '公告');
INSERT INTO `sys_dict_data` VALUES (16, 1, '正常', '0', 'sys_notice_status', '', 'primary', 'Y', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (17, 2, '关闭', '1', 'sys_notice_status', '', 'danger', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '关闭状态');
INSERT INTO `sys_dict_data` VALUES (18, 99, '其他', '0', 'sys_oper_type', '', 'info', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '其他操作');
INSERT INTO `sys_dict_data` VALUES (19, 1, '新增', '1', 'sys_oper_type', '', 'info', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '新增操作');
INSERT INTO `sys_dict_data` VALUES (20, 2, '修改', '2', 'sys_oper_type', '', 'info', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '修改操作');
INSERT INTO `sys_dict_data` VALUES (21, 3, '删除', '3', 'sys_oper_type', '', 'danger', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '删除操作');
INSERT INTO `sys_dict_data` VALUES (22, 4, '授权', '4', 'sys_oper_type', '', 'primary', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '授权操作');
INSERT INTO `sys_dict_data` VALUES (23, 5, '导出', '5', 'sys_oper_type', '', 'warning', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '导出操作');
INSERT INTO `sys_dict_data` VALUES (24, 6, '导入', '6', 'sys_oper_type', '', 'warning', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '导入操作');
INSERT INTO `sys_dict_data` VALUES (25, 7, '强退', '7', 'sys_oper_type', '', 'danger', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '强退操作');
INSERT INTO `sys_dict_data` VALUES (26, 8, '生成代码', '8', 'sys_oper_type', '', 'warning', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '生成操作');
INSERT INTO `sys_dict_data` VALUES (27, 9, '清空数据', '9', 'sys_oper_type', '', 'danger', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '清空操作');
INSERT INTO `sys_dict_data` VALUES (28, 1, '成功', '0', 'sys_common_status', '', 'primary', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (29, 2, '失败', '1', 'sys_common_status', '', 'danger', 'N', '0', 'admin', '2025-11-18 15:16:55', '', NULL, '停用状态');

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_type`;
CREATE TABLE `sys_dict_type`  (
  `dict_id` bigint NOT NULL AUTO_INCREMENT COMMENT '字典主键',
  `dict_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典名称',
  `dict_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典类型',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`dict_id`) USING BTREE,
  UNIQUE INDEX `dict_type`(`dict_type` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典类型表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
INSERT INTO `sys_dict_type` VALUES (1, '用户性别', 'sys_user_sex', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '用户性别列表');
INSERT INTO `sys_dict_type` VALUES (2, '菜单状态', 'sys_show_hide', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '菜单状态列表');
INSERT INTO `sys_dict_type` VALUES (3, '系统开关', 'sys_normal_disable', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '系统开关列表');
INSERT INTO `sys_dict_type` VALUES (4, '任务状态', 'sys_job_status', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '任务状态列表');
INSERT INTO `sys_dict_type` VALUES (5, '任务分组', 'sys_job_group', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '任务分组列表');
INSERT INTO `sys_dict_type` VALUES (6, '系统是否', 'sys_yes_no', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '系统是否列表');
INSERT INTO `sys_dict_type` VALUES (7, '通知类型', 'sys_notice_type', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '通知类型列表');
INSERT INTO `sys_dict_type` VALUES (8, '通知状态', 'sys_notice_status', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '通知状态列表');
INSERT INTO `sys_dict_type` VALUES (9, '操作类型', 'sys_oper_type', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '操作类型列表');
INSERT INTO `sys_dict_type` VALUES (10, '系统状态', 'sys_common_status', '0', 'admin', '2025-11-18 15:16:54', '', NULL, '登录状态列表');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `menu_id` bigint NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `menu_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单名称',
  `parent_id` bigint NULL DEFAULT 0 COMMENT '父菜单ID',
  `order_num` int NULL DEFAULT 0 COMMENT '显示顺序',
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '路由地址',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件路径',
  `query` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由参数',
  `route_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '路由名称',
  `is_frame` int NULL DEFAULT 1 COMMENT '是否为外链（0是 1否）',
  `is_cache` int NULL DEFAULT 0 COMMENT '是否缓存（0缓存 1不缓存）',
  `menu_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '菜单类型（M目录 C菜单 F按钮）',
  `visible` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '菜单状态（0显示 1隐藏）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `perms` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '#' COMMENT '菜单图标',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2025 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '菜单权限表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, '系统管理', 0, 1, 'system', NULL, '', '', 1, 0, 'M', '0', '0', '', 'system', 'admin', '2025-11-18 15:16:51', '', NULL, '系统管理目录');
INSERT INTO `sys_menu` VALUES (2, '系统监控', 0, 2, 'monitor', NULL, '', '', 1, 0, 'M', '0', '0', '', 'monitor', 'admin', '2025-11-18 15:16:51', '', NULL, '系统监控目录');
INSERT INTO `sys_menu` VALUES (3, '系统工具', 0, 3, 'tool', NULL, '', '', 1, 0, 'M', '0', '0', '', 'tool', 'admin', '2025-11-18 15:16:51', '', NULL, '系统工具目录');
INSERT INTO `sys_menu` VALUES (4, '若依官网', 0, 4, 'http://ruoyi.vip', NULL, '', '', 0, 0, 'M', '0', '0', '', 'guide', 'admin', '2025-11-18 15:16:51', 'admin', '2025-11-18 21:11:26', '若依官网地址');
INSERT INTO `sys_menu` VALUES (100, '用户管理', 1, 1, 'user', 'system/user/index', '', '', 1, 0, 'C', '0', '0', 'system:user:list', 'user', 'admin', '2025-11-18 15:16:51', '', NULL, '用户管理菜单');
INSERT INTO `sys_menu` VALUES (101, '角色管理', 1, 2, 'role', 'system/role/index', '', '', 1, 0, 'C', '0', '0', 'system:role:list', 'peoples', 'admin', '2025-11-18 15:16:51', '', NULL, '角色管理菜单');
INSERT INTO `sys_menu` VALUES (102, '菜单管理', 1, 3, 'menu', 'system/menu/index', '', '', 1, 0, 'C', '0', '0', 'system:menu:list', 'tree-table', 'admin', '2025-11-18 15:16:51', '', NULL, '菜单管理菜单');
INSERT INTO `sys_menu` VALUES (103, '部门管理', 1, 4, 'dept', 'system/dept/index', '', '', 1, 0, 'C', '0', '0', 'system:dept:list', 'tree', 'admin', '2025-11-18 15:16:51', '', NULL, '部门管理菜单');
INSERT INTO `sys_menu` VALUES (104, '岗位管理', 1, 5, 'post', 'system/post/index', '', '', 1, 0, 'C', '0', '0', 'system:post:list', 'post', 'admin', '2025-11-18 15:16:51', '', NULL, '岗位管理菜单');
INSERT INTO `sys_menu` VALUES (105, '字典管理', 1, 6, 'dict', 'system/dict/index', '', '', 1, 0, 'C', '0', '0', 'system:dict:list', 'dict', 'admin', '2025-11-18 15:16:51', '', NULL, '字典管理菜单');
INSERT INTO `sys_menu` VALUES (106, '参数设置', 1, 7, 'config', 'system/config/index', '', '', 1, 0, 'C', '0', '0', 'system:config:list', 'edit', 'admin', '2025-11-18 15:16:51', '', NULL, '参数设置菜单');
INSERT INTO `sys_menu` VALUES (107, '通知公告', 1, 8, 'notice', 'system/notice/index', '', '', 1, 0, 'C', '0', '0', 'system:notice:list', 'message', 'admin', '2025-11-18 15:16:51', '', NULL, '通知公告菜单');
INSERT INTO `sys_menu` VALUES (108, '日志管理', 1, 9, 'log', '', '', '', 1, 0, 'M', '0', '0', '', 'log', 'admin', '2025-11-18 15:16:51', '', NULL, '日志管理菜单');
INSERT INTO `sys_menu` VALUES (109, '在线用户', 2, 1, 'online', 'monitor/online/index', '', '', 1, 0, 'C', '0', '0', 'monitor:online:list', 'online', 'admin', '2025-11-18 15:16:51', '', NULL, '在线用户菜单');
INSERT INTO `sys_menu` VALUES (110, '定时任务', 2, 2, 'job', 'monitor/job/index', '', '', 1, 0, 'C', '0', '0', 'monitor:job:list', 'job', 'admin', '2025-11-18 15:16:51', '', NULL, '定时任务菜单');
INSERT INTO `sys_menu` VALUES (114, '表单构建', 3, 1, 'build', 'tool/build/index', '', '', 1, 0, 'C', '0', '0', 'tool:build:list', 'build', 'admin', '2025-11-18 15:16:51', 'admin', '2025-11-19 13:04:17', '表单构建菜单');
INSERT INTO `sys_menu` VALUES (115, '代码生成', 3, 2, 'gen', 'tool/gen/index', '', '', 1, 0, 'C', '0', '0', 'tool:gen:list', 'code', 'admin', '2025-11-18 15:16:51', '', NULL, '代码生成菜单');
INSERT INTO `sys_menu` VALUES (500, '操作日志', 108, 1, 'operlog', 'monitor/operlog/index', '', '', 1, 0, 'C', '0', '0', 'system:operlog:list', 'form', 'admin', '2025-11-18 15:16:51', 'admin', '2025-11-18 21:12:01', '操作日志菜单');
INSERT INTO `sys_menu` VALUES (501, '登录日志', 108, 2, 'logininfor', 'monitor/logininfor/index', '', '', 1, 0, 'C', '0', '0', 'system:logininfor:list', 'logininfor', 'admin', '2025-11-18 15:16:51', 'admin', '2025-11-18 21:12:09', '登录日志菜单');
INSERT INTO `sys_menu` VALUES (1000, '用户查询', 100, 1, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:query', '#', 'admin', '2025-11-18 15:16:51', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1001, '用户新增', 100, 2, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:add', '#', 'admin', '2025-11-18 15:16:51', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1002, '用户修改', 100, 3, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:edit', '#', 'admin', '2025-11-18 15:16:51', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1003, '用户删除', 100, 4, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:remove', '#', 'admin', '2025-11-18 15:16:51', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1004, '用户导出', 100, 5, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:export', '#', 'admin', '2025-11-18 15:16:51', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1005, '用户导入', 100, 6, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:import', '#', 'admin', '2025-11-18 15:16:51', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1006, '重置密码', 100, 7, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:resetPwd', '#', 'admin', '2025-11-18 15:16:51', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1007, '角色查询', 101, 1, '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:query', '#', 'admin', '2025-11-18 15:16:51', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1008, '角色新增', 101, 2, '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:add', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1009, '角色修改', 101, 3, '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:edit', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1010, '角色删除', 101, 4, '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:remove', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1011, '角色导出', 101, 5, '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:export', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1012, '菜单查询', 102, 1, '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:query', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1013, '菜单新增', 102, 2, '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:add', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1014, '菜单修改', 102, 3, '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:edit', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1015, '菜单删除', 102, 4, '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:remove', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1016, '部门查询', 103, 1, '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:query', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1017, '部门新增', 103, 2, '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:add', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1018, '部门修改', 103, 3, '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:edit', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1019, '部门删除', 103, 4, '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:remove', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1020, '岗位查询', 104, 1, '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:query', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1021, '岗位新增', 104, 2, '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:add', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1022, '岗位修改', 104, 3, '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:edit', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1023, '岗位删除', 104, 4, '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:remove', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1024, '岗位导出', 104, 5, '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:export', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1025, '字典查询', 105, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:query', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1026, '字典新增', 105, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:add', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1027, '字典修改', 105, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:edit', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1028, '字典删除', 105, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:remove', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1029, '字典导出', 105, 5, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:export', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1030, '参数查询', 106, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:query', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1031, '参数新增', 106, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:add', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1032, '参数修改', 106, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:edit', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1033, '参数删除', 106, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:remove', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1034, '参数导出', 106, 5, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:export', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1035, '公告查询', 107, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:query', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1036, '公告新增', 107, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:add', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1037, '公告修改', 107, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:edit', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1038, '公告删除', 107, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:remove', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1039, '操作查询', 500, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:operlog:query', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1040, '操作删除', 500, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:operlog:remove', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1041, '日志导出', 500, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:operlog:export', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1042, '登录查询', 501, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:logininfor:query', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1043, '登录删除', 501, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:logininfor:remove', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1044, '日志导出', 501, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:logininfor:export', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1045, '账户解锁', 501, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:logininfor:unlock', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1046, '在线查询', 109, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:online:query', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1047, '批量强退', 109, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:online:batchLogout', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1048, '单条强退', 109, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:online:forceLogout', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1049, '任务查询', 110, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:query', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1050, '任务新增', 110, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:add', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1051, '任务修改', 110, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:edit', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1052, '任务删除', 110, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:remove', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1053, '状态修改', 110, 5, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:changeStatus', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1054, '任务导出', 110, 6, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:export', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1055, '生成查询', 115, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:query', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1056, '生成修改', 115, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:edit', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1057, '生成删除', 115, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:remove', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1058, '导入代码', 115, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:import', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1059, '预览代码', 115, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:preview', '#', 'admin', '2025-11-18 15:16:52', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1060, '生成代码', 115, 5, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:code', '#', 'admin', '2025-11-18 15:16:53', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2001, '服务监控', 2, 4, 'server', 'monitor/server/index', NULL, '', 1, 1, 'C', '0', '0', 'monitor:server:list', 'server', 'admin', NULL, '', NULL, '');
INSERT INTO `sys_menu` VALUES (2007, '缓存监控', 2, 5, 'cache', 'monitor/cache/index', NULL, '', 1, 1, 'C', '0', '0', 'monitor:cache:list', 'redis', 'admin', NULL, '', NULL, '');
INSERT INTO `sys_menu` VALUES (2013, '缓存列表', 2, 6, 'cacheList', 'monitor/cache/list', NULL, '', 1, 1, 'C', '0', '0', 'monitor:cache:list', 'redis-list', 'admin', NULL, '', NULL, '');
INSERT INTO `sys_menu` VALUES (2019, '系统接口', 3, 4, 'swagger', 'tool/swagger/index', NULL, '', 1, 1, 'C', '0', '0', 'tool:swagger:list', 'swagger', 'admin', NULL, '', NULL, '');
INSERT INTO `sys_menu` VALUES (2020, '系统接口查询', 2019, 0, '', NULL, NULL, '', 1, 0, 'F', '0', '0', 'tool:swagger:query', '#', 'admin', '2025-11-19 13:06:06', 'admin', '2025-11-19 13:06:06', '');
INSERT INTO `sys_menu` VALUES (2021, '系统接口新增', 2019, 1, '', NULL, NULL, '', 1, 0, 'F', '0', '0', 'tool:swagger:add', '#', 'admin', '2025-11-19 13:06:06', 'admin', '2025-11-19 13:06:06', '');
INSERT INTO `sys_menu` VALUES (2022, '系统接口修改', 2019, 2, '', NULL, NULL, '', 1, 0, 'F', '0', '0', 'tool:swagger:edit', '#', 'admin', '2025-11-19 13:06:06', 'admin', '2025-11-19 13:06:06', '');
INSERT INTO `sys_menu` VALUES (2023, '系统接口删除', 2019, 3, '', NULL, NULL, '', 1, 0, 'F', '0', '0', 'tool:swagger:remove', '#', 'admin', '2025-11-19 13:06:06', 'admin', '2025-11-19 13:06:06', '');
INSERT INTO `sys_menu` VALUES (2024, '系统接口导出', 2019, 4, '', NULL, NULL, '', 1, 0, 'F', '0', '0', 'tool:swagger:export', '#', 'admin', '2025-11-19 13:06:06', 'admin', '2025-11-19 13:06:06', '');

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice`  (
  `notice_id` int NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `notice_title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告标题',
  `notice_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告类型（1通知 2公告）',
  `notice_content` longblob NULL COMMENT '公告内容',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '公告状态（0正常 1关闭）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '通知公告表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_notice
-- ----------------------------
INSERT INTO `sys_notice` VALUES (1, '温馨提醒：2018-07-01 若依新版本发布啦', '2', 0xE696B0E78988E69CACE58685E5AEB9, '0', 'admin', '2025-11-18 15:16:55', '', NULL, '管理员');
INSERT INTO `sys_notice` VALUES (2, '维护通知：2018-07-01 若依系统凌晨维护', '1', 0xE7BBB4E68AA4E58685E5AEB9, '0', 'admin', '2025-11-18 15:16:55', '', NULL, '管理员');

-- ----------------------------
-- Table structure for sys_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_post`;
CREATE TABLE `sys_post`  (
  `post_id` bigint NOT NULL AUTO_INCREMENT COMMENT '岗位ID',
  `post_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '岗位编码',
  `post_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '岗位名称',
  `post_sort` int NOT NULL COMMENT '显示顺序',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '状态（0正常 1停用）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`post_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '岗位信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_post
-- ----------------------------
INSERT INTO `sys_post` VALUES (1, 'ceo', '董事长', 1, '0', 'admin', '2025-11-18 15:16:51', '', NULL, '');
INSERT INTO `sys_post` VALUES (2, 'se', '项目经理', 2, '0', 'admin', '2025-11-18 15:16:51', '', NULL, '');
INSERT INTO `sys_post` VALUES (3, 'hr', '人力资源', 3, '0', 'admin', '2025-11-18 15:16:51', '', NULL, '');
INSERT INTO `sys_post` VALUES (4, 'user', '普通员工', 4, '0', 'admin', '2025-11-18 15:16:51', '', NULL, '');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `role_id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `role_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色权限字符串',
  `role_sort` int NOT NULL COMMENT '显示顺序',
  `data_scope` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）',
  `menu_check_strictly` tinyint(1) NULL DEFAULT 1 COMMENT '菜单树选择项是否关联显示',
  `dept_check_strictly` tinyint(1) NULL DEFAULT 1 COMMENT '部门树选择项是否关联显示',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色状态（0正常 1停用）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 'admin', 1, '1', 1, 1, '0', '0', 'admin', '2025-11-18 15:16:51', '', NULL, '超级管理员');
INSERT INTO `sys_role` VALUES (2, '普通角色', 'common', 2, '2', 1, 1, '0', '0', 'admin', '2025-11-18 15:16:51', '', NULL, '普通角色');

-- ----------------------------
-- Table structure for sys_role_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_dept`;
CREATE TABLE `sys_role_dept`  (
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `dept_id` bigint NOT NULL COMMENT '部门ID',
  PRIMARY KEY (`role_id`, `dept_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色和部门关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_dept
-- ----------------------------
INSERT INTO `sys_role_dept` VALUES (2, 100);
INSERT INTO `sys_role_dept` VALUES (2, 101);
INSERT INTO `sys_role_dept` VALUES (2, 105);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `menu_id` bigint NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色和菜单关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (2, 1);
INSERT INTO `sys_role_menu` VALUES (2, 2);
INSERT INTO `sys_role_menu` VALUES (2, 3);
INSERT INTO `sys_role_menu` VALUES (2, 4);
INSERT INTO `sys_role_menu` VALUES (2, 100);
INSERT INTO `sys_role_menu` VALUES (2, 101);
INSERT INTO `sys_role_menu` VALUES (2, 102);
INSERT INTO `sys_role_menu` VALUES (2, 103);
INSERT INTO `sys_role_menu` VALUES (2, 104);
INSERT INTO `sys_role_menu` VALUES (2, 105);
INSERT INTO `sys_role_menu` VALUES (2, 106);
INSERT INTO `sys_role_menu` VALUES (2, 107);
INSERT INTO `sys_role_menu` VALUES (2, 108);
INSERT INTO `sys_role_menu` VALUES (2, 109);
INSERT INTO `sys_role_menu` VALUES (2, 110);
INSERT INTO `sys_role_menu` VALUES (2, 111);
INSERT INTO `sys_role_menu` VALUES (2, 112);
INSERT INTO `sys_role_menu` VALUES (2, 113);
INSERT INTO `sys_role_menu` VALUES (2, 114);
INSERT INTO `sys_role_menu` VALUES (2, 115);
INSERT INTO `sys_role_menu` VALUES (2, 116);
INSERT INTO `sys_role_menu` VALUES (2, 500);
INSERT INTO `sys_role_menu` VALUES (2, 501);
INSERT INTO `sys_role_menu` VALUES (2, 1000);
INSERT INTO `sys_role_menu` VALUES (2, 1001);
INSERT INTO `sys_role_menu` VALUES (2, 1002);
INSERT INTO `sys_role_menu` VALUES (2, 1003);
INSERT INTO `sys_role_menu` VALUES (2, 1004);
INSERT INTO `sys_role_menu` VALUES (2, 1005);
INSERT INTO `sys_role_menu` VALUES (2, 1006);
INSERT INTO `sys_role_menu` VALUES (2, 1007);
INSERT INTO `sys_role_menu` VALUES (2, 1008);
INSERT INTO `sys_role_menu` VALUES (2, 1009);
INSERT INTO `sys_role_menu` VALUES (2, 1010);
INSERT INTO `sys_role_menu` VALUES (2, 1011);
INSERT INTO `sys_role_menu` VALUES (2, 1012);
INSERT INTO `sys_role_menu` VALUES (2, 1013);
INSERT INTO `sys_role_menu` VALUES (2, 1014);
INSERT INTO `sys_role_menu` VALUES (2, 1015);
INSERT INTO `sys_role_menu` VALUES (2, 1016);
INSERT INTO `sys_role_menu` VALUES (2, 1017);
INSERT INTO `sys_role_menu` VALUES (2, 1018);
INSERT INTO `sys_role_menu` VALUES (2, 1019);
INSERT INTO `sys_role_menu` VALUES (2, 1020);
INSERT INTO `sys_role_menu` VALUES (2, 1021);
INSERT INTO `sys_role_menu` VALUES (2, 1022);
INSERT INTO `sys_role_menu` VALUES (2, 1023);
INSERT INTO `sys_role_menu` VALUES (2, 1024);
INSERT INTO `sys_role_menu` VALUES (2, 1025);
INSERT INTO `sys_role_menu` VALUES (2, 1026);
INSERT INTO `sys_role_menu` VALUES (2, 1027);
INSERT INTO `sys_role_menu` VALUES (2, 1028);
INSERT INTO `sys_role_menu` VALUES (2, 1029);
INSERT INTO `sys_role_menu` VALUES (2, 1030);
INSERT INTO `sys_role_menu` VALUES (2, 1031);
INSERT INTO `sys_role_menu` VALUES (2, 1032);
INSERT INTO `sys_role_menu` VALUES (2, 1033);
INSERT INTO `sys_role_menu` VALUES (2, 1034);
INSERT INTO `sys_role_menu` VALUES (2, 1035);
INSERT INTO `sys_role_menu` VALUES (2, 1036);
INSERT INTO `sys_role_menu` VALUES (2, 1037);
INSERT INTO `sys_role_menu` VALUES (2, 1038);
INSERT INTO `sys_role_menu` VALUES (2, 1039);
INSERT INTO `sys_role_menu` VALUES (2, 1040);
INSERT INTO `sys_role_menu` VALUES (2, 1041);
INSERT INTO `sys_role_menu` VALUES (2, 1042);
INSERT INTO `sys_role_menu` VALUES (2, 1043);
INSERT INTO `sys_role_menu` VALUES (2, 1044);
INSERT INTO `sys_role_menu` VALUES (2, 1045);
INSERT INTO `sys_role_menu` VALUES (2, 1046);
INSERT INTO `sys_role_menu` VALUES (2, 1047);
INSERT INTO `sys_role_menu` VALUES (2, 1048);
INSERT INTO `sys_role_menu` VALUES (2, 1049);
INSERT INTO `sys_role_menu` VALUES (2, 1050);
INSERT INTO `sys_role_menu` VALUES (2, 1051);
INSERT INTO `sys_role_menu` VALUES (2, 1052);
INSERT INTO `sys_role_menu` VALUES (2, 1053);
INSERT INTO `sys_role_menu` VALUES (2, 1054);
INSERT INTO `sys_role_menu` VALUES (2, 1055);
INSERT INTO `sys_role_menu` VALUES (2, 1056);
INSERT INTO `sys_role_menu` VALUES (2, 1057);
INSERT INTO `sys_role_menu` VALUES (2, 1058);
INSERT INTO `sys_role_menu` VALUES (2, 1059);
INSERT INTO `sys_role_menu` VALUES (2, 1060);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `dept_id` bigint NULL DEFAULT NULL COMMENT '部门ID',
  `user_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户账号',
  `nick_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户昵称',
  `user_type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '00' COMMENT '用户类型（00系统用户）',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '用户邮箱',
  `phonenumber` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '手机号码',
  `sex` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '用户性别（0男 1女 2未知）',
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '头像地址',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '密码',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `login_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '最后登录IP',
  `login_date` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 103, 'admin', '若依', '00', 'ry@163.com', '15888888888', '1', '', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', '127.0.0.1', '2025-11-18 15:16:51', 'admin', '2025-11-18 15:16:51', '', NULL, '管理员');
INSERT INTO `sys_user` VALUES (2, 105, 'ry', '若依', '00', 'ry@qq.com', '15666666666', '1', '', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', '127.0.0.1', '2025-11-18 15:16:51', 'admin', '2025-11-18 15:16:51', 'admin', '2025-11-18 20:44:22', '测试员');

-- ----------------------------
-- Table structure for sys_user_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_post`;
CREATE TABLE `sys_user_post`  (
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `post_id` bigint NOT NULL COMMENT '岗位ID',
  PRIMARY KEY (`user_id`, `post_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户与岗位关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_post
-- ----------------------------
INSERT INTO `sys_user_post` VALUES (1, 1);
INSERT INTO `sys_user_post` VALUES (2, 2);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户和角色关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1);
INSERT INTO `sys_user_role` VALUES (2, 2);

SET FOREIGN_KEY_CHECKS = 1;
