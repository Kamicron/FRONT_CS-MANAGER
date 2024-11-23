<template>
    <div>
      <label for="username">Nouveau nom d'utilisateur</label>
      <input type="text" v-model="formData.username" id="username" placeholder="Nom d'utilisateur" />
    </div>

    <div>
      <label for="password">Nouveau mot de passe</label>
      <input type="password" v-model="formData.password" id="password" placeholder="Mot de passe" />
    </div>

    <button type="submit" @click="updateUser(userId)">Mettre à jour</button>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFetch } from '#app'

const props = defineProps({
  userId :{type: String, default :''}
})

// Variables pour stocker les données du formulaire, les messages d'erreur et de succès
const formData = ref({ username: '', password: '' })
const errorMessage = ref('')
const successMessage = ref('')

// Fonction pour mettre à jour l'utilisateur
const updateUser = async () => {
  
  try {
    const token = localStorage.getItem('access_token')
    console.log('token', token);
    
    // Requête PUT vers l'endpoint d'API
    const response = await useFetch(`http://localhost:3000/users/${props.userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
      },
      body: {
        username: formData.value.username,
        password: formData.value.password
      }
    })



    // Message de succès
    successMessage.value = 'Profil mis à jour avec succès.'
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
