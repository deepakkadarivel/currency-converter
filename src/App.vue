<template>
  <header>
    <h1 class="header">Currency Converter</h1>
  </header>
  <currency-row
    :options="currencyData.options"
    :selection="currencyData.baseCurrency"
    @onChangeCurrency="changeBaseCurrency"
    @onChangeAmount="changeBaseAmount"
    :amount="currencyData.baseAmount"
  ></currency-row>
  <div>=</div>
  <currency-row
    :options="currencyData.options"
    :selection="currencyData.quoteCurrency"
    @onChangeCurrency="changeQuoteCurrency"
    @onChangeAmount="changeQuoteAmount"
    :amount="currencyData.quoteAmount"
  ></currency-row>
</template>

<script>
import { onMounted, reactive } from "vue";
import CurrencyRow from "./components/CurrencyRow";
import constants from "./utils/constants";

export default {
  name: "App",
  components: {
    CurrencyRow,
  },

  setup() {
    const currencyData = reactive({
      options: [],
      rates: {},
      baseCurrency: "",
      quoteCurrency: "",
      amount: 1,
      isAmountFromBaseInput: true,
      baseAmount: 0,
      quoteAmount: 0,
      exchangeRate: 0,
    });

    function fetchLatestCurrencyData() {
      fetch(constants.BASE_URL)
        .then((res) => res.json())
        .then((data) => {
          const nonBaseCurrencyCodes = Object.keys(data.rates);
          const firstCurrency = nonBaseCurrencyCodes[0];
          const exchangeRate = data.rates[firstCurrency];
          currencyData.options = [data.base, ...nonBaseCurrencyCodes];
          currencyData.baseCurrency = data.base;
          currencyData.quoteCurrency = firstCurrency;
          currencyData.exchangeRate = exchangeRate;
          currencyData.baseAmount = currencyData.amount;
          currencyData.quoteAmount = currencyData.amount * exchangeRate;
        });
    }

    function fetchModifiedCurrencyData() {
      fetch(
        constants.BASE_URL +
          "?base=" +
          currencyData.baseCurrency +
          "&symbols=" +
          currencyData.quoteCurrency
      )
        .then((res) => res.json())
        .then((data) => {
          const exchangeRate = data.rates[currencyData.quoteCurrency];
          currencyData.exchangeRate = exchangeRate;
          currencyData.baseAmount = currencyData.amount;
          currencyData.quoteAmount = currencyData.amount * exchangeRate;
        });
    }

    function changeBaseCurrency(value) {
      currencyData.baseCurrency = value;
      fetchModifiedCurrencyData();
    }
    function changeQuoteCurrency(value) {
      currencyData.quoteCurrency = value;
      fetchModifiedCurrencyData();
    }
    function changeBaseAmount(value) {
      currencyData.baseAmount = value;
      currencyData.quoteAmount = value * currencyData.exchangeRate;
    }
    function changeQuoteAmount(value) {
      currencyData.quoteAmount = value;
      currencyData.baseAmount = value / currencyData.exchangeRate;
    }

    onMounted(() => fetchLatestCurrencyData());

    return {
      currencyData,
      changeBaseCurrency,
      changeQuoteCurrency,
      changeBaseAmount,
      changeQuoteAmount,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
header {
  margin: 36px 0;
}
body {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
}
</style>
