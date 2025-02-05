<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
const resetCount = () => {
  count.value = 0;
}
</script>

<template>
   <header class="header">
    <h1>Mooviechoose</h1>
  </header>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">Le compte est de {{ count }}</button>
    <p v-if="count > 10">
      Hello
    </p>
    <p v-else>
      Hey
    </p>
  </div>
  
  <button type="button" @click="resetCount">Réinitialiser</button>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
button {
  background-color: rgb(255, 208, 78);
  color: rgb(160, 122, 7);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.header {
  display: flex;
  justify-content: center;   /* Centre horizontalement */
  align-items: center;       /* Centre verticalement */
  height: 100px;             /* Hauteur de l'en-tête */
  background-color: rgb(255, 208, 78);    /* Couleur de fond claire */
  color: white;              /* Couleur du texte en blanc */
  font-size: 2rem;           /* Taille de police pour le titre */
}
</style>
