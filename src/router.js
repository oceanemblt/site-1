import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import Accueil from './pages/Accueil.vue';
import Test from './pages/Test.vue';
import Favoris from './pages/Favoris.vue'; 
import Profil from './pages/Profil.vue';
import Connexion from './pages/Connexion.vue';

const routes = [
  { path: '/', component: Accueil },
  { path: '/test', component: Test },
  { path: '/favoris', component: Favoris }, 
  { path: '/connexion', component: Connexion }, // ✅ Page Connexion
  { 
    path: '/profil', 
    component: Profil, 
    meta: { requiresAuth: true } // 🔒 Protection de la route profil
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes
});

// ⚡ Vérification de l'authentification avant chaque navigation
router.beforeEach((to, from, next) => {
  const store = useUserStore();
  
  // Si la route requiert une connexion et que l'utilisateur n'est pas connecté, on redirige vers /connexion
  if (to.meta.requiresAuth && !store.pseudo) {
    next('/connexion');
  } else {
    next();
  }
});

export default router;