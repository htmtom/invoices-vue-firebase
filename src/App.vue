<template>
  <main>
    <SideBar />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { invCol } from "./firebase/controllers";
import { onSnapshot, query, where } from "firebase/firestore";
import { formatFirebaseRecord } from "./utils";
import SideBar from "./components/SideBar.vue";
import { useStore } from "vuex";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";

const store = useStore();
const unsubscripe = ref("");

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.commit("login", user);
      store.commit("loadingInvoices");
      unsubscripe.value = onSnapshot(
        query(invCol, where("user", "==", user.uid)),
        (snap) => {
          store.commit("setInvoices", snap.docs.map(formatFirebaseRecord));
        }
      );
    } else {
      if (unsubscripe.value) unsubscripe.value();
    }
  });
});

onUnmounted(() => {
  unsubscripe.value();
});
</script>

<style scoped lang="scss">
main {
  display: grid;
  grid-template-columns: var(--aside-width) 1fr;
  min-height: 100vh;
}
</style>
