<template>
  <span class="hint">
    1 {{ fromCurrency }} = <span class="hint-value">{{ exchangeRate }}</span>
    {{ toCurrency }}
  </span>
</template>

<script>
export default {
  props: {
    fromCurrency: String,
    toCurrency: String,
    exchangeRate: Number,
  },
};
</script>

<style scoped>
span {
  margin-top: 8px;
  font-size: 12px;
}
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