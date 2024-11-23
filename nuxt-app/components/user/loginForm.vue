<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <div>
      <label for="username">Nom d'utilisateur</label>
      <input v-model="username" type="text" id="username" required />
    </div>
    <div>
      <label for="password">Mot de passe</label>
      <input v-model="password" type="password" id="password" required />
    </div>
    <button type="submit">Connexion</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  console.log('test');
  
  try {
    await authStore.login(username.value, password.value)
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = 'Erreur de connexion. Veuillez vérifier vos identifiants.'
  }
}
</script>

<style scoped>
/* styles */
</style>
