import { mount } from '@vue/test-utils'
import BaseSelect from '@/components/ui/BaseSelect.vue'

describe('BaseSelect.vue', () => {
  it('renders base select component', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options: ['USD', 'EUR', 'INR'],
        value: 'EUR',
      }
    });

    const select = wrapper.find('select');
    expect(select.element.value).toEqual('EUR');
    select.trigger('change');
    expect(wrapper.emitted().onChange).toBeTruthy();
    expect(wrapper.emitted().onChange).toHaveLength(1);
    expect(wrapper.emitted().onChange[0]).toEqual(['EUR'])
  })
})