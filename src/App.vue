<template>
  <main>
    <SideBar />
    <router-view v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { invCol } from "./firebase/controllers";
import { onSnapshot } from "firebase/firestore";
import { formatFirebaseRecord } from "./utils";
import SideBar from "./components/SideBar.vue";
import { useStore } from "vuex";

const store = useStore();
const unsubscripe = ref("");

onMounted(() => {
  unsubscripe.value = onSnapshot(invCol, (snap) => {
    store.commit("setInvoices", snap.docs.map(formatFirebaseRecord));
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
