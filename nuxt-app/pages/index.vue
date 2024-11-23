<template>
  <div class="layout">
    <h2>Application</h2>
    <login-form v-if="!authStore.isAuthenticated" @login-success="authStore.fetchUserData" />
    <user-profile v-else />
    <user-list v-if="authStore.isAuthenticated" />
    <update-user-form v-if="authStore.isAuthenticated" :user-id="authStore.user?._id" />

    <!-- <DynamicTable :columns="columns" :rows="rows" :rowsPerPage="15" />-->
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

const rows = Array.from({ length: 250 }, (v, i) => ({
  id: i + 1,
  backgroundColor: i % 2 === 0 ? '#fff' : '#f7f7f7',
  cells: {
    name: { display: `Utilisateur ${i + 1}`, title: `Nom complet: Utilisateur ${i + 1}`, textColor: '#1e90ff' },
    age: { display: `${20 + (i % 30)}`, title: 'Âge en années', textColor: '#10b981' },
    job: { display: `Profession ${i + 1}`, title: `Profession de l'utilisateur ${i + 1}`, textColor: '#e63946' },
  },
}));

</script>

<style lang="scss" scoped>
.layout {
  padding: 50px;
}

.table {
  margin: 20px 0;
}
</style>
