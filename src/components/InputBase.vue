<template>
  <div class="input-container" :class="inputClass">
    <label :for="name" class="label">{{ $attrs.label }}</label>
    <input
      v-bind="$attrs"
      :name="name"
      :placeholder="$attrs.placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: ["modelValue", "inputClass"],
  mounted() {
    console.log(this);
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  &.width-30 {
    width: 30%;
  }

  .label {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--main-label);
    margin-bottom: 0.5rem;
  }
  input {
    padding: 1rem 1.5rem;
    border: 1px solid var(--light-gray);
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: 400;
    outline: none;
    transition: 0.2s border ease-in-out;
    &:focus {
      border: 1px solid var(--purple);
    }
  }
}
</style>
