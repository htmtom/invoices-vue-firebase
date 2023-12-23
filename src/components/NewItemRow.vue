<template>
  <input
    type="text"
    name="name"
    :value="props.item.name"
    placeholder="Name"
    class="input"
    @input="props.handleChangeItem(props.index, 'name', $event.target.value)"
  />
  <input
    type="number"
    min="0"
    step="0.01"
    name="price"
    :value="props.item.price"
    class="input"
    @input="props.handleChangeItem(props.index, 'price', +$event.target.value)"
  />
  <input
    type="number"
    name="quantity"
    
    :value="props.item.quantity"
    class="input"
    @input="
      props.handleChangeItem(props.index, 'quantity', +$event.target.value)
    "
  />

  <p class="input">{{ total }}</p>
  <button
    type="button"
    class="delete-btn"
    @click="props.handleDeleteItem(props.index)"
  >
    <font-awesome-icon class="icon" icon="fa-solid fa-trash" />
  </button>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, defineProps } from "vue";

const props = defineProps([
  "item",
  "index",
  "handleChangeItem",
  "handleDeleteItem",
]);

const total = computed(() =>
  (props.item.price * props.item.quantity).toFixed(2)
);
</script>

<style lang="scss" scoped>
input {
  display: block;
  width: 100%;
  grid-column: span 1;
  padding: 1rem 0.5rem;
}

.delete-btn {
  background: transparent;
  padding: 0.3rem;

  .icon {
    color: rgb(175, 16, 16);
    font-size: 2rem;

    &:hover {
      color: lighten(rgb(175, 16, 16), 10%);
    }
  }
}
</style>
