<template>
    <div v-if="authStore.user" class='profil'> 
      Bienvenue {{ authStore.user.username }} vous êtes au niveau {{ authStore.user.level }}

      <UpdateUser :userId="userId"/>
    </div>
</template>

<script setup lang='ts'>
// ----- Import -----
import { useAuthStore } from '~/stores/useAuthStore'

// ------------------

// ------ Type ------

// ------------------

// ----- Define -----
definePageMeta({
  middleware: 'auth-user',
})
// ------------------

// ------ Const -----
const authStore = useAuthStore()
// ------------------

// ---- Reactive ----
const userId = computed(() => {
  return authStore.user?._id
})
// ------------------

// ---- Computed ----

// ------------------

// ------ Hooks -----

// ------------------

// --- Async Func ---

// ------------------

// ---- Function ----

// ------------------

// ------ Watch -----
watch(() => userId.value,
(newVal) => { 
    console.log('newVal', newVal)
}, {immediate:true})
// ------------------

</script>

<style lang='scss' scoped>
    .profil {
    }
</style>