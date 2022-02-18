import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import './main.css';
import router from './router/index';
import store from './store';
import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`

createApp(App).use(store).use(router).use(Toast).use(VueSidebarMenu).mount('#app')