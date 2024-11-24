<template>
  <div class="layout">
    <h2>Application</h2>
    <i class="fa-duotone fa-solid fa-image"></i>
    <!-- <login-form v-if="!authStore.isAuthenticated" @login-success="authStore.fetchUserData" />
    <user-profile v-else /> -->
    <!-- <user-list v-if="authStore.isAuthenticated" />
    <update-user-form v-if="authStore.isAuthenticated" :user-id="authStore.user?._id" />

    <button @click="isModalOpen = true">Ouvrir la modal</button>

    <slot-modal
      v-model="isModalOpen"
      title="Titre de la modal"
    >
      <p>
        Contenu de la modal. Ajoutez ici tout ce que vous souhaitez afficher.
      </p>
      <p>
        Si le contenu est trop grand, un ascenseur vertical s’affichera.
      </p>
    </slot-modal> -->

  </div>
</template>


<script setup lang="ts">
// import { useAuthStore } from '~/stores/useAuthStore'
// const isModalOpen = ref(false);
// const authStore = useAuthStore()

// // Vérifier si l'utilisateur est connecté au chargement
// if (process.client) {
//   const token = localStorage.getItem('access_token')
//   if (token) {
//     authStore.fetchUserData() // Récupère les données utilisateur si un token est présent
//   }
// }

// const columns = [
//   { key: 'name', title: 'Nom', width: '30%' },
//   { key: 'age', title: 'Âge', width: '20%' },
//   { key: 'job', title: 'Profession', width: '50%' },
// ];

// const rows = Array.from({ length: 250 }, (v, i) => ({
//   id: i + 1,
//   backgroundColor: i % 2 === 0 ? '#fff' : '#f7f7f7',
//   cells: {
//     name: { display: `Utilisateur ${i + 1}`, title: `Nom complet: Utilisateur ${i + 1}`, textColor: '#1e90ff' },
//     age: { display: `${20 + (i % 30)}`, title: 'Âge en années', textColor: '#10b981' },
//     job: { display: `Profession ${i + 1}`, title: `Profession de l'utilisateur ${i + 1}`, textColor: '#e63946' },
//   },
// }));

</script>

<style lang="scss" scoped>
.layout {
  padding: 50px;
}

.table {
  margin: 20px 0;
}
</style>
