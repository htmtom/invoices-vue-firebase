import { createApp } from "vue";
import App from "./App.vue";
import router from "./services/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon, faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faSun, faMoon, faTrash);

import "./assets/main.scss";

createApp(App).use(router).mount("#app");
