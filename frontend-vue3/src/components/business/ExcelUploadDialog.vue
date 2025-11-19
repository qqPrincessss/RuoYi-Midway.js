<template>
  <el-dialog v-model="visible" :title="title" width="400px" append-to-body @close="handleClose">
    <el-upload
      ref="uploadRef"
      :limit="1"
      accept=".xlsx, .xls"
      :http-request="customUploadRequest"
      :disabled="isUploading"
      :on-success="handleFileSuccess"
      :on-error="handleFileError"
      :auto-upload="false"
      :on-change="handleFileChange"
      :on-remove="handleFileRemove"
      drag
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip text-center">
          <div v-if="showUpdateSupport" class="el-upload__tip">
            <el-checkbox v-model="updateSupport" />
            是否更新已经存在的数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link v-if="templateUrl" type="primary" :underline="false" style="font-size: 12px; vertical-align: baseline" @click="handleDownloadTemplate">下载模板</el-link>
        </div>
      </template>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { getToken } from '@/utils/auth'
import service from '@/utils/request'

// Props 定义
const props = defineProps({
  // 对话框标题
  title: {
    type: String,
    default: '数据导入'
  },
  // 上传接口地址
  uploadUrl: {
    type: String,
    required: true
  },
  // 模板下载地址（完整URL或接口路径）
  templateUrl: {
    type: String,
    default: ''
  },
  // 是否显示"更新已存在数据"选项
  showUpdateSupport: {
    type: Boolean,
    default: true
  },
  // 额外的上传参数
  extraParams: {
    type: Object,
    default: () => ({})
  }
})

// Emits 定义
const emit = defineEmits(['success', 'error', 'close'])

const { proxy } = getCurrentInstance()

// 状态管理
const visible = ref(false)
const uploadRef = ref(null)
const isUploading = ref(false)
const updateSupport = ref(false)
const selectedFiles = ref([]) // 本地维护已选择的文件列表

// 打开对话框
function open() {
  visible.value = true
  updateSupport.value = false
  isUploading.value = false
}

// 关闭对话框
function handleClose() {
  visible.value = false
  resetUpload()
  emit('close')
}

// 重置上传组件
function resetUpload() {
  if (uploadRef.value) {
    uploadRef.value.clearFiles()
  }
  selectedFiles.value = [] // 同步清空本地文件列表
  isUploading.value = false
  updateSupport.value = false
}

// 提交上传
function submitFileForm() {
  if (!uploadRef.value) return
  const files = selectedFiles.value
  if (!files || files.length === 0) {
    proxy.$modal.msgError('请先选择要上传的文件')
    return
  }
  uploadRef.value.submit()
}

// 自定义上传请求（使用配置好的 service，支持 Tauri 环境）
async function customUploadRequest(options) {
  const { file, onProgress, onSuccess, onError } = options

  try {
    // 构建上传 URL（带查询参数）
    const hasQuery = props.uploadUrl.includes('?')
    const params = new URLSearchParams({
      updateSupport: updateSupport.value ? 'true' : 'false',
      ...Object.fromEntries(Object.entries(props.extraParams || {}).map(([k, v]) => [k, v == null ? '' : String(v)]))
    }).toString()
    const url = props.uploadUrl + (hasQuery ? '&' : '?') + params

    // 构建 FormData
    const formData = new FormData()
    formData.append('files', file.raw || file)

    // 添加额外参数到 FormData
    Object.entries(props.extraParams || {}).forEach(([key, value]) => {
      if (value != null) {
        formData.append(key, String(value))
      }
    })

    // 调用上传进度回调
    handleFileUploadProgress()

    // 使用 service 上传（支持 Tauri 环境）
    const response = await service.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + getToken()
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress({ percent })
        }
      }
    })

    // 上传成功（response 已经是完整的后端响应数据）
    onSuccess(response, file)
  } catch (error) {
    console.error('Upload error:', error)
    onError(error, file)
  }
}

// 事件：文件变更与移除，更新本地 selectedFiles
function handleFileChange(uploadFile, uploadFiles) {
  selectedFiles.value = uploadFiles
}
function handleFileRemove(uploadFile, uploadFiles) {
  selectedFiles.value = uploadFiles
}

// 文件上传中
function handleFileUploadProgress() {
  isUploading.value = true
  proxy.$modal.loading('正在上传文件，请稍候...')
}

// 文件上传成功
function handleFileSuccess(response) {
  isUploading.value = false
  proxy.$modal.closeLoading()

  // 兼容两种响应结构
  const isSuccess = response?.success === true || response?.code === 200
  const msg = response?.message ?? response?.msg ?? (isSuccess ? '导入成功' : '导入失败')

  // 组装汇总与失败明细
  const successCount = response?.data?.successCount ?? null
  const failCount = response?.data?.failCount ?? null
  const failMessages = Array.isArray(response?.data?.failMessages) ? response.data.failMessages : []

  const summary = successCount !== null && failCount !== null ? `导入完成！成功${successCount}条，失败${failCount}条` : msg

  if (isSuccess) {
    const content = [summary, failMessages.length ? '失败明细：\n' + failMessages.join('\n') : ''].filter(Boolean).join('\n')
    proxy.$modal.alert(content) // 弹出结果与失败明细
    handleClose()
    emit('success', response)
  } else {
    proxy.$modal.msgError(msg)
    if (failMessages.length) {
      const content = '失败明细：\n' + failMessages.join('\n')
      proxy.$modal.alertError(content)
    }
    emit('error', response)
  }
}

// 文件上传失败
function handleFileError(error) {
  isUploading.value = false
  proxy.$modal.closeLoading()
  proxy.$modal.msgError('上传失败，请重试')
  emit('error', error)
}

// 下载模板
function handleDownloadTemplate() {
  if (!props.templateUrl) return

  // 如果是完整URL，直接下载
  if (props.templateUrl.startsWith('http')) {
    window.open(props.templateUrl, '_blank')
    return
  }

  // 否则使用 proxy.download 方法
  proxy.download(props.templateUrl, {}, `模板_${new Date().getTime()}.xlsx`)
}

// 暴露方法给父组件
defineExpose({
  open,
  close: handleClose
})
</script>

<style scoped>
.el-upload__text em {
  color: var(--el-color-primary);
  font-style: normal;
}

.el-upload__tip {
  margin-top: 8px;
  line-height: 1.5;
}
</style>
