<template>
<Barreaccueil />

<div class ="home">
  <div class="header">
    <img src="@/assets/Mooviechoose.png" alt="Logo Mooviechoose" class="logo" />
    <h1>Mooviechoose</h1>
    <img src="@/assets/Mooviechoose.png" alt="Logo Mooviechoose" class="logo" />
</div>
    <p>Bienvenue sur le site où choisir un film ne sera plus un problème !</p>
    <Bouton msg="Commencer" to="/test" />
</div>

<div class="movie-posters">
    <img src="https://m.media-amazon.com/images/I/71qtDoM-rcL._AC_UF1000,1000_QL80_.jpg" alt="Fast and Furious" class="poster" />
    <img src="https://fr.web.img5.acsta.net/pictures/14/08/04/15/09/405662.jpg" alt="Les Gardiens de la Galaxie" class="poster" />
    <img src="https://i.ebayimg.com/00/s/MTYwMFgxMDM1/z/Sv8AAOSwb7Rc0l0P/$_57.JPG?set_id=8800005007" alt="Iron Man" class="poster" />
    <img src="https://fr.web.img2.acsta.net/pictures/23/04/05/17/17/4725967.jpg" alt="À Contre Sens" class="poster" />
    <img src="https://m.media-amazon.com/images/I/61DA7YACfJL.jpg" alt="Nos Cœurs Meurtris" class="poster" />
    <img src="https://sf2.doctissimo.fr/wp-content/uploads/doctissimo/2024/06/moi-moche-et-mechant-b4ba57e69426262f.jpeg" alt="Moi, Moche et Méchant" class="poster" />
    <img src="https://fr.web.img4.acsta.net/pictures/23/01/03/15/53/0336388.jpg" alt="Astérix et Obélix" class="poster" />
    <img src="https://fr.web.img5.acsta.net/medias/nmedia/18/35/53/30/18435143.jpg" alt="Les 4 Fantastiques" class="poster" />
    <img src="https://m.media-amazon.com/images/I/518JC3R3AKL._AC_UF1000,1000_QL80_.jpg" alt="Le 5e Élément" class="poster" />
    <img src="https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg" alt="John Wick" class="poster" />
    <img src="https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_UF1000,1000_QL80_.jpg" alt="Gladiator" class="poster" />
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ujm7TRWTT9t4R57blUKC2TVBeSOKDI2lfg&s" alt="Titanic" class="poster" />
    <img src="https://m.media-amazon.com/images/I/91-jpemad1L._AC_UF1000,1000_QL80_.jpg" alt="Nos étoiles contraires" class="poster" />
    <img src="https://fr.web.img4.acsta.net/c_310_420/o_club-allocine-2024-310x420.png_0_se/medias/nmedia/18/70/03/08/19109117.jpg" alt="Very Bad Trip" class="poster" />
    <img src="https://fr.web.img6.acsta.net/pictures/17/11/07/13/40/0517792.jpg" alt="Jumanji" class="poster" />
    <img src="https://www.closeupshop.fr/media/oart_0/oart_s/oart_14338/1269642_G714523.JPG" alt="Shrek" class="poster" />
    <img src="https://upload.wikimedia.org/wikipedia/en/3/36/Madagascar_Theatrical_Poster.jpg" alt="Madagascar" class="poster" />
    <img src="https://images.affiches-et-posters.com//albums/3/2594/medium/2594-affiche-film-intouchable-2011.jpg" alt="Intouchables" class="poster" />
    <img src="https://fr.web.img3.acsta.net/pictures/15/09/08/15/20/305329.jpg" alt="Seul sur Mars" class="poster" />
    <img src="https://images.affiches-et-posters.com//albums/3/45306/medium/affiche-film-labyrinthe--terre-brulee-127292.jpg" alt="Le Labyrinthe" class="poster" />
    <img src="https://fr.web.img4.acsta.net/pictures/18/02/14/09/15/3437390.jpg" alt="Ready Player One" class="poster" />
    <img src="https://m.media-amazon.com/images/I/61m6okfjB3L._AC_UF1000,1000_QL80_.jpg" alt="Ted" class="poster" />
    <img src="https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg" alt="Le Roi Lion" class="poster" />
    <img src="https://m.media-amazon.com/images/M/MV5BMTQ3NTdmOTEtZTRmMi00NTg5LWI5NmUtYTNiOTc0ZmNkODU0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" alt="Band of Brothers" class="poster" />

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

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px; /* Espacement entre le texte et le logo */
  margin-bottom: 20px;
}

body {
  background-color: #fff6e6; /* Orange pâle */
  font-family: 'Arial', sans-serif;
}

.home-content {
  text-align: center;
  padding: 20px;
  max-width: 1200px;
}

.logo {
  height: 90px;
  width: auto;
  margin-top: 50px; /* Ajoute une petite marge pour abaisser les logos */
}

h1 {
  color: #FF6F00;
  font-size: 70px;
  font-family: 'Georgia'; /* Changer la police du titre */
  margin-bottom: 20px;
  margin-top: 80px;
  text-transform: uppercase;
  padding: 10px 30px; /* Ajouter un peu d'espace à l'intérieur */
  border: 5px solid #FF6F00; /* Bordure autour du titre */
  border-radius: 15px; /* Coins arrondis */
  background-color: rgba(255, 216, 186, 0.174); /* Fond léger */
  display: inline-block; /* Permet au titre d’être bien encadré */

}

p {
  font-family: 'Comic Sans MS', cursive, sans-serif; /* Appliquer Comic Sans au texte */
  color: #333;
  font-size: 20px;
  margin-bottom: 30px; /* Espacement entre le texte et le bouton */
}

.movie-posters {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6 colonnes */
  gap: 15px;
  padding: 20px;
  justify-items: center; /* Centrer les images dans les cases */
}
.poster {
  width: 150px; /* Largeur fixe */
  height: 225px; /* Hauteur fixe */
  object-fit: cover; /* Couvrir le cadre sans déformation */
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}




</style>