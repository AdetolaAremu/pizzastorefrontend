import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import "./main.css";
import router from "./router/index";
import store from "./store";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import FontAwesomeIcon from "./utilities/fontawesome";
import AOS from "aos";
import "aos/dist/aos.css";

axios.defaults.baseURL = "http://localhost:8003/api/";
// axios.defaults.baseURL = 'https://peeza.herokuapp.com/api/';
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

createApp(App)
  .use(store)
  .use(router)
  .use(Toast)
  .use(VueSidebarMenu)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(
    AOS.init({
      offset: 120,
      delay: 50,
      duration: 1500,
      easing: "ease-in-out",
      once: false,
      mirror: false,
      // anchorPlacement: 'top-bottom',
    })
  )
  .mount("#app");
