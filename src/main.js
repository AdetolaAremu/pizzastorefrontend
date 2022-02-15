import { createApp } from 'vue';
import App from './App.vue';
import './main.css';
import router from './router/index';
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'


createApp(App).use(router).use(VueSidebarMenu).mount('#app')