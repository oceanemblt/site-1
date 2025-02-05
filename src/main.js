import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'


const App = createApp(App);
App.use(router);
App.mount('#app');




