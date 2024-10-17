import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'bootstrap';
import { BootstrapVue3 } from 'bootstrap-vue-3';

import './global.css'; // Import global styles

const app = createApp(App);
app.use(BootstrapVue3);
app.use(router);
app.mount('#app');

