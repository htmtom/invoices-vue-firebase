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

      <font-awesome-icon
        v-if="isAuthenticated"
        icon="fa-solid fa-arrow-right-from-bracket"
        class="icon"
        @click="signOut"
      />

      <font-awesome-icon
        v-else
        icon="fa-brands fa-google"
        class="icon google"
        @click="signIn"
      />
    </div>
  </aside>
</template>

<script setup>
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import { logoutRequest, signInRequest } from "../firebase/controllers";
import { asyncHandler, formatFirebaseError } from "../utils";

const isDark = ref(false);
const toast = useToast();
const store = useStore();

const isAuthenticated = computed(() => {
  return !!store.state.user;
});

function toggleDarkMode() {
  isDark.value = !isDark.value;
  document.body.classList.toggle("light");
}

async function signIn() {
  const [res, err] = await asyncHandler(signInRequest);
  if (res) {
    toast.success("Signed in Successfully");
  } else {
    toast.error(formatFirebaseError(err));
  }
}

async function signOut() {
  const [, err] = await asyncHandler(logoutRequest);
  if (!err) {
    store.commit("logout");
  } else {
    toast.error(formatFirebaseError(err));
  }
}
</script>

<style scoped lang="scss">
@use "../assets/mixins";

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--dark-blue);
  box-shadow: 0rem 0 0rem rgba(255, 255, 255, 0.15);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  max-width: 300px;
  @include mixins.respond(tab) {
    height: var(--aside-width);
    flex-direction: row;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    max-width: 100%;
  }

  .logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    height: 8rem;
    background: var(--dark-blue);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;

    @include mixins.respond(tab) {
      width: 8rem;
      border-top-right-radius: 0;
      border-bottom-right-radius: 20px;
      border-bottom-left-radius: 20px;
    }

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
    gap: 5rem;
    margin-bottom: 2rem;

    @include mixins.respond(tab) {
      display: flex;
      margin-bottom: 0;
      margin-right: 2rem;
    }

    .icon {
      font-size: 3rem;
      color: #ccc;
      cursor: pointer;

      &.google {
        color: white;
        background: #dd4b39;
        padding: 1rem;
        border-radius: 50%;
      }
    }
  }
}
</style>
