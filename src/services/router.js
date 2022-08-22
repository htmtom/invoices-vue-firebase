import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import InvoicePage from "../pages/InvoicePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/invoice/:id", component: InvoicePage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
