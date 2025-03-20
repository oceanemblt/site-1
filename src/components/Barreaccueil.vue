<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { computed } from 'vue';
import Bouton from './Bouton.vue';

const router = useRouter();
const store = useUserStore();

// Vérifier si l'utilisateur est connecté
const isLoggedIn = computed(() => !!store.pseudo);

const goTo = (page) => {
  router.push(page);
};

// Déconnexion de l'utilisateur
const logout = () => {
  store.logout();
  router.push('/connexion');
};
</script>

<template>
  <nav class="navbar">
    <slot name="before-buttons"></slot> <!-- Slot avant les boutons -->

  
    <Bouton msg="Accueil" to="/"></Bouton>
    <button @click="goTo('/test')" class="nav-button">Test</button>
    <button @click="goTo('/favoris')" class="nav-button">Favoris</button>
    <button v-if="isLoggedIn" @click="goTo('/profil')" class="nav-button">Profil</button>
    <button v-else @click="goTo('/connexion')" class="nav-button">Connexion</button>
    <button v-if="isLoggedIn" @click="logout" class="nav-button logout">Déconnexion</button>
  
  </nav>
</template>

<style scoped>
/* Styles de la barre de navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #FF6F00;
  padding: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
}

/* Styles des boutons */
.nav-button {
  background-color: #FFA726;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #FB8C00;
}

/* Bouton de déconnexion */
.logout {
  background-color: #FB8C00;
}

.logout:hover {
  background-color: rgb(247, 11, 11);
}
</style>
