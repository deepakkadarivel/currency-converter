import { calcBaseToQuoteAmount,
  calcQuoteToBaseAmount } from '@/utils/calculations';

const rates = { EUR: 1, GBP: 0.97, USD: 1.5401, INR: 88.82 };
  
it('Calculate exchange rate for quote currency to base currency', () => {
  expect(calcBaseToQuoteAmount(rates.EUR, rates.GBP)).toEqual(0.97);
  expect(calcBaseToQuoteAmount(40 * rates.EUR, rates.GBP)).toEqual( 38.8);
  expect(calcBaseToQuoteAmount(rates.EUR, rates.USD)).toEqual(1.5401);
  expect(calcBaseToQuoteAmount(0.5 * rates.EUR, rates.INR)).toEqual(44.4099);
})

it('Calculate exchange rate for base currency to quote currency', () => {
  expect(calcQuoteToBaseAmount(rates.USD, rates.GBP)).toEqual(1.5877);
  expect(calcQuoteToBaseAmount(40 * rates.USD, rates.GBP)).toEqual(63.5092);
  expect(calcQuoteToBaseAmount(rates.USD, rates.EUR)).toEqual(1.5401);
  expect(calcQuoteToBaseAmount(0.5 * rates.USD, rates.INR)).toEqual(0.0086);
})