<script setup>

defineProps({
    msg: String,
    to: String 

});
</script>

<template>
<router-link :to="to" class="orange-button">
    {{ msg || "Cliquez ici" }}
  </router-link>
</template>

<style scoped>
.orange-button {
  background-color: #FF9800; /* Orange vif */
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

/* Effet au survol */
.orange-button:hover {
  background-color: #F57C00; /* Orange plus foncé */
  transform: scale(1.05); /* Effet de zoom */
}

/* Effet au clic */
.orange-button:active {
  background-color: #E65100; /* Orange encore plus foncé */
  transform: scale(0.95);
}
</style>
