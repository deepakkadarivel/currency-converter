import { mount } from '@vue/test-utils'
import CurrencyRow from '@/components/CurrencyRow.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

describe('CurrencyRow.vue', () => {
  it('renders currency row component', () => {
    const wrapper = mount(CurrencyRow, {
      stubs: {
        BaseSelect: true,
        BaseInput: true
    },
      props: {
        options: ['USD', 'EUR', 'GBP'],
        currency: 'EUR',
        amount: 1,
      }
    });

    const input = wrapper.findComponent(BaseInput);
    expect(input.element.value).toEqual("1");
    input.vm.$emit('onChange', 1.50)
    expect(wrapper.emitted().onChangeAmount).toBeTruthy();
    expect(wrapper.emitted().onChangeAmount).toHaveLength(1);
    expect(wrapper.emitted().onChangeAmount[0]).toEqual([1.5])

    const select = wrapper.findComponent(BaseSelect);
    select.vm.$emit('onChange', 'INR')
    expect(wrapper.emitted().onChangeCurrency).toBeTruthy();
    expect(wrapper.emitted().onChangeCurrency).toHaveLength(1);
    expect(wrapper.emitted().onChangeCurrency[0]).toEqual(['INR'])

  })
})