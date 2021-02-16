# currency-converter

## Technical task

- ## AC:
1. Ability to select the source (Base) and target (Quote) currencies
2. Ability to input the source amount
3. Use conversion rates data from third-party API
4. actual conversion calculation must be performed in the application.

- ## Usecases:
1. User will enter base currency to see base/quote exchange rates.
2. The currency will always be a number, so non-numeric values except decimal should not be allowed.
3. Users will prefer to choose different currency pairs from a list or dropdown.
4. When a new quote or base currency is selected, the values also must update (sync).
5. Users might always want to see the standard rate for 1 unit for the active pairs.
6. Users can select either base input or quote input to calculate conversions.
7. Non-numeric values & negative values are not valid inputs.
8. The exchange rate calculations may yield fractions in the result. To keep it consistent max four decimals can be allowed.

- ## Project info
1. Built-in Vue3 js using vue-cli
2. Data from https://exchangeratesapi.io/ API
3. Unit test with vue/test-utils, jest
4. E2E with cypress

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm serve
```

### Compiles and minifies for production
```
npm build
```

### Lints and fixes files
```
npm lint
```
### Run unit tests
```
npm run test:unit
```
### Run E2E tests
```
npm run test:e2e
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
