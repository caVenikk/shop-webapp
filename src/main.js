import { createApp } from 'vue'
import './assets/stylesheets/main.css'
import App from './App.vue'
import globalComponents from './components'
import axiosInstance from './plugins/axios'
import retryOperation from './plugins/retry'
import tg from './plugins/telegram'

const app = createApp(App);
app.use(globalComponents);
app.use(axiosInstance, {});
app.use(retryOperation, {});
app.use(tg, {});
app.mount('#app');
