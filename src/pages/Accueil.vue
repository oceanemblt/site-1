<template>
<Barreaccueil>
</Barreaccueil>
<h1>Mooviechoose</h1>

<p>Bienvenue sur le site où choisir un film ne sera plus un problème !</p>

<div>
    <h1>Bienvenue sur la page d'accueil</h1>
    <button @click="goToTest">Aller à la page Test</button> />
  </div>


</template>

<script setup>
import Barreaccueil from '../components/Barreaccueil.vue';
import Bouton from '../components/Bouton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goToTest = () => {
  router.push('/test');
};
</script>

<style> body {
    background-color: #fff6e6; /* Orange pâle */
}</style>
