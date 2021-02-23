<template>
  <div>
    <base-input v-model="inputAmount" />
    <base-select
      v-if="currency"
      :value="currency"
      :options="options"
      @onChange="changeCurrency"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import BaseInput from "./ui/BaseInput";
import BaseSelect from "./ui/BaseSelect";
export default {
  emits: ["onChangeCurrency", "update:amount"],
  components: {
    BaseInput,
    BaseSelect,
  },
  props: {
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
    currency: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },

  setup(props, context) {
    function changeCurrency(currency) {
      context.emit("onChangeCurrency", currency);
    }

    const inputAmount = computed({
      get: () => props.amount,
      set: (val) => context.emit("update:amount", val),
    });

    return { changeCurrency, inputAmount };
  },
};
</script>

<style scoped>
</style>