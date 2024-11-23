<template>
  <div class="user-list">
    <button @click="fetchAllUsers">Voir tous les utilisateurs</button>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">{{ user.username }} - Niveau {{ user.level }}</li>
    </ul>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const users = ref([])
const errorMessage = ref('')

const fetchAllUsers = async () => {
  const token = localStorage.getItem('access_token')
  if (token) {
    try {
      users.value = await $fetch('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Erreur de récupération des utilisateurs.'
    }
  }
}
</script>

<style scoped lang="scss">
.user-list {
  margin: 1rem 0;
}
.error {
  color: red;
}
</style>
