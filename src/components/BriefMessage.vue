<template>
  <div class="message error">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.message {
  padding: 1.2rem;
  margin-bottom: 1.6rem;
  border-radius: 5px;

  &.error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
}
</style>
