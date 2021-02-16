import 'whatwg-fetch';
import { mount } from '@vue/test-utils'
import CurrencyRow from '@/components/CurrencyRow.vue'
import CurrencyHint from '@/components/CurrencyHint.vue'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders App component', () => {
    const wrapper = mount(App, {
      stubs: {
        CurrencyRow: true,
        CurrencyHint: true
    }
    });

    expect(wrapper.find("h1").text()).toBe("Currency Converter")
    const currencyRows = wrapper.findAllComponents(CurrencyRow);
    expect(currencyRows.length).toEqual(2);
    const currencyHints = wrapper.findAllComponents(CurrencyHint);
    expect(currencyHints.length).toEqual(2);
  })
})