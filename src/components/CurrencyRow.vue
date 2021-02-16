<template>
  <base-input :value="amount" @onChange="changeAmount" />
  <base-select
    v-if="currency"
    :value="currency"
    :options="options"
    @onChange="changeCurrency"
  />
</template>

<script>
export default {
  emits: ["onChangeCurrency", "onChangeAmount"],
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

  setup(_, context) {
    function changeCurrency(currency) {
      context.emit("onChangeCurrency", currency);
    }

    function changeAmount(amount) {
      context.emit("onChangeAmount", amount);
    }

    return { changeCurrency, changeAmount };
  },
};
</script>

<style scoped>
</style>