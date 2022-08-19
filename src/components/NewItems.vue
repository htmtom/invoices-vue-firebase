<template>
  <div class="row">
    <p class="label">Name</p>
    <p class="label">Price</p>
    <p class="label">Quantity</p>
    <p class="label">Total</p>
  </div>

  <div class="row" v-for="(item, idx) in props.items" :key="item.id">
    <new-item-row
      :item="item"
      :index="idx"
      :handleChangeItem="handleChangeItem"
      :handleDeleteItem="handleDeleteItem"
    />
  </div>
  <button class="add-btn" @click="props.addNewItem">Add item</button>
</template>

<script setup>
import { defineProps } from "vue";
import NewItemRow from "./NewItemRow.vue";

const props = defineProps([
  "items",
  "addNewItem",
  "handleChangeItem",
  "handleDeleteItem",
]);
</script>

<style lang="scss" scoped>
.row {
  display: grid;
  gap: 0.6rem;
  max-width: 100%;
  grid-template-columns: 4fr 2fr 2fr 2fr 1fr;
  margin-bottom: 2rem;
}

.add-btn {
  background: #7c5dfa;
  width: 100%;
  padding: 1rem;
  box-shadow: 0 1rem 4rem rgba(0, 0, 0, 0.1);
  transition: 0.3s all;

  &:hover {
    background: darken(#7c5dfa, 50%);
  }
}
</style>
