<template>
  <div class="test-container">
    <h1>Trouve ton film</h1>
    <p>À toi de jouer !</p>

    <!-- Navigation modifiée - le bouton Favoris utilise un routerLink -->
    <div class="navigation">
      <button class="active">Recherche</button>
      <router-link to="/favoris" custom v-slot="{ navigate }">
        <button @click="navigate" class="nav-button">Favoris</button>
      </router-link>
    </div>


    <div>
      <!-- Formulaire -->
      <form @submit.prevent="fetchMovies">
        <div class="input-group">
          <label>Quel est ton acteur préféré ?</label>
          <input v-model="preferences.actor" type="text" placeholder="Ex: Leonardo DiCaprio">
        </div>

        <div class="input-group">
          <label>Quelle est ton actrice préférée ?</label>
          <input v-model="preferences.actress" type="text" placeholder="Ex: Scarlett Johansson">
        </div>

        <div class="input-group">
          <label>Quel genre de film veux-tu regarder aujourd'hui ?</label>
          <select v-model="preferences.genre">
            <option value="28">Action</option>
            <option value="35">Comédie</option>
            <option value="18">Drame</option>
            <option value="10749">Romance</option>
            <option value="27">Horreur</option>
          </select>
        </div>

        <button type="submit">Voir mes recommandations</button>
      </form>

      <!-- Affichage des films recommandés -->
      <div v-if="movies.length" class="movie-results">
        <h2>Films recommandés</h2>
        <div class="movie-list">
          <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <div class="movie-card-content" @click="selectMovie(movie)">
              <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title">
              <h3>{{ movie.title }}</h3>
              <p>{{ movie.overview.substring(0, 100) }}...</p>
            </div>
            <div class="favorite-btn" @click="toggleFavorite(movie)" :class="{ 'is-favorite': isFavorite(movie.id) }">
              <span class="heart-icon">❤</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Affichage du résumé du film sélectionné -->
      <div v-if="selectedMovie" class="movie-details">
        <h2>{{ selectedMovie.title }}</h2>
        <p><strong>Résumé : </strong>{{ selectedMovie.details.overview }}</p>
        <button class="favorite-detail-btn" @click="toggleFavorite(selectedMovie)" :class="{ 'is-favorite': isFavorite(selectedMovie.id) }">
          {{ isFavorite(selectedMovie.id) ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY; 

const preferences = ref({
  actor: '',
  actress: '',
  genre: ''
});

const movies = ref([]);
const selectedMovie = ref(null);
const favorites = ref([]);


onMounted(() => {
  const savedFavorites = localStorage.getItem('movieFavorites');
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites);
  }
});


watch(favorites, (newFavorites) => {
  localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
}, { deep: true });

const fetchActorId = async (name) => {
  if (!name) return null;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/person`, {
      params: {
        api_key: API_KEY,
        query: name
      }
    });
    return response.data.results.length ? response.data.results[0].id : null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'ID de ${name} :`, error);
    return null;
  }
};

const fetchMovies = async () => {
  try {
    const actorId = await fetchActorId(preferences.value.actor);
    const actressId = await fetchActorId(preferences.value.actress);

    let moviesList = [];

    // Fonction pour récupérer les films par acteur avec le genre
    const fetchMoviesByActor = async (actorId, limit = 2) => {
      if (!actorId) return [];
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: preferences.value.genre, // Genre spécifié
          sort_by: 'popularity.desc',
          with_cast: actorId,
          language: 'fr'
        },
      });
      return response.data.results.slice(0, limit); // Limiter à 2 films
    };

    // Fonction pour récupérer les films avec les deux acteurs et genre
    const fetchMoviesWithBothActors = async (actorId, actressId, limit = 1) => {
      if (!actorId || !actressId) return [];
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: preferences.value.genre, // Genre spécifié
          with_cast: `${actorId},${actressId}`,
          sort_by: 'popularity.desc',
          language: 'fr'
        },
      });
      return response.data.results.slice(0, limit); // Limiter à 1 film avec les 2
    };

    // Récupérer les films
    const moviesActor = actorId ? await fetchMoviesByActor(actorId) : [];
    const moviesActress = actressId ? await fetchMoviesByActor(actressId) : [];
    const moviesBoth = actorId && actressId ? await fetchMoviesWithBothActors(actorId, actressId) : [];

    // Fusionner les résultats sans doublons
    const uniqueMovies = [...moviesActor, ...moviesActress, ...moviesBoth].reduce((acc, movie) => {
      if (!acc.find(m => m.id === movie.id)) {
        acc.push(movie);
      }
      return acc;
    }, []);

    // Récupérer les détails des films
    const moviesWithDetails = await Promise.all(
      uniqueMovies.map(async (movie) => {
        const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
          params: {
            api_key: API_KEY,
            language: 'fr'
          }
        });
        movie.details = movieDetails.data;
        return movie;
      })
    );

    movies.value = moviesWithDetails;
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
};

const selectMovie = (movie) => {
  selectedMovie.value = movie;
};

// Fonctions pour gérer les favoris
const toggleFavorite = (movie) => {
  const index = favorites.value.findIndex(fav => fav.id === movie.id);
  
  if (index === -1) {
    // Ajouter aux favoris
    favorites.value.push(movie);
  } else {
    // Retirer des favoris
    favorites.value.splice(index, 1);
  }
};

const isFavorite = (movieId) => {
  return favorites.value.some(movie => movie.id === movieId);
};
</script>

<style scoped>
.test-container {
  text-align: center;
  max-width: 800px;
  margin: auto;
}

.navigation {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.navigation button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #f1f1f1;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.navigation button.active {
  background-color: #FF6F00;
  color: white;
}

.input-group {
  margin-bottom: 15px;
}

input, select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h1 {
  text-align: center; 
  display: flex;
  font-size: 60px;
  margin-top: 100px;
  justify-content: center; 
  align-items: center; 
  max-width: 100%; 
  padding: 10px; 
  word-wrap: break-word; 
}

.test-container {
  max-width: 1500px; 
  margin: auto; 
}

button {
  background-color: #FF6F00;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.movie-results {
  margin-top: 30px;
}

.movie-list, .favorites-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
}

.movie-card {
  min-width: 200px;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.movie-card-content {
  cursor: pointer;
}

.movie-card img {
  width: 100%;
  border-radius: 10px;
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
  color: #ccc;
  font-size: 18px;
  transition: all 0.2s ease;
}

.favorite-btn.is-favorite .heart-icon {
  color: #FF6F00;
}

.favorite-btn:hover .heart-icon {
  transform: scale(1.2);
}

.favorite-detail-btn {
  margin-top: 15px;
}

.favorite-detail-btn.is-favorite {
  background-color: #e74c3c;
}

.movie-details {
  margin-top: 30px;
  background: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}

.empty-favorites {
  padding: 30px;
  background: #f1f1f1;
  border-radius: 10px;
  margin-top: 20px;
}
</style>