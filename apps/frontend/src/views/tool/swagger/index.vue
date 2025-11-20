<template>
   <i-frame :src="url"></i-frame>
</template>

<script setup>
import { ref } from 'vue'
import iFrame from '@/components/iFrame'

const url = ref("http://127.0.0.1:7725/swagger-ui/index.html")
</script>
