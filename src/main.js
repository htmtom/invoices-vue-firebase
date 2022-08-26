import { createApp } from "vue";
import App from "./App.vue";
import router from "./services/router";
import store from "./services/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSun,
  faMoon,
  faTrash,
  faPlus,
  faEdit,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/main.scss";
import "./assets/invoice-form.scss";

library.add(
  faSun,
  faMoon,
  faPlus,
  faEdit,
  faGoogle,
  faTrash,
  faArrowRightFromBracket
);

const app = createApp(App);
app.component(Skeletor.name, Skeletor);
app.component(FontAwesomeIcon.name, FontAwesomeIcon);

app.use(Toast, {
  position: POSITION.BOTTOM_LEFT,
});
app.use(router);
app.use(store);
app.mount("#app");
