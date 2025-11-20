<h1 align="center">RuoYi-Midwayjs</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.2.45-brightgreen.svg"/>
  <img src="https://img.shields.io/badge/Element%20Plus-2.2.27-blue.svg"/>
  <img src="https://img.shields.io/badge/Midway.js-3.20-orange.svg"/>
  <img src="https://img.shields.io/badge/Tauri-2.x-ffc131.svg"/>
  <img src="https://img.shields.io/badge/PostgreSQL-13+-336791.svg"/>
  <img src="https://img.shields.io/badge/TypeORM-0.3.25-red.svg"/>
  <img src="https://img.shields.io/badge/License-MIT-green.svg"/>
</p>

<p align="center">基于 Midway.js + Vue3 + Element Plus + Tauri 的跨平台桌面应用</p>
<p align="center">🖥️ <strong>Tauri + Monorepo 跨平台版本</strong> - 支持 Windows、macOS、Linux 🚀</p>

<p align="center">
  中文 | <a href="./README.md">English</a>
</p>

## 项目介绍

RuoYi-Midwayjs 是一个基于若依框架思想，使用 Node.js 全栈技术重构的后台管理系统。后端采用 Midway.js 框架，前端使用 Vue3 + Element Plus，提供了一套完整的企业级后台管理解决方案。

**这是 Tauri + Monorepo 跨平台版本**，使用 Tauri 2.x 构建原生桌面应用。支持 Windows、macOS 和 Linux 平台，采用 Monorepo 统一管理项目，结合 Web 技术的灵活性与原生应用的性能优势。

## 技术栈

### 前端技术

| 技术 | 说明 |
| --- | --- |
| Vue 3 | 渐进式 JavaScript 框架 |
| Vite | 下一代前端构建工具 |
| Tauri 2.x | 跨平台桌面应用框架 |
| Element Plus | Vue 3 组件库 |
| Pinia | Vue 状态管理库 |
| Vue Router | Vue 官方路由管理器 |
| Axios | HTTP 请求库 |
| ECharts | 可视化图表库 |
| Sass | CSS 预处理器 |

### 后端技术

| 技术 | 说明 |
| --- | --- |
| Midway.js | Node.js 企业级框架 |
| TypeORM | TypeScript ORM 框架 |
| PostgreSQL | 先进的开源关系型数据库 |
| Redis | 缓存数据库 |
| JWT | 身份认证 |
| Swagger | API 文档 |
| TypeScript | JavaScript 超集 |

## 功能特性

- **快速开发** - 基于成熟框架，开箱即用
- **权限管理** - 完善的 RBAC 权限控制
- **代码生成** - 一键生成前后端代码
- **系统监控** - 实时监控系统运行状态
- **用户管理** - 用户、角色、部门、岗位管理
- **菜单管理** - 动态菜单，按钮级别权限控制
- **字典管理** - 系统字典数据维护
- **参数管理** - 系统参数配置
- **通知公告** - 系统通知公告发布
- **操作日志** - 系统操作日志记录
- **登录日志** - 系统登录日志记录
- **在线用户** - 在线用户监控
- **定时任务** - 定时任务调度管理
- **服务监控** - 服务器状态监控

## 目录结构

```
RuoYi-Midwayjs
├── apps                    # Monorepo 应用目录
│   ├── backend             # 后端项目 (Midway.js)
│   │   ├── src
│   │   │   ├── config      # 配置文件
│   │   │   ├── controller  # 控制器
│   │   │   ├── service     # 服务层
│   │   │   ├── entity      # 实体类
│   │   │   ├── middleware  # 中间件
│   │   │   └── utils       # 工具类
│   │   └── package.json
│   └── frontend            # 前端项目 (Vue3 + Tauri)
│       ├── src
│       │   ├── api         # API 接口
│       │   ├── assets      # 静态资源
│       │   ├── components  # 公共组件
│       │   ├── layout      # 布局组件
│       │   ├── router      # 路由配置
│       │   ├── store       # 状态管理
│       │   ├── utils       # 工具函数
│       │   └── views       # 页面组件
│       ├── src-tauri       # Tauri 配置
│       └── package.json
├── package.json            # 根 package.json
└── README.md
```

## 快速开始

### 环境要求

- Node.js >= 16
- PostgreSQL >= 13
- Redis >= 5.0

### 安装依赖

```bash
# 安装依赖（使用 pnpm workspace）
pnpm install
```

### 后端启动

```bash
# 进入后端目录
cd apps/backend

# 导入数据库
# 创建 PostgreSQL 数据库并导入 SQL 文件
psql -U postgres -d your_database -f sql/ruoyi_pg.sql

# 配置数据库连接
# 修改 .env.development 文件中的 PostgreSQL 配置
# DB_TYPE=postgres
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=postgres
# DB_PASSWORD=your_password
# DB_DATABASE=your_database

# 启动开发服务
pnpm dev
```

### 前端启动 (Web)

```bash
# 进入前端目录
cd apps/frontend

# 启动开发服务
pnpm dev
```

### Tauri 桌面应用

```bash
# 进入前端目录
cd apps/frontend

# 启动 Tauri 开发
pnpm tauri-dev

# 构建生产版本
pnpm tauri-build

# 构建特定平台
pnpm tauri-build:win    # Windows
pnpm tauri-build:macos  # macOS
pnpm tauri-build:linux  # Linux
```

### 访问地址

- 前端地址：http://localhost:8888
- 后端地址：http://localhost:7725
- Swagger 文档：http://localhost:7725/swagger-ui/index.html

## 其他版本

| 版本 | 说明 | 链接 |
| --- | --- | --- |
| MySQL 原版 | 基于 MySQL 数据库的原始 Web 版本 | [查看](https://github.com/qqPrincesss/RuoYi-Midway.js/tree/main) |
| PostgreSQL 版本 | PostgreSQL 数据库 Web 版本，性能更强劲 | [查看](https://github.com/qqPrincesss/RuoYi-Midway.js/tree/pg) |

## 关于作者

- 个人博客：[https://www.xierfloat.top](https://www.xierfloat.top)
- 微信公众号：**增七**

## 特别感谢

感谢以下开源项目提供的参考和灵感：

- [nest-admin](https://gitee.com/tao-zhi/nest-admin) - NestJS 后台管理系统
- [ruoyi_nodejs_open](https://gitee.com/ruirui-study/ruoyi_nodejs_open) - 若依 midway.js 版本

## 许可证

[MIT](LICENSE)
