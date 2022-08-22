<template>
  <div class="header">
    <div class="left">
      <h3>Invoice</h3>
      <h4>Here you can create your invoices</h4>
    </div>
    <div class="right">
      <select
        :value="props.selectedStatus"
        @change="props.handleChange($event)"
      >
        <option value="all" disabled>Filter by status</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="draft">Draft</option>
      </select>
      <button class="button" @click="props.toggleForm">New Invoice</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["toggleForm", "handleChange", "selectedStatus"]);
console.log(props);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

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

    select {
      cursor: pointer;
      outline: none;
      margin-right: 1rem;
      padding: 0.5rem;
    }
  }
}
</style>
