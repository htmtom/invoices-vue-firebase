<template>
  <main>
    <SideBar />
    <router-view />
  </main>
</template>

<script setup>
import SideBar from "./components/SideBar.vue";
</script>

<style scoped lang="scss">
main {
  display: grid;
  grid-template-columns: var(--aside-width) 1fr;
  min-height: 100vh;
}
</style>
