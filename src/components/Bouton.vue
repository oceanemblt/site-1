<script setup>

defineProps({
    msg: String,
    to: String 

});
</script>

<template>
<router-link :to="to" class="nav-button">
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

/* Effet au survol */
.orange-button:hover {
  background-color: #F57C00; 
  transform: scale(1.05); 
}

/* Effet au clic */
.orange-button:active {
  background-color: #E65100; 
  transform: scale(0.95);
}
</style>
