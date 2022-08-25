import { ref } from "vue";

export default function useToggle(initialValue = false) {
  const isTrue = ref(initialValue);

  function toggle(val) {
    isTrue.value = typeof val == "boolean" ? val : !isTrue.value;
  }

  return { isTrue, toggle };
}
