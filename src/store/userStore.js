// src/store/userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    pseudo: '',
    nom: '',
    prenom: '',
    age: '',
    filmPrefere: '',
    seriePreferee: '',
    genrePrefere: '',
    avatar:'',
  }),
  actions: {
    // Méthode pour enregistrer les informations de l'utilisateur
    register(data) {
      console.log(data)
      this.pseudo = data.pseudo;
      this.nom = data.nom;
      this.prenom = data.prenom;
      this.age = data.age;
      this.filmPrefere = data.film;
      this.seriePreferee = data.serie;
      this.genrePrefere = data.genre;
      console.log(data)
      this.avatar = data.avatar;
    },

is_login(){
  return this.pseudo!=''
},

logout(){
      this.pseudo = '';
      this.nom = '';
      this.prenom = '';
      this.age = '';
      this.filmPrefere = '';
      this.seriePreferee = '';
      this.genrePrefere = '';
      this.avatar = '';
},

    // Méthode pour la connexion, vérifie si le pseudo existe
    login(pseudo) {
      if (this.pseudo === pseudo) {
        return true;
      }
      return false;
    },
  },
});
