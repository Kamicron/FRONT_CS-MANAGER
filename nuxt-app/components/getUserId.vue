<template>
  <div class="getUserId">
    <input type="text" v-model="id" placeholder="Entrez l'ID du joueur" />
    <button @click="fetchUserData(id)">Voir le joueur</button>

    <!-- Affichage des informations de l'utilisateur si elles existent -->
    <div v-if="user" class="user-details">
      <h3>Détails du joueur :</h3>
      <p><strong>Nom d'utilisateur :</strong> {{ user.username }}</p>
      <p><strong>Niveau :</strong> {{ user.level }}</p>
      <p v-if="user.isAdmin"><strong>Statut :</strong> Admin</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Variables pour l'ID utilisateur, les données de l'utilisateur et les messages d'erreur
const id = ref('')
const user = ref(null)
const errorMessage = ref('')

const fetchUserData = async (userId) => {
  errorMessage.value = '' // Réinitialiser le message d'erreur

  // Vérifier si un token est présent
  const token = localStorage.getItem('access_token')
  if (token) {
    try {
      // Faire l'appel API pour récupérer les détails du joueur
      user.value = await $fetch(`http://localhost:3000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      errorMessage.value = 'Erreur lors de la récupération du joueur. Vérifiez l’ID et essayez encore.'
      user.value = null // Réinitialiser l'utilisateur si une erreur se produit
    }
  } else {
    errorMessage.value = "Vous n'êtes pas authentifié. Connectez-vous pour continuer."
  }
}
</script>

<style lang="scss" scoped>
.getUserId {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.user-details {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
