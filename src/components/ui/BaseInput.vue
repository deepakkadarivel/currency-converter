<template>
  <input class="input" type="number" :value="value" @input="numberOnly" />
</template>

<script>
import { formatNumber, restrictToNumber } from "../../utils/formatter";

export default {
  emits: ["onChange"],
  props: {
    value: Number,
  },
  setup(_, context) {
    function numberOnly(e) {
      const val = restrictToNumber(e.target.value);
      const formattedValue = formatNumber(val);
      e.target.value = formattedValue;
      context.emit("onChange", formattedValue);
    }

    return {
      numberOnly,
    };
  },
};
</script>

<style scoped>
.input {
  width: 200px;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
}
.input:active {
  border: 1px solid #000;
}
</style>