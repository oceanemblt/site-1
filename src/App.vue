<script setup>
import Accueil from './pages/Accueil.vue'
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
<Accueil></Accueil>
<div>
    <nav>
      <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/test">Test</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
