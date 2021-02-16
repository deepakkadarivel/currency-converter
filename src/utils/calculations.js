
import { formatNumber } from './formatter';

export function calcBaseToQuoteAmount(baseAmount, exchangeRate) {
      return formatNumber(baseAmount * exchangeRate);
    }

export function calcQuoteToBaseAmount(quoteAmount, exchangeRate) {
      return formatNumber(quoteAmount / exchangeRate);
    }