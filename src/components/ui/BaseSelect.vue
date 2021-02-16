<template>
  <select :value="value" @change="onChange">
    <option v-for="option in options" :key="option">{{ option }}</option>
  </select>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["onChange"],
  props: {
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
    value: {
      type: String,
    },
  },
  setup(_, context) {
    const currencyInput = ref("");

    function onChange(e) {
      context.emit("onChange", e.target.value);
    }

    return { currencyInput, onChange };
  },
};
</script>

<style scoped>
select {
  padding: 12px 16px;
  margin-left: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none;
  background-color: transparent;
  font-size: 14px;
  font-weight: bold;
  outline: none;
}
</style>