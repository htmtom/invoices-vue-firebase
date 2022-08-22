import { createApp } from "vue";
import App from "./App.vue";
import router from "./services/router";
import store from "./services/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon, faTrash } from "@fortawesome/free-solid-svg-icons";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

library.add(faSun, faMoon, faTrash);
import "vue-skeletor/dist/vue-skeletor.css";
import "./assets/main.scss";
import { Skeletor } from "vue-skeletor";

const app = createApp(App);
app.component(Skeletor.name, Skeletor);

app.use(Toast, {
  position: POSITION.BOTTOM_LEFT,
});
app.use(router);
app.use(store);
app.mount("#app");
