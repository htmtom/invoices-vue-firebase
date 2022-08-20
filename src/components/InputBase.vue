<template>
  <div class="input-container" :class="inputClass">
    <label :for="name" class="label">{{ $attrs.label }}</label>
    <slot>
      <input
        v-bind="$attrs"
        class="input"
        :name="name"
        :placeholder="$attrs.placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        required
      />
    </slot>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: ["modelValue", "inputClass"],
};
</script>

<style lang="scss">
.input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  &.width-30 {
    width: 30%;
  }

  &.width-60 {
    width: 60%;
  }

  .extraPadding input {
    padding-left: 3rem;
  }
}
</style>
