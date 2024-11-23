<template>
  <form @submit.prevent="updateUser" class="update-user-form">
    <div>
      <label for="username">Nouveau nom d'utilisateur</label>
      <input type="text" v-model="formData.username" id="username" />
    </div>
    <div>
      <label for="password">Nouveau mot de passe</label>
      <input type="password" v-model="formData.password" id="password" />
    </div>
    <button type="submit">Mettre à jour</button>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({ username: '', password: '' })
const successMessage = ref('')
const errorMessage = ref('')

const updateUser = async () => {
  const token = localStorage.getItem('access_token')
  try {
    await $fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: { ...formData.value },
    })
    successMessage.value = 'Profil mis à jour avec succès.'
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = 'Erreur lors de la mise à jour.'
    successMessage.value = ''
  }
}
</script>

<style scoped lang="scss">
.update-user-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>
