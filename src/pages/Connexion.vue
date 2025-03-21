
<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

const isRegistering = ref(false);  


const pseudo = ref('');
const nom = ref('');
const prenom = ref('');
const age = ref('');
const filmPrefere = ref('');
const seriePreferee = ref('');
const genrePrefere = ref('');

// Liste des avatars disponibles
const avatar = [
  'https://img.pikbest.com/png-images/qianku/cartoon-cute-orange-hair-girl-avatar-free-png_2128606.png!sw800',
  'https://static.vecteezy.com/ti/vecteur-libre/p1/2002247-belle-femme-noire-avatar-icone-personnage-gratuit-vectoriel.jpg',
  'https://avatarfiles.alphacoders.com/374/374643.png',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/48014adb-982c-4a5c-ae09-a1afab53f3f3/ddrg6q2-92393626-c353-43db-9c70-85d869dd58d9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ4MDE0YWRiLTk4MmMtNGE1Yy1hZTA5LWExYWZhYjUzZjNmM1wvZGRyZzZxMi05MjM5MzYyNi1jMzUzLTQzZGItOWM3MC04NWQ4NjlkZDU4ZDkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Vn1TEvEpOgKhNWdIPLDTOtLo-feiJ-mh-kYr1VfJFQY',
  'https://img.freepik.com/vecteurs-premium/image-profil-avatar-homme-isolee-arriere-plan-image-profil-avatar-pour-homme_1293239-4841.jpg',
  'https://m.media-amazon.com/images/I/61iNyTwMmTL.jpg'
];

const selectedAvatar = ref(avatar[0]); 

// Message d'erreur
const message = ref('');

// Message de succès après inscription
const successMessage = ref('');

// Fonction pour se connecter
const login = () => {
  if (store.login(pseudo.value)) {
    router.push('/profil');
  } else {
    message.value = "Pseudo incorrect. Veuillez vous enregistrer.";
  }
};

// Fonction pour s'inscrire
const register = async () => {
  const isRegistered = await store.register({
    pseudo: pseudo.value,
    nom: nom.value,
    prenom: prenom.value,
    age: age.value,
    filmPrefere: filmPrefere.value,
    seriePreferee: seriePreferee.value,
    genrePrefere: genrePrefere.value,
    avatar: selectedAvatar.value // Sauvegarde de l'avatar sélectionné
  });

  if (isRegistered) {
    successMessage.value = "Bravo, ton compte est bien créé !";
    router.push('/profil'); // Redirection vers le profil après l'inscription
  } else {
    message.value = "Échec de l'inscription. Veuillez réessayer.";
  }
};

// Fonction pour basculer entre les modes de connexion et d'inscription
const toggleForm = () => {
  isRegistering.value = !isRegistering.value;
};
</script>

<template>
  <div class="login-container">
    <h1>{{ isRegistering ? 'Inscription' : 'Connexion' }}</h1>

    <!-- Formulaire de Connexion -->
    <div v-if="!isRegistering" class="form-container login-form">
      <input v-model="pseudo" placeholder="Entrez votre pseudo" class="input-field" />
      <button @click="login" class="action-btn">Se connecter</button>
      <p v-if="message" class="error-message">{{ message }}</p>
      <p class="switch-form">
        Pas encore inscrit ? <button @click="toggleForm" class="switch-btn">S'inscrire</button>
      </p>
    </div>

    <!-- Formulaire d'Inscription avec 4 colonnes -->
    <div v-if="isRegistering" class="form-container registration-form">
      <!-- Première colonne (Pseudo, Nom, Prénom, Âge) -->
      <div class="form-column">
        <h3>Informations</h3>
        <input v-model="pseudo" placeholder="Entrez votre pseudo" class="input-field" />
        <input v-model="prenom" placeholder="Entrez votre prénom" class="input-field" />
        <input v-model="nom" placeholder="Entrez votre nom" class="input-field" />
        <input v-model="age" type="number" placeholder="Entrez votre âge" class="input-field" />
      </div>

      <!-- Deuxième colonne (Film préféré, Série, Genre) -->
      <div class="form-column">
        <h3>Préférences</h3>
        <input v-model="filmPrefere" placeholder="Film préféré" class="input-field" />
        <input v-model="seriePreferee" placeholder="Série préférée" class="input-field" />
        <input v-model="genrePrefere" placeholder="Genre préféré" class="input-field" />
      </div>

      <!-- Troisième colonne (Choix d'avatar) -->
      <div class="form-column avatar-column">
        <h3 class="avatar-title">Choix d'avatar</h3>
        <div class="avatar-list-container">
          <div class="avatar-list">
            <img 
              v-for="avatarUrl in avatar" 
              :key="avatarUrl" 
              :src="avatarUrl" 
              :class="{ 'avatar-image': true, 'selected': selectedAvatar === avatarUrl }" 
              @click="selectedAvatar = avatarUrl" 
            />
          </div>
        </div>
      </div>
      
      <!-- Quatrième colonne (Avatar sélectionné et boutons) -->
      <div class="form-column selected-avatar-column">
        <h3>Avatar sélectionné</h3>
        <div class="selected-avatar">
          <img :src="selectedAvatar" class="avatar-preview" />
          <p class="avatar-text">Cet avatar sera affiché sur votre profil</p>
        </div>
        
        <button @click="register" class="action-btn">S'inscrire</button>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p class="switch-form">
          Déjà inscrit ? <button @click="toggleForm" class="switch-btn">Se connecter</button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 1000px; 
  margin: auto;
  padding: 20px;
  text-align: center;
  background-color: #fff8f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 60px;
  margin-bottom: 20px;
  color: #FF6F00;
  font-weight: bold;
}

h3 {
  font-size: 20px;
  color: #FF6F00;
  margin-bottom: 15px;
}

.avatar-title {
  margin-bottom: 20px; 
}

.form-container {
  margin-top: 20px;
  border-top: 2px solid #FF6F00;
  padding-top: 20px;
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.registration-form {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 15px;
}

.input-field {
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #FF6F00;
  font-size: 16px;
  transition: border-color 0.3s;
  width: 100%;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #FF8F00;
  outline: none;
}

.action-btn {
  padding: 12px;
  background-color: #FF6F00;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 15px;
}

.action-btn:hover {
  background-color: #FF8F00;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.success-message {
  color: green;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
}

.switch-form {
  font-size: 14px;
  margin-top: 15px;
}

.switch-btn {
  background: none;
  border: none;
  color: #FF6F00;
  cursor: pointer;
  font-size: 14px;
}

.switch-btn:hover {
  text-decoration: underline;
}

.form-column {
  background-color: #ffdda1;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}


.avatar-column {
  display: flex;
  flex-direction: column;
}

.avatar-list-container {
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0px; 
}

.avatar-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.avatar-image {
  width: 75px; 
  height: 75px; 
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s, border 0.2s;
  object-fit: cover;
}

.avatar-image:hover {
  transform: scale(1.1);
}

.selected {
  border: 3px solid #FF6F00;
}


.selected-avatar-column {
  display: flex;
  flex-direction: column;
}

.selected-avatar {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #FF6F00;
  object-fit: cover;
}

.avatar-text {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}
</style>