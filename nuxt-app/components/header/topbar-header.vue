<template>
  <header class="header">
    <top-navbar />
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore'

const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  background-color: $color-dark;
  color: $color-text-main;
  border-bottom: 2px solid $color-accent;
}


</style>
