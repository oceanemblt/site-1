import { defineStore } from 'pinia';
import { supabase } from '../../supabase';
import router from '@/router'; // ✅ Import correct du router

export const useUserStore = defineStore('user', {
  state: () => ({
    pseudo: '',
    nom: '',
    prenom: '',
    age: '',
    filmPrefere: '',
    seriePreferee: '',
    genrePrefere: '',
    avatar: '',
  }),

  actions: {
    // ✅ Inscription avec redirection après succès
    async register(data) {
      try {
        console.log("Tentative d'inscription avec :", data);

        // Vérifier si le pseudo existe déjà
        const { data: existingUser } = await supabase
          .from('User')
          .select('pseudo')
          .eq('pseudo', data.pseudo)
          .single();

        if (existingUser) {
          throw new Error("Ce pseudo est déjà utilisé. Choisissez-en un autre.");
        }

        // Insérer l'utilisateur dans Supabase
        const { error: insertError } = await supabase.from('User').insert([{
          pseudo: data.pseudo,
          nom: data.nom,
          prenom: data.prenom,
          age: data.age,
          filmPrefere: data.filmPrefere,
          seriePreferee: data.seriePreferee,
          genrePrefere: data.genrePrefere,
          avatar: data.avatar
        }]);

        if (insertError) throw insertError;

        console.log("Utilisateur inscrit avec succès !");
        
        // Charger le profil immédiatement après l'inscription
        const isProfileLoaded = await this.loadUserProfile(data.pseudo);

        if (isProfileLoaded) {
          router.push('/profil'); // ✅ Utilisation correcte de router
        }

      } catch (error) {
        console.error("Erreur lors de l'inscription :", error.message);
        return false;
      }
    },

    // ✅ Vérifie si un utilisateur est connecté
    is_login() {
      return this.pseudo !== '';
    },

    // ✅ Déconnexion de l'utilisateur
    logout() {
      this.pseudo = '';
      this.nom = '';
      this.prenom = '';
      this.age = '';
      this.filmPrefere = '';
      this.seriePreferee = '';
      this.genrePrefere = '';
      this.avatar = '';

      router.push('/'); // ✅ Redirige vers la page d'accueil après déconnexion
    },

    // ✅ Connexion et chargement du profil
    async login(pseudo) {
      try {
        const isProfileLoaded = await this.loadUserProfile(pseudo);
        if (isProfileLoaded) {
          router.push('/profil'); // ✅ Redirection après connexion
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error.message);
      }
    },

    // ✅ Chargement du profil utilisateur
    async loadUserProfile(pseudo) {
      try {
        const { data, error } = await supabase
          .from('User')
          .select('*')
          .eq('pseudo', pseudo)
          .single();

        if (error) throw error;

        if (data) {
          this.pseudo = data.pseudo;
          this.nom = data.nom;
          this.prenom = data.prenom;
          this.age = data.age;
          this.filmPrefere = data.filmPrefere;
          this.seriePreferee = data.seriePreferee;
          this.genrePrefere = data.genrePrefere;
          this.avatar = data.avatar;

          console.log("Profil chargé :", this);
          return true;
        }
        return false;

      } catch (error) {
        console.error("Erreur lors du chargement du profil :", error.message);
        return false;
      }
    }
  }
});
