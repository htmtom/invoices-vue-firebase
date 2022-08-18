<template>
  <div class="new-invoice" :class="{ open: props.isOpen }"></div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["isOpen"]);
</script>

<style lang="scss" scoped>
.new-invoice {
  position: absolute;
  height: 100vh;
  width: 50rem;
  background: var(--main-form);
  top: 0;
  left: var(--aside-width);
  overflow-y: scroll;
  transition: 0.3s transform ease-in-out;
  transform: translateX(-100%);

  &.open {
    transform: translateX(0);
  }
}
</style>
