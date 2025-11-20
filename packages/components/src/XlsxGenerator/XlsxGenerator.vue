<template>
  <div>
    <button @click="handleClick">生成 Excel</button>
  </div>
</template>
<script setup lang="ts">
import { generateXLSX } from "@xierfloat-monorepo/utils/xlsx";
const handleClick = () => {
  generateXLSX(
    [
      ["姓名", "年龄"],
      ["张三", 18]
    ],
    "测试"
  );
};
</script>
