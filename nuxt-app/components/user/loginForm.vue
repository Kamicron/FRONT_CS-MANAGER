<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <div class="form-group">
      <label for="username">Nom d'utilisateur</label>
      <input v-model="username" type="text" id="username" required />
    </div>
    <div class="form-group">
      <label for="password">Mot de passe</label>
      <input v-model="password" type="password" id="password" required />
    </div>
    <button type="submit">Connexion</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore'

const emits = defineEmits(['validate'])
const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(username.value, password.value)
    errorMessage.value = ''
    emits('validate')
    
  } catch (error) {
    errorMessage.value = 'Erreur de connexion. Veuillez vérifier vos identifiants.'
  }
}
</script>

<style scoped>
.login-form {
  padding: 1.5rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #f5f5f5;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #1a1a1a;
  color: #f5f5f5;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #ffcc00;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  color: #1a1a1a;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e6b800;
}

.error {
  margin-top: 0.5rem;
  color: #ff4d4d;
}
</style>
