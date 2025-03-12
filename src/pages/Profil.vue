<template>
  <div class="profil-container" v-if="pseudo">
    <div class="profil-header">
      <h1 class="profil-title">Profil</h1>
      <!-- Avatar aligné avec le titre -->
      <div class="avatar">
        <!-- Utilisation de l'avatar depuis le store -->
        <img :src="avatar || 'https://img.pikbest.com/png-images/qianku/cartoon-cute-orange-hair-girl-avatar-free-png_2128606.png!sw800'" alt="Avatar" />
      </div>
    </div>

    <div class="profil-box-container">
      <!-- Premier cadre avec les informations personnelles -->
      <div class="profil-box">
        <h3 class="section-title">Informations Personnelles</h3>
        <div class="profil-info">
          <div class="profil-item">
            <strong>Pseudo:</strong> {{ pseudo }}
          </div>
          <div class="profil-item">
            <strong>Nom:</strong> {{ nom }}
          </div>
          <div class="profil-item">
            <strong>Prénom:</strong> {{ prenom }}
          </div>
          <div class="profil-item">
            <strong>Âge:</strong> {{ age }}
          </div>
        </div>
      </div>

      <!-- Deuxième cadre avec les préférences -->
      <div class="profil-box">
        <h3 class="section-title">Préférences</h3>
        <div class="profil-info">
          <div class="profil-item">
            <strong>Film préféré:</strong> {{ filmPrefere }}
          </div>
          <div class="profil-item">
            <strong>Genre préféré:</strong> {{ genrePrefere }}
          </div>
          <div class="profil-item">
            <strong>Série préférée:</strong> {{ seriePreferee }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Message si l'utilisateur n'est pas encore authentifié -->
  <div v-else>
    <p>Veuillez vous connecter pour accéder à votre profil.</p>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/userStore'

const store = useUserStore()

// Récupérer les informations du profil à partir du store
const { pseudo, nom, prenom, age, filmPrefere, seriePreferee, genrePrefere, avatar } = store
console.log(avatar)

// Vérifie si l'utilisateur est connecté (pseudo non vide)
if (!pseudo) {
  const router = useRouter()
  router.push('/connexion')  // Redirige vers la page de connexion si non connecté
}
</script>

<style scoped>
/* Container principal de la page profil */
.profil-container {
  padding: 30px;
  background-color: #fff6e6;
  margin-top: 50px;
  position: relative;
  max-width: 1100px;
  margin: 50px auto; /* Centré sur l'écran avec un espacement autour */
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Container pour le titre et l'avatar */
.profil-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

/* Titre Profil */
.profil-title {
  text-align: center;
  color: #FF6F00;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
}

/* Avatar centré avec le titre */
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Section avec les deux cadres côte à côte */
.profil-box-container {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap; /* Adaptation pour petits écrans */
}

/* Carré avec bord arrondi pour chaque box */
.profil-box {
  background-color: #ffdda1;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  min-width: 300px;
  max-width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Titre pour chaque section dans les boîtes */
.section-title {
  font-size: 24px;
  color: #FF6F00;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
}

/* Section des informations du profil */
.profil-info {
  color: white;
  font-size: 18px;
  margin-top: 0;
  margin: auto; 
  max-width: 75%;
}

/* Style des éléments de profil */
.profil-item {
  margin-bottom: 15px;
  background-color: #ffb24e;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin: 15 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Textes en gras pour les labels */
.profil-item strong {
  color: #FF6F00;
  font-weight: bold;
}

/* Adaptation pour écrans plus petits */
@media (max-width: 768px) {
  .profil-box-container {
    flex-direction: column;
  }

  .profil-box {
  background-color: #ffd9bb;
  padding: 10px; /* Réduction du padding pour rapprocher les éléments du haut */
  border-radius: 10px;
  flex: 1;
  position: relative;
  min-width: 100%;
  max-width: 100%;
}
}
</style>
