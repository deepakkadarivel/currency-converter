import { mount } from '@vue/test-utils'
import CurrencyHint from '@/components/CurrencyHint.vue'

describe('CurrencyHint.vue', () => {
  it('renders currency exchange hint', () => {
    const wrapper = mount(CurrencyHint, {
      props: {
        fromCurrency: 'EUR',
        toCurrency: 'USD',
        exchangeRate: 1.2341,
      }
    });

    expect(wrapper.text()).toMatch("1 EUR = 1.2341 USD");
  })
})