<template>
  <div class="app-container home">
    <!-- 欢迎区域 -->
    <el-row :gutter="20" class="welcome-section">
      <el-col :span="24">
        <el-card shadow="hover" class="welcome-card">
          <div class="welcome-content">
            <h1 class="welcome-title">RuoYi-Midwayjs 管理系统</h1>
            <p class="welcome-desc">
              基于 Midway.js + Vue3 + Element Plus 的现代化后台管理系统
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 技术栈区域 -->
    <el-row :gutter="20" class="tech-section">
      <el-col :xs="24" :sm="12">
        <el-card shadow="hover" class="tech-card">
          <template #header>
            <div class="card-header">
              <el-icon><Monitor /></el-icon>
              <span>前端技术栈</span>
            </div>
          </template>
          <div class="tech-list">
            <el-tag v-for="tech in frontendTech" :key="tech.name" :type="tech.type" effect="plain" class="tech-tag">
              {{ tech.name }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-card shadow="hover" class="tech-card">
          <template #header>
            <div class="card-header">
              <el-icon><Cpu /></el-icon>
              <span>后端技术栈</span>
            </div>
          </template>
          <div class="tech-list">
            <el-tag v-for="tech in backendTech" :key="tech.name" :type="tech.type" effect="plain" class="tech-tag">
              {{ tech.name }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 其他版本 -->
    <el-row :gutter="20" class="version-section">
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon><Collection /></el-icon>
              <span>其他版本</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" v-for="version in otherVersions" :key="version.title">
              <div class="version-item">
                <div class="version-icon">
                  <el-icon :size="40" :color="version.color">
                    <component :is="version.icon" />
                  </el-icon>
                </div>
                <div class="version-info">
                  <h4>{{ version.title }}</h4>
                  <p>{{ version.desc }}</p>
                  <div class="version-tags">
                    <el-tag v-for="tag in version.tags" :key="tag" size="small" effect="plain">
                      {{ tag }}
                    </el-tag>
                  </div>
                  <el-link type="primary" :href="version.link" target="_blank" class="version-link">
                    查看源码
                  </el-link>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- 作者信息 -->
    <el-row :gutter="20" class="author-section">
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon><User /></el-icon>
              <span>关于作者</span>
            </div>
          </template>
          <div class="author-content">
            <el-row :gutter="40" justify="center">
              <el-col :xs="24" :sm="12" :md="8">
                <div class="author-item">
                  <el-icon :size="48" color="#409eff"><Link /></el-icon>
                  <h4>个人博客</h4>
                  <el-link type="primary" :href="authorInfo.blog" target="_blank">
                    {{ authorInfo.blog }}
                  </el-link>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <div class="author-item">
                  <el-icon :size="48" color="#67c23a"><ChatDotRound /></el-icon>
                  <h4>微信公众号</h4>
                  <p class="wechat-name">{{ authorInfo.wechat }}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 项目特性 -->
    <el-row :gutter="20" class="feature-section">
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon><Star /></el-icon>
              <span>项目特性</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="6" v-for="feature in features" :key="feature.title">
              <div class="feature-item">
                <el-icon :size="32" :color="feature.color">
                  <component :is="feature.icon" />
                </el-icon>
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.desc }}</p>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index">
import { Monitor, Cpu, Star, User, Link, ChatDotRound, Lightning, Lock, Setting, DataLine, Collection, Platform, Coin } from '@element-plus/icons-vue'

// 前端技术栈
const frontendTech = [
  { name: 'Vue 3', type: 'success' },
  { name: 'Vite', type: 'warning' },
  { name: 'Element Plus', type: 'primary' },
  { name: 'Pinia', type: 'success' },
  { name: 'Vue Router', type: 'success' },
  { name: 'Axios', type: 'info' },
  { name: 'ECharts', type: 'danger' },
  { name: 'Sass', type: 'warning' }
]

// 后端技术栈
const backendTech = [
  { name: 'Midway.js', type: 'primary' },
  { name: 'TypeORM', type: 'success' },
  { name: 'MySQL', type: 'info' },
  { name: 'Redis', type: 'danger' },
  { name: 'JWT', type: 'warning' },
  { name: 'Swagger', type: 'success' },
  { name: 'MinIO', type: 'info' },
  { name: 'TypeScript', type: 'primary' }
]

