<template>
  <p class="hint">
    1 {{ fromCurrency }} = <span class="hint-value">{{ exchangeRate }}</span>
    {{ toCurrency }}
  </p>
</template>

<script>
export default {
  props: {
    fromCurrency: {
      type: String,
      required: true,
    },
    toCurrency: {
      type: String,
      required: true,
    },
    exchangeRate: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.hint {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #666;
}

.hint-value {
  color: #000;
  font-weight: 800;
}
</style>