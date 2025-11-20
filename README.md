<h1 align="center">RuoYi-Midwayjs</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.2.45-brightgreen.svg"/>
  <img src="https://img.shields.io/badge/Element%20Plus-2.2.27-blue.svg"/>
  <img src="https://img.shields.io/badge/Midway.js-3.20-orange.svg"/>
  <img src="https://img.shields.io/badge/PostgreSQL-13+-336791.svg"/>
  <img src="https://img.shields.io/badge/TypeORM-0.3.25-red.svg"/>
  <img src="https://img.shields.io/badge/License-MIT-green.svg"/>
</p>

<p align="center">A modern admin management system based on Midway.js + Vue3 + Element Plus + PostgreSQL</p>
<p align="center">🐘 <strong>PostgreSQL Version</strong> - Enhanced page experience & robust performance 🚀</p>

<p align="center">
  <a href="./README.zh-CN.md">中文</a> | English
</p>

## Introduction

RuoYi-Midwayjs is a modern admin management system rebuilt with Node.js full-stack technology based on the RuoYi framework concept. The backend uses Midway.js framework, and the frontend uses Vue3 + Element Plus, providing a complete enterprise-level admin management solution.

**This is the PostgreSQL version** with optimized page experience, enhanced performance, and better scalability. PostgreSQL provides robust ACID compliance, advanced features, and excellent data integrity for enterprise applications.

## Tech Stack

### Frontend

| Technology | Description |
| --- | --- |
| Vue 3 | Progressive JavaScript Framework |
| Vite | Next Generation Frontend Build Tool |
| Element Plus | Vue 3 Component Library |
| Pinia | Vue State Management |
| Vue Router | Official Vue Router |
| Axios | HTTP Client |
| ECharts | Visualization Library |
| Sass | CSS Preprocessor |

### Backend

| Technology | Description |
| --- | --- |
| Midway.js | Node.js Enterprise Framework |
| TypeORM | TypeScript ORM Framework |
| PostgreSQL | Advanced Open Source Relational Database |
| Redis | Cache Database |
| JWT | Authentication |
| Swagger | API Documentation |
| TypeScript | JavaScript Superset |

## Features

- **Rapid Development** - Based on mature frameworks, ready to use out of the box
- **Permission Management** - Complete RBAC permission control
- **Code Generation** - One-click generation of frontend and backend code
- **System Monitoring** - Real-time system status monitoring
- **User Management** - User, role, department, position management
- **Menu Management** - Dynamic menus, button-level permission control
- **Dictionary Management** - System dictionary data maintenance
- **Parameter Management** - System parameter configuration
- **Notifications** - System notification publishing
- **Operation Logs** - System operation log recording
- **Login Logs** - System login log recording
- **Online Users** - Online user monitoring
- **Scheduled Tasks** - Task scheduling management
- **Server Monitoring** - Server status monitoring

## Directory Structure

```
RuoYi-Midwayjs
├── backend-midway          # Backend project
│   ├── src
│   │   ├── config          # Configuration
│   │   ├── controller      # Controllers
│   │   ├── service         # Services
│   │   ├── entity          # Entities
│   │   ├── middleware      # Middleware
│   │   └── utils           # Utilities
│   └── package.json
├── frontend-vue3           # Frontend project
│   ├── src
│   │   ├── api             # API interfaces
│   │   ├── assets          # Static assets
│   │   ├── components      # Components
│   │   ├── layout          # Layout
│   │   ├── router          # Router
│   │   ├── store           # Store
│   │   ├── utils           # Utilities
│   │   └── views           # Views
│   └── package.json
└── README.md
```

## Quick Start

### Requirements

- Node.js >= 16
- PostgreSQL >= 13
- Redis >= 5.0

### Backend Setup

```bash
# Enter backend directory
cd backend-midway

# Install dependencies
npm install

# Import database
# Create PostgreSQL database and import SQL file
psql -U postgres -d your_database -f sql/ruoyi_pg.sql

# Configure database connection
# Modify PostgreSQL configuration in .env.development file
# DB_TYPE=postgres
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=postgres
# DB_PASSWORD=your_password
# DB_DATABASE=your_database

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Enter frontend directory
cd frontend-vue3

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access URLs

- Frontend: http://localhost:8888
- Backend: http://localhost:7725
- Swagger Docs: http://localhost:7725/swagger-ui/index.html

## Other Versions

| Version | Description | Link |
| --- | --- | --- |
| MySQL Version | Original version based on MySQL database | [View](https://github.com/qqPrincesss/RuoYi-Midway.js/tree/main) |
| Tauri Cross-platform Version | Cross-platform desktop app built with Tauri, Monorepo management | [View](https://github.com/qqPrincesss/RuoYi-Midway.js/tree/Tauri) |

## About Author

- Blog: [https://www.xierfloat.top](https://www.xierfloat.top)
- WeChat Official Account: **增七**

## Special Thanks

Thanks to the following open source projects for reference and inspiration:

- [nest-admin](https://gitee.com/tao-zhi/nest-admin) - NestJS Admin System
- [ruoyi_nodejs_open](https://gitee.com/ruirui-study/ruoyi_nodejs_open) - RuoYi Midway.js Version

## License

[MIT](LICENSE)
