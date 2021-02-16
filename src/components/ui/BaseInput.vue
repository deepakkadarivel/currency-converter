<template>
  <input class="input" type="number" :value="value" @input="numberOnly" />
</template>

<script>
export default {
  emits: ["onChange"],
  props: {
    value: Number,
  },
  setup(_, context) {
    function numberOnly(e) {
      const val = e.target.value.replace(/[^0-9.]+/g, "");
      const formattedValue = Number(
        (Math.floor(val * 10000) / 10000).toFixed(4)
      );
      e.target.value = formattedValue;
      context.emit("onChange", formattedValue);
    }

    return {
      numberOnly,
    };
  },
};
</script>