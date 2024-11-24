<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li><a href="/">Accueil</a></li>
      <li><a href="#">Compétitions</a></li>
      <li><a href="#">Équipes</a></li>

      <!-- Ajoute une vérification pour éviter les erreurs -->
      <li v-if="authStore && authStore.isAdmin"><a href="/admin/utilisateurs">Admin/user</a></li>
      <li v-if="authStore && !authStore.isAuthenticated">
        <button @click="isOpen=true"><i class="fa-duotone fa-solid fa-user"></i></button>
      </li>
      <li v-if="authStore && authStore.isAuthenticated"><user-profile /></li>
    </ul>
  </nav>
  <connexion-modal v-model="isOpen" />
</template>

<script setup>
import { useAuthStore } from '~/stores/useAuthStore'
const authStore = useAuthStore()

const isOpen = ref(false)
</script>



<style lang='scss' scoped>
.navbar {
  width: 100%;
  /* background-color: #222; */
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.nav-list li a {
  text-decoration: none;
  color: $color-text-main;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-list li a:hover {
  color: $color-accent-hover;
}
</style>
