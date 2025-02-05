import { createRouter, createWebHistory } from 'vue-router';
import Accueil from './pages/Accueil.vue';
import Test from './pages/Test.vue';

const routes = [
    { path: '/', component: Accueil },
    { path: '/test', component: Test }
  ];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;