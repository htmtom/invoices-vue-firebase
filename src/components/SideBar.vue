<template>
  <aside class="sidebar">
    <div class="logo-icon">
      <div class="icon"></div>
    </div>

    <div class="icon-container">
      <font-awesome-icon
        v-if="isDark"
        icon="fa-solid fa-sun"
        class="icon"
        @click="toggleDarkMode"
      />
      <font-awesome-icon
        v-else
        icon="fa-solid fa-moon"
        class="icon"
        @click="toggleDarkMode"
      />
    </div>
  </aside>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";

const isDark = ref(false);

function toggleDarkMode() {
  isDark.value = !isDark.value;
  document.body.classList.toggle("light");
}
</script>

<style scoped lang="scss">
.sidebar {
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--dark-purple);
  box-shadow: 1rem 0 4rem rgba(255, 255, 255, 0.15);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  .logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    height: 8rem;
    background: var(--purple);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;

    .icon {
      width: 3rem;
      height: 3rem;
      background: conic-gradient(
        transparent 0 25deg,
        white 25deg 335deg,
        transparent 335deg 360deg
      );
      border-radius: 50%;
    }
  }

  .icon-container {
    display: grid;
    place-items: center;

    .icon {
      padding-bottom: 3rem;
      font-size: 3rem;
      color: #ccc;
      cursor: pointer;
    }
  }
}
</style>
