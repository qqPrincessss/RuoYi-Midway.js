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

<p align="center">A cross-platform desktop application based on Midway.js + Vue3 + Element Plus + Tauri</p>
<p align="center">🖥️ <strong>Tauri + Monorepo Cross-platform Version</strong> - Supports Windows, macOS, Linux 🚀</p>

<p align="center">
  <a href="./README.zh-CN.md">中文</a> | English
</p>

## Introduction

RuoYi-Midwayjs is a modern admin management system rebuilt with Node.js full-stack technology based on the RuoYi framework concept. The backend uses Midway.js framework, and the frontend uses Vue3 + Element Plus, providing a complete enterprise-level admin management solution.

**This is the Tauri + Monorepo cross-platform version**, built with Tauri 2.x for creating native desktop applications. It supports Windows, macOS, and Linux platforms with unified Monorepo project management, combining the power of web technologies with native performance.

## Tech Stack

### Frontend

| Technology | Description |
| --- | --- |
| Vue 3 | Progressive JavaScript Framework |
| Vite | Next Generation Frontend Build Tool |
| Tauri 2.x | Cross-platform Desktop App Framework |
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
├── apps                    # Monorepo applications
│   ├── backend             # Backend project (Midway.js)
│   │   ├── src
│   │   │   ├── config      # Configuration
│   │   │   ├── controller  # Controllers
│   │   │   ├── service     # Services
│   │   │   ├── entity      # Entities
│   │   │   ├── middleware  # Middleware
│   │   │   └── utils       # Utilities
│   │   └── package.json
│   └── frontend            # Frontend project (Vue3 + Tauri)
│       ├── src
│       │   ├── api         # API interfaces
│       │   ├── assets      # Static assets
│       │   ├── components  # Components
│       │   ├── layout      # Layout
│       │   ├── router      # Router
│       │   ├── store       # Store
│       │   ├── utils       # Utilities
│       │   └── views       # Views
│       ├── src-tauri       # Tauri configuration
│       └── package.json
├── package.json            # Root package.json
└── README.md
```

## Quick Start

### Requirements

- Node.js >= 16
- PostgreSQL >= 13
- Redis >= 5.0

### Installation

```bash
# Install dependencies (uses pnpm workspace)
pnpm install
```

### Backend Setup

```bash
# Enter backend directory
cd apps/backend

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
pnpm dev
```

### Frontend Setup (Web)

```bash
# Enter frontend directory
cd apps/frontend

# Start development server
pnpm dev
```

### Tauri Desktop App

```bash
# Enter frontend directory
cd apps/frontend

# Start Tauri development
pnpm tauri-dev

# Build for production
pnpm tauri-build

# Build for specific platform
pnpm tauri-build:win    # Windows
pnpm tauri-build:macos  # macOS
pnpm tauri-build:linux  # Linux
```

### Access URLs

- Frontend: http://localhost:8888
- Backend: http://localhost:7725
- Swagger Docs: http://localhost:7725/swagger-ui/index.html

## Other Versions

| Version | Description | Link |
| --- | --- | --- |
| MySQL Version | Original web version based on MySQL database | [View](https://github.com/qqPrincesss/RuoYi-Midway.js/tree/main) |
| PostgreSQL Version | Web version with PostgreSQL, enhanced performance | [View](https://github.com/qqPrincesss/RuoYi-Midway.js/tree/pg) |

## About Author

- Blog: [https://www.xierfloat.top](https://www.xierfloat.top)
- WeChat Official Account: **增七**

## Special Thanks

Thanks to the following open source projects for reference and inspiration:

- [nest-admin](https://gitee.com/tao-zhi/nest-admin) - NestJS Admin System
- [ruoyi_nodejs_open](https://gitee.com/ruirui-study/ruoyi_nodejs_open) - RuoYi Midway.js Version

## License

[MIT](LICENSE)