// 项目特性
const features = [
  {
    icon: Lightning,
    title: '快速开发',
    desc: '基于成熟框架，开箱即用',
    color: '#e6a23c'
  },
  {
    icon: Lock,
    title: '权限管理',
    desc: '完善的RBAC权限控制',
    color: '#409eff'
  },
  {
    icon: Setting,
    title: '代码生成',
    desc: '一键生成前后端代码',
    color: '#67c23a'
  },
  {
    icon: DataLine,
    title: '系统监控',
    desc: '实时监控系统运行状态',
    color: '#f56c6c'
  }
]

// 作者信息
const authorInfo = {
  blog: 'https://www.xierfloat.top',
  wechat: '增七'
}

// 其他版本
const otherVersions = [
  {
    icon: Coin,
    title: '页面优化 + PostgreSQL 版本',
    desc: '基于 PostgreSQL 数据库，页面体验优化，性能更强劲',
    color: '#336791',
    tags: ['PostgreSQL', '页面优化', '性能提升'],
    link: 'https://github.com/qqPrincesss/RuoYi-Midway.js/tree/pg'
  },
  {
    icon: Platform,
    title: 'Tauri + Monorepo 跨平台版本',
    desc: '基于 Tauri 构建跨平台桌面应用，Monorepo 统一管理',
    color: '#ffc131',
    tags: ['Tauri', 'Monorepo', '跨平台', '桌面应用'],
    link: 'https://github.com/qqPrincesss/RuoYi-Midway.js/tree/Tauri'
  }
]
</script>

<style scoped lang="scss">
.home {
  height: calc(100vh - 89px);
  overflow: auto;
}

.welcome-section {
  margin-bottom: 20px;
}

.welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;

  .welcome-content {
    text-align: center;
    padding: 40px 20px;

    .welcome-title {
      color: #fff;
      font-size: 32px;
      margin: 0 0 16px;
      font-weight: 600;
    }

    .welcome-desc {
      color: rgba(255, 255, 255, 0.9);
      font-size: 16px;
      margin: 0;
    }
  }
}

.tech-section,
.feature-section,
.author-section,
.version-section {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  font-weight: 600;

  .el-icon {
    margin-right: 8px;
  }
}

.tech-card {
  height: 100%;

  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tech-tag {
    font-size: 14px;
  }
}

.feature-item {
  text-align: center;
  padding: 20px;

  h4 {
    margin: 16px 0 8px;
    font-size: 16px;
    color: #303133;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #909399;
  }
}

.author-content {
  padding: 20px 0;
}

.author-item {
  text-align: center;
  padding: 20px;

  h4 {
    margin: 16px 0 12px;
    font-size: 16px;
    color: #303133;
  }

  .wechat-name {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #67c23a;
  }
}

.version-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
  margin-bottom: 15px;
  transition: all 0.3s;

  &:hover {
    background: #ecf5ff;
    transform: translateY(-2px);
  }

  .version-icon {
    flex-shrink: 0;
    margin-right: 16px;
    padding: 10px;
    background: #fff;
    border-radius: 8px;
  }

  .version-info {
    flex: 1;

    h4 {
      margin: 0 0 8px;
      font-size: 16px;
      color: #303133;
      font-weight: 600;
    }

    p {
      margin: 0 0 12px;
      font-size: 14px;
      color: #606266;
      line-height: 1.5;
    }

    .version-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .version-link {
      margin-top: 12px;
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 768px) {
  .welcome-card .welcome-content {
    padding: 30px 15px;

    .welcome-title {
      font-size: 24px;
    }

    .welcome-desc {
      font-size: 14px;
    }
  }

  .tech-card {
    margin-bottom: 20px;
  }

  .version-item {
    flex-direction: column;
    text-align: center;

    .version-icon {
      margin-right: 0;
      margin-bottom: 12px;
    }

    .version-info .version-tags {
      justify-content: center;
    }
  }
}
</style>
