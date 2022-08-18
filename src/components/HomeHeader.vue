<template>
  <div class="header">
    <div class="left">
      <h3>Invoice</h3>
      <h4>Here you can create your invoices</h4>
    </div>
    <div class="right">
      <button class="button" @click="props.toggleForm">New Invoice</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["toggleForm"]);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;

  .left {
    h3 {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 0.2rem;
    }

    h4 {
      font-size: 1.5rem;
      font-weight: 400;
    }
  }

  .right {
    .button {
      background: var(--purple);
    }
  }
}
</style>
