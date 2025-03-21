<template>
  <div class="favorites-container">
    <h1>Mes Films Favoris</h1>

    <!-- Bouton de retour -->
    <button class="back-button" @click="goBack">Retour à la recherche</button>

    <div v-if="favorites.length === 0" class="empty-favorites">
      <p>Vous n'avez pas encore ajouté de films à vos favoris.</p>
    </div>

    <div v-else class="favorites-list">
      <div v-for="movie in favorites" :key="movie.id" class="movie-card">
        <div class="movie-card-content" @click="selectMovie(movie)">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title">
          <div class="overlay">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.overview ? movie.overview.substring(0, 100) + '...' : 'Aucune description disponible.' }}</p>
          </div>
        </div>
        <div class="favorite-btn is-favorite" @click="toggleFavorite(movie)">
          <span class="heart-icon">❤</span>
        </div>
      </div>
    </div>

    <!-- Affichage du résumé du film sélectionné -->
    <div v-if="selectedMovie" class="movie-details">
      <h2>{{ selectedMovie.title }}</h2>
      <p v-if="selectedMovie.details">
        <strong>Résumé : </strong>{{ selectedMovie.details.overview }}
      </p>
      <p v-else><strong>Résumé :</strong> Aucune description disponible.</p>
      <button class="favorite-detail-btn is-favorite" @click="toggleFavorite(selectedMovie)">
        Retirer des favoris
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const favorites = ref([]);
const selectedMovie = ref(null);

// Charger les favoris depuis localStorage
onMounted(() => {
  const savedFavorites = localStorage.getItem('movieFavorites');
  favorites.value = savedFavorites ? JSON.parse(savedFavorites) : [];
});

// Retour à la page de recherche
const goBack = () => {
  router.push('/test');
};

// Sélectionner un film pour voir les détails
const selectMovie = (movie) => {
  selectedMovie.value = {
    ...movie,
    details: movie.details || { overview: "Aucune description disponible." }
  };
};

// Supprimer un favori
const toggleFavorite = (movie) => {
  const index = favorites.value.findIndex(fav => fav.id === movie.id);
  if (index !== -1) {
    favorites.value.splice(index, 1);
    
    if (selectedMovie.value && selectedMovie.value.id === movie.id) {
      selectedMovie.value = null;
    }

    localStorage.setItem('movieFavorites', JSON.stringify(favorites.value));
  }
};
</script>

<style scoped>
.favorites-container {
  text-align: center;
  max-width: 1200px;
  margin: auto;
}

h1 {
  text-align: center;
  display: flex;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  padding: 10px;
}

.back-button {
  margin-bottom: 20px;
  background-color: #FF6F00;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.favorites-list {
  display: flex;
  justify-content: center; 
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 0;
}

.movie-card {
  position: relative;
  width: 250px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
}

.movie-card img {
  width: 100%;
  display: block;
  border-radius: 10px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  padding: 10px;
  text-align: center;
}

.movie-card:hover .overlay {
  opacity: 1;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.heart-icon {
  color: #FF6F00;
  font-size: 18px;
  transition: all 0.2s ease;
}

.favorite-btn:hover .heart-icon {
  transform: scale(1.2);
}

.movie-details {
  margin-top: 30px;
  background: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.favorite-detail-btn {
  margin-top: 15px;
  background-color: #e74c3c;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.empty-favorites {
  padding: 30px;
  background: #f1f1f1;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 600px;
}

@media (max-width: 768px) {
  .favorites-list {
    justify-content: center;
  }

  .movie-card {
    width: 180px;
  }
}

@media (max-width: 480px) {
  .movie-card {
    width: 100%;
  }
}
</style>
