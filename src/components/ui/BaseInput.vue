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