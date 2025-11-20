<template>
    <div class="title" style="margin-top: -20px;">
        <p class="text">{{ title }}</p>
    </div>
    <div class="header"></div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
})
</script>
<!-- css样式 -->
<style scoped>
.header{
  margin-top: 10px;
  border-top: 1px solid rgba(230, 230, 230, 1);
  margin-bottom: 20px;
}
  .title {
  height: 35px;
  padding: 15px;
  border-left: 5px solid var(--el-color-primary);
  display: flex;
  align-items: center;
}

.text {
  font-size: 18px;
  font-weight: 600;
}
</style>