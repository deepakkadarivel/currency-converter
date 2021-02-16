<template>
  <header>
    <h1 class="header">Currency Converter</h1>
  </header>
  <section>
    <currency-row
      :options="currencyData.options"
      :currency="currencyData.baseCurrency"
      :amount="currencyData.baseAmount"
      @onChangeCurrency="changeBaseCurrency"
      @onChangeAmount="changeBaseAmount"
    ></currency-row>
    <currency-hint
      :fromCurrency="currencyData.baseCurrency"
      :toCurrency="currencyData.quoteCurrency"
      :exchangeRate="calcBaseToQuoteAmount(1)"
    ></currency-hint>
  </section>

  <section>
    <currency-row
      :options="currencyData.options"
      :currency="currencyData.quoteCurrency"
      :amount="currencyData.quoteAmount"
      @onChangeCurrency="changeQuoteCurrency"
      @onChangeAmount="changeQuoteAmount"
    ></currency-row>
    <currency-hint
      :fromCurrency="currencyData.quoteCurrency"
      :toCurrency="currencyData.baseCurrency"
      :exchangeRate="calcQuoteToBaseAmount(1)"
    ></currency-hint>
  </section>
</template>

<script>
import { onMounted, reactive } from "vue";
import constants from "./utils/constants";
import { formatNumber } from "./utils/formatter";
import CurrencyRow from "./components/CurrencyRow";
import CurrencyHint from "./components/CurrencyHint.vue";

export default {
  name: "App",
  components: {
    CurrencyRow,
    CurrencyHint,
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

    onMounted(() => fetchExchangeRates());

    /* API handlers */

    function fetchExchangeRates() {
      fetch(constants.BASE_URL)
        .then((res) => res.json())
        .then((data) => setCurrencyData(data));
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
          setExchangeRates(exchangeRate);
        });
    }

    /* Helper methods */

    function calcBaseToQuoteAmount(baseAmount = currencyData.baseAmount) {
      return formatNumber(baseAmount * currencyData.exchangeRate);
    }

    function calcQuoteToBaseAmount(quoteAmount = currencyData.quoteAmount) {
      return formatNumber(quoteAmount / currencyData.exchangeRate);
    }

    function setExchangeRates(rate) {
      currencyData.exchangeRate = rate;
      currencyData.baseAmount = formatNumber(currencyData.amount);
      currencyData.quoteAmount = calcBaseToQuoteAmount();
    }

    function setCurrencyData(data) {
      const nonBaseCurrencyCodes = Object.keys(data.rates);
      const firstCurrency = nonBaseCurrencyCodes[0];
      const exchangeRate = data.rates[firstCurrency];

      currencyData.options = [data.base, ...nonBaseCurrencyCodes];
      currencyData.baseCurrency = data.base;
      currencyData.quoteCurrency = firstCurrency;
      setExchangeRates(exchangeRate);
    }

    /* Event handlers for inputs */
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
      currencyData.quoteAmount = calcBaseToQuoteAmount(value);
    }

    function changeQuoteAmount(value) {
      currencyData.quoteAmount = value;
      currencyData.baseAmount = calcQuoteToBaseAmount(value);
    }

    return {
      currencyData,
      changeBaseCurrency,
      changeQuoteCurrency,
      changeBaseAmount,
      changeQuoteAmount,
      calcBaseToQuoteAmount,
      calcQuoteToBaseAmount,
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
  min-height: 40vh;
}
section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 36px;
}
</style>
