<template>
  <div class="top-right-btn" :style="style">
    <el-row>
      <el-button v-if="add" type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="[add]">新增</el-button>
      <el-button v-if="unlock" type="primary" plain icon="Unlock" :disabled="single" @click="handleUnlock" v-hasPermi="[unlock]">解锁</el-button>
      <el-button v-if="update" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate" v-hasPermi="[update]">修改</el-button>
      <el-button v-if="del" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete" v-hasPermi="[del]">删除</el-button>
      <el-button v-if="clean" type="danger" plain icon="Delete" @click="handleClean" v-hasPermi="[clean]">清空</el-button>
      <el-button v-if="imp" type="info" plain icon="Upload" @click="handleImport" v-hasPermi="[imp]">导入</el-button>
      <el-button v-if="exp" type="warning" plain icon="Download" @click="handleExport" v-hasPermi="[exp]">导出</el-button>
      <el-button v-if="isExpandAll" type="info" plain icon="Sort" @click="toggleExpandAll">展开/折叠</el-button>
      <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top" v-if="showSearch">
        <el-button circle icon="Search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button circle icon="Refresh" @click="refresh()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="columns">
        <el-button circle icon="Menu" @click="showColumn()" />
      </el-tooltip>
    </el-row>
    <el-dialog v-model="open" append-to-body>
      <Title :title="title" />
      <el-transfer :titles="['显示', '隐藏']" v-model="value" :data="columns" @change="dataChange"></el-transfer>
    </el-dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  showSearch: {
    type: Boolean,
    default: true
  },
  columns: {
    type: Array
  },
  multiple: {
    type: Boolean,
    default: false
  },
  search: {
    type: Boolean,
    default: true
  },
  gutter: {
    type: Number,
    default: 10
  },
  add: {
    type: String,
    default: ''
  },
  update: {
    type: String,
    default: ''
  },
  del: {
    type: String,
    default: ''
  },
  imp: {
    type: String,
    default: ''
  },
  exp: {
    type: String,
    default: ''
  },
  clean: {
    type: String,
    default: ''
  },
  single: {
    type: Boolean,
    default: false
  },
  isExpandAll: {
    type: Boolean,
    default: false
  },
  unlock: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:showSearch', 'queryTable', 'handleAdd', 'handleUpdate', 'handleClean', 'handleDelete', 'handleImport', 'handleExport', 'handleUnlock'])

// 显隐数据
const value = ref([])
// 弹出层标题
const title = ref('显示/隐藏')
// 是否显示弹出层
const open = ref(false)

const style = computed(() => {
  const ret = {}
  if (props.gutter) {
    ret.marginRight = `${props.gutter / 2}px`
  }
  return ret
})

// 搜索
function toggleSearch() {
  emits('update:showSearch', !props.showSearch)
}

// 刷新
function refresh() {
  emits('queryTable')
}
function handleAdd() {
  emits('handleAdd')
}
// 修改
function handleUpdate() {
  emits('handleUpdate')
}
// 删除
function handleDelete() {
  emits('handleDelete')
}
// 导入
function handleImport() {
  emits('handleImport')
}
// 导出
function handleExport() {
  emits('handleExport')
}
// 展开/折叠
function toggleExpandAll() {
  emits('toggleExpandAll')
}

// 清空
function handleClean() {
  emits('handleClean')
}
// 解锁
function handleUnlock() {
  emits('handleUnlock')
}
// 右侧列表元素变化
function dataChange(data) {
  for (let item in props.columns) {
    const key = props.columns[item].key
    props.columns[item].visible = !data.includes(key)
  }
}

// 打开显隐列dialog
function showColumn() {
  open.value = true
}

// 显隐列初始默认隐藏列
for (let item in props.columns) {
  if (props.columns[item].visible === false) {
    value.value.push(parseInt(item))
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-transfer__button) {
  border-radius: 50%;
  display: block;
  margin-left: 0px;
}

:deep(.el-transfer__button:first-child) {
  margin-bottom: 10px;
}

.my-el-transfer {
  text-align: center;
}
</style>
