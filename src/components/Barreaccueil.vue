<script setup>
const goTo = (page) => {
  alert(`Redirection vers ${page}`);
};
</script>

<template>
  <nav class="navbar">
    <button @click="goTo('Accueil')" class="nav-button">Accueil</button>
    <button @click="goTo('Anciens choix')" class="nav-button">Anciens choix</button>
    <button @click="goTo('Profil')" class="nav-button">Profil</button>
  </nav>
</template>

<style scoped>
/* Barre de navigation */
.navbar {
    position: fixed;  /* Fixe la barre en haut */
  top: 0;           /* Collée en haut */
  left: 0;          /* Collée à gauche */
  width: 100%;      /* Prend toute la largeur */
  background-color: #FF6F00; /* Orange foncé */
  padding: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
}

/* Boutons */
.nav-button {
  background-color: #FFA726;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #FB8C00;
}
</style>
