import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Ensure this path is correct if your router file is elsewhere

const app = createApp(App);
app.use(router);
app.mount('#app');