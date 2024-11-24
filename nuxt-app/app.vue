<template>
  <div class="main">
    <!-- <login /> -->
     <topbar-header />
    <NuxtPage />
  </div>
</template>

<script setup lang='ts'>
import { useAuthStore } from '~/stores/useAuthStore'

const authStore = useAuthStore()

onServerPrefetch(() => {
  return authStore.serverInitialize()
})

if (process.client) {
  authStore.initializeFromToken()
}
</script>

<style lang='scss' scoped>

.main {
  width: 100%;
  height: 100%;
  color: #f5f2ff;
}

</style>