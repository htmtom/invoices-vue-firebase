<template>
  <div class="message" :class="variant">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "error",
    },
  },
};
</script>

<style scoped lang="scss">
.message {
  padding: 1.2rem;
  margin-block: 1.6rem;
  border-radius: 5px;

  &.error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }

  &.info {
    color: #383d41;
    background-color: #e2e3e5;
    border-color: #d6d8db;
  }
}
</style>
