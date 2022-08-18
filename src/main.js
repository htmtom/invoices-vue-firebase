import { createApp } from "vue";
import App from "./App.vue";
import router from "./services/router";

import "./assets/main.scss";

createApp(App).use(router).mount("#app");
