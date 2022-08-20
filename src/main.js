import { createApp } from "vue";
import App from "./App.vue";
import router from "./services/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon, faTrash } from "@fortawesome/free-solid-svg-icons";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

library.add(faSun, faMoon, faTrash);

import "./assets/main.scss";

const app = createApp(App);
app.use(Toast, {
  position: POSITION.BOTTOM_LEFT,
});
app.use(router);
app.mount("#app");
