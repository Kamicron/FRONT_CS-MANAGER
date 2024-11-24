<template>
  <div class="user">
    <user-list />
  </div>
</template>

<script setup lang='ts'>
definePageMeta({
  middleware: 'auth-admin',
})
</script>

<style lang='scss' scoped>
.user {}
</style>