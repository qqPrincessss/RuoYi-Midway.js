<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script setup>
const url = ref('https://midway-admin.dooring.vip/prod-api/swagger-ui')

function goto() {
  window.open(url.value)
}
</script>
