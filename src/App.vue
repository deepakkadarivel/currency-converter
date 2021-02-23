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
        @onChangeCurrency="changeBaseCurrency"
        v-model:amount="baseAmount"
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
        @onChangeCurrency="changeQuoteCurrency"
        v-model:amount="quoteAmount"
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
import { onMounted, reactive, ref, watch } from "vue";
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
    const baseAmount = ref(1);
    const quoteAmount = ref(0);

    const currencyData = reactive({
      options: [],
      rates: {},
      baseCurrency: "",
      quoteCurrency: "",
      // baseAmount: 1,
      // quoteAmount: 0,
      exchangeRate: 0,
    });

    onMounted(() => fetchExchangeRates());

    watch([baseAmount, quoteAmount], (newValues, oldValues) => {
      console.log({ newValues });
      console.log({ oldValues });
      if (newValues[0] !== oldValues[0]) {
        quoteAmount.value = calcBaseToQuoteAmount(
          newValues[0],
          currencyData.exchangeRate
        );
      }
      if (newValues[1] !== oldValues[1]) {
        baseAmount.value = calcQuoteToBaseAmount(
          newValues[1],
          currencyData.exchangeRate
        );
      }
    });

    /* API handlers */

    function fetchExchangeRates(currency = constants.BASE_CURRENCY) {
      const url = `${constants.BASE_URL}?base=${currency}`;
      isLoading.value = true;
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          currencyData.rates = data.rates;
          const nonBaseCurrencyCodes = Object.keys(data.rates);
          const firstCurrency = nonBaseCurrencyCodes[0];
          const exchangeRate = data.rates[firstCurrency];

          if (currency === constants.BASE_CURRENCY) {
            currencyData.options = [data.base, ...nonBaseCurrencyCodes];
            currencyData.rates = { ...currencyData.rates, EUR: 1 };
          } else {
            currencyData.options = nonBaseCurrencyCodes;
          }
          if (currencyData.baseCurrency === "") {
            currencyData.baseCurrency = data.base;
          }
          if (currencyData.quoteCurrency === "") {
            currencyData.quoteCurrency = firstCurrency;
          }
          setExchangeRates(exchangeRate);
        })
        .catch(() => (isError.value = true))
        .then(() => (isLoading.value = false));
    }

    // function fetchCurrencyUpdates() {
    //   const URL =
    //     constants.BASE_URL +
    //     "?base=" +
    //     currencyData.baseCurrency +
    //     "&symbols=" +
    //     currencyData.quoteCurrency;
    //   return fetch(URL)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       const exchangeRate = data.rates[currencyData.quoteCurrency];
    //       setExchangeRates(exchangeRate);
    //     })
    //     .catch(() => (isError.value = true));
    // }

    function setExchangeRates(rate) {
      currencyData.exchangeRate = rate;
      baseAmount.value = formatNumber(baseAmount.value);
      quoteAmount.value = calcBaseToQuoteAmount(baseAmount.value, rate);
    }

    /* Event handlers for inputs */
    function changeBaseCurrency(value) {
      currencyData.baseCurrency = value;
      fetchExchangeRates(value);
    }

    function changeQuoteCurrency(value) {
      currencyData.quoteCurrency = value;
      setExchangeRates(currencyData.rates[value]);
    }

    // function changeBaseAmount(value) {
    //   currencyData.baseAmount = value;
    //   currencyData.quoteAmount = calcBaseToQuoteAmount(
    //     value,
    //     currencyData.exchangeRate
    //   );
    // }

    // function changeQuoteAmount(value) {
    //   currencyData.quoteAmount = value;
    //   currencyData.baseAmount = calcQuoteToBaseAmount(
    //     value,
    //     currencyData.exchangeRate
    //   );
    // }

    return {
      isLoading,
      isError,
      currencyData,
      changeBaseCurrency,
      changeQuoteCurrency,
      // changeBaseAmount,
      // changeQuoteAmount,
      calcBaseToQuoteAmount,
      calcQuoteToBaseAmount,
      baseAmount,
      quoteAmount,
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
