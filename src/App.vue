<template>
  <header>
    <h1 class="header">Currency Converter</h1>
  </header>
  <currency-row
    :options="currencyData.options"
    :currency="currencyData.baseCurrency"
    :amount="currencyData.baseAmount"
    @onChangeCurrency="changeBaseCurrency"
    @onChangeAmount="changeBaseAmount"
  ></currency-row>
  <div>=</div>
  <currency-row
    :options="currencyData.options"
    :currency="currencyData.quoteCurrency"
    :amount="currencyData.quoteAmount"
    @onChangeCurrency="changeQuoteCurrency"
    @onChangeAmount="changeQuoteAmount"
  ></currency-row>
</template>

<script>
import { onMounted, reactive } from "vue";
import CurrencyRow from "./components/CurrencyRow";
import constants from "./utils/constants";
import { formatNumber } from "./utils/formatter";

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
      baseAmount: 0,
      quoteAmount: 0,
      exchangeRate: 0,
    });

    function fetchExchangeRates() {
      fetch(constants.BASE_URL)
        .then((res) => res.json())
        .then((data) => setCurrencyData(data));
    }

    onMounted(() => fetchExchangeRates());

    function calculateExchangeRates(rate) {
      currencyData.exchangeRate = rate;
      currencyData.baseAmount = formatNumber(currencyData.amount);
      currencyData.quoteAmount = formatNumber(currencyData.amount * rate);
    }

    function setCurrencyData(data) {
      const nonBaseCurrencyCodes = Object.keys(data.rates);
      const firstCurrency = nonBaseCurrencyCodes[0];
      const exchangeRate = data.rates[firstCurrency];

      currencyData.options = [data.base, ...nonBaseCurrencyCodes];
      currencyData.baseCurrency = data.base;
      currencyData.quoteCurrency = firstCurrency;
      calculateExchangeRates(exchangeRate);
    }

    function fetchCurrencyUpdates() {
      const URL =
        constants.BASE_URL +
        "?base=" +
        currencyData.baseCurrency +
        "&symbols=" +
        currencyData.quoteCurrency;
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          const exchangeRate = data.rates[currencyData.quoteCurrency];
          calculateExchangeRates(exchangeRate);
        });
    }

    function changeBaseCurrency(value) {
      currencyData.baseCurrency = value;
      fetchCurrencyUpdates();
    }
    function changeQuoteCurrency(value) {
      currencyData.quoteCurrency = value;
      fetchCurrencyUpdates();
    }
    function changeBaseAmount(value) {
      currencyData.baseAmount = value;
      currencyData.quoteAmount = formatNumber(
        value * currencyData.exchangeRate
      );
    }
    function changeQuoteAmount(value) {
      currencyData.quoteAmount = value;
      currencyData.baseAmount = formatNumber(value / currencyData.exchangeRate);
    }

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
