<template>
  <base-input :value="amount" @onChange="changeAmount" />
  <select :value="selection" @change="changeCurrency">
    <option v-for="option in options" :key="option">{{ option }}</option>
  </select>
</template>

<script>
import { ref } from "vue";
import BaseInput from "./ui/BaseInput.vue";
export default {
  components: { BaseInput },
  emits: ["onChangeCurrency", "onChangeAmount"],
  props: {
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
    selection: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  setup(_, context) {
    const currencyInput = ref("");

    function changeCurrency(e) {
      context.emit("onChangeCurrency", e.target.value);
    }

    function changeAmount(val) {
      context.emit("onChangeAmount", val);
    }

    return { currencyInput, changeCurrency, changeAmount };
  },
};
</script>

<style scoped>
.input {
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