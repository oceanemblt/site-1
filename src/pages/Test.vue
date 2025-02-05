<template>
    <Barreaccueil>
    <Barreaccueil/>
    <h1>Mooviechoose</h1>
    
    <p> A toi de jouer ! </p>
    
  <div>
    <h1>Bienvenue sur la page Test</h1>
    <Bouton msg="Retour à l'accueil" to="/" />
  </div>
    </template>
    ;
    <script setup>
    import Barreaccueil from '../components/Barreaccueil.vue';
    import Bouton from '../components/Bouton.vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const goToHome = () => {
  router.push('/');
};
    </script>
    
    <style> body {
        background-color: #fff6e6; /* Orange pâle */
    }</style>
    