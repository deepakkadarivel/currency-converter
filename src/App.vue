<template>
  <header>
    <h1 class="header">Currency Converter</h1>
  </header>
  <p v-if="isLoading">Loading ...</p>
  <p v-if="isError">Data request error, please refresh page.</p>
  <div v-else>
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
        :exchangeRate="calcBaseToQuoteAmount(1, currencyData.exchangeRate)"
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
        :exchangeRate="calcQuoteToBaseAmount(1, currencyData.exchangeRate)"
      ></currency-hint>
    </section>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import constants from "./utils/constants";
import { formatNumber } from "./utils/formatter";
import {
  calcBaseToQuoteAmount,
  calcQuoteToBaseAmount,
} from "./utils/calculations";
import CurrencyRow from "./components/CurrencyRow";
import CurrencyHint from "./components/CurrencyHint.vue";

export default {
  name: "App",
  components: {
    CurrencyRow,
    CurrencyHint,
  },

  setup() {
    const isLoading = ref(false);
    const isError = ref(false);

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
      isLoading.value = true;
      return fetch(constants.BASE_URL)
        .then((res) => res.json())
        .then((data) => setCurrencyData(data))
        .catch(() => (isError.value = true))
        .then(() => (isLoading.value = false));
    }

    function fetchCurrencyUpdates() {
      const URL =
        constants.BASE_URL +
        "?base=" +
        currencyData.baseCurrency +
        "&symbols=" +
        currencyData.quoteCurrency;
      return fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          const exchangeRate = data.rates[currencyData.quoteCurrency];
          setExchangeRates(exchangeRate);
        })
        .catch(() => (isError.value = true));
    }

    function setExchangeRates(rate) {
      currencyData.exchangeRate = rate;
      currencyData.baseAmount = formatNumber(currencyData.amount);
      currencyData.quoteAmount = calcBaseToQuoteAmount(
        currencyData.amount,
        rate
      );
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
      currencyData.quoteAmount = calcBaseToQuoteAmount(
        value,
        currencyData.exchangeRate
      );
    }

    function changeQuoteAmount(value) {
      currencyData.quoteAmount = value;
      currencyData.baseAmount = calcQuoteToBaseAmount(
        value,
        currencyData.exchangeRate
      );
    }

    return {
      isLoading,
      isError,
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
