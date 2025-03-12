import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'

// tu import ton fichier App.vue que tu as appelé App
// sauf que tu créais une constante App qui porte le même nom
// const App = createApp(App);
// App.use(router);
// App.mount('#app');
// ==>>
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
// ou tu peux nommer app comme tu le souhaite tant que c'est différent des noms des imports que tu utilises