import { createApp } from 'vue';
import App from './App.vue';
import { pinia } from './store';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(pinia);
app.mount('#app');
