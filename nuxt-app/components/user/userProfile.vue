<template>
  <div class="user-profile" v-if="authStore.user">
    <p>Connecté en tant que {{ authStore.user.username }} (Niveau : {{ authStore.user.level }})</p>
    <p v-if="authStore.user.isAdmin">Vous êtes admin</p>
    <button @click="authStore.logout">Déconnexion</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore'

const authStore = useAuthStore()
</script>

<style scoped>
.user-profile {
  margin-bottom: 1rem;
}
</style>
