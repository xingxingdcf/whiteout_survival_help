import './style/tailwind.less';

import { createApp } from 'vue';
// import router from './router';
import { setupStore } from './store';
import App from './App.vue';

async function bootstrap() {
   const app = createApp(App);
   setupStore(app);

   app.mount('#app');
}
bootstrap();
