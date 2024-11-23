<template>
  <div class="layout">
    <h2>Application</h2>
    <login-form v-if="!authStore.isAuthenticated" @login-success="authStore.fetchUserData" />
    <user-profile v-else />
    <user-list v-if="authStore.isAuthenticated" />
    <update-user-form v-if="authStore.isAuthenticated" :user-id="authStore.user?._id" />

    <DynamicTable class="table" :columns="columns" :rows="rows" />
  </div>
</template>


<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore'

const authStore = useAuthStore()

// Vérifier si l'utilisateur est connecté au chargement
if (process.client) {
  const token = localStorage.getItem('access_token')
  if (token) {
    authStore.fetchUserData() // Récupère les données utilisateur si un token est présent
  }
}

const columns = [
  { key: 'name', title: 'Nom', width: '30%' },
  { key: 'age', title: 'Âge', width: '20%' },
  { key: 'job', title: 'Profession', width: '50%' },
];

const rows = [
  {
    id: 1,
    backgroundColor: '#f9f9f9', // Couleur de fond de la ligne
    cells: {
      name: { display: 'Alice', title: 'Nom complet: Alice Dupont', textColor: '#ff5733' },
      age: { display: '25', title: 'Âge en années', textColor: '#33c1ff' },
      job: { display: 'Développeuse', title: 'Profession actuelle', textColor: '#75ff33' },
    },
  },
  {
    id: 2,
    backgroundColor: '#FFe9e9',
    cells: {
      name: { display: 'Bob', title: 'Nom complet: Bob Martin', textColor: '#6a33ff' },
      age: { display: '30', title: 'Âge en années', textColor: '#ff33a8' },
      job: { display: 'Designer', title: 'Profession actuelle', textColor: '#ffbd33' },
    },
  },
];
</script>

<style lang="scss" scoped>
.layout {
  padding: 50px;
}

.table {
  margin: 20px 0;
}
</style>
