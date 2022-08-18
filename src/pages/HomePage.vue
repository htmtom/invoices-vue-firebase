<template>
  <div class="container">
    <invoice-new-form :isOpen="isOpen" />
    <home-header :toggleForm="toggleForm" />
  </div>
</template>

<script setup>
import HomeHeader from "../components/HomeHeader.vue";
import InvoiceNewForm from "../components/InvoiceNewForm.vue";
import { ref } from "vue";

const isOpen = ref(false);

function toggleForm() {
  isOpen.value = !isOpen.value;
  console.log(isOpen.value);
}
</script>

<style scoped>
.container {
  color: var(--main-text);
}
</style>
