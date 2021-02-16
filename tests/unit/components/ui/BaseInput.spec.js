import { mount } from '@vue/test-utils'
import BaseInput from '@/components/ui/BaseInput.vue'

describe('BaseInput.vue', () => {
  it('renders base input component', () => {
    const wrapper = mount(BaseInput, {
      props: {
        value: 100.55,
      }
    });

    const input = wrapper.find('input');
    expect(input.element.value).toEqual('100.55');
    input.trigger('input');
    expect(wrapper.emitted().onChange).toBeTruthy();
    expect(wrapper.emitted().onChange).toHaveLength(1);
    expect(wrapper.emitted().onChange[0]).toEqual([100.55])
  })
})