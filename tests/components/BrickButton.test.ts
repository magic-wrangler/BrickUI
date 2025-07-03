import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BrickButton from '../../src/components/BrickButton.vue';

describe('BrickButton', () => {
  it('renders properly', () => {
    const wrapper = mount(BrickButton, {
      slots: {
        default: 'Hello world'
      }
    });
    expect(wrapper.text()).toContain('Hello world');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(BrickButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(BrickButton, {
      props: {
        disabled: true
      }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  // it('applies correct type class', () => {
  //   const wrapper = mount(BrickButton, {
  //     props: {
  //       type: 'primary'
  //     }
  //   });
  //   expect(wrapper.classes()).toContain('btn-primary');
  // });

  // it('applies correct size class', () => {
  //   const wrapper = mount(BrickButton, {
  //     props: {
  //       size: 'lg'
  //     }
  //   });
  //   expect(wrapper.classes()).toContain('btn-large');
  // });

  // it('shows loading state', () => {
  //   const wrapper = mount(BrickButton, {
  //     props: {
  //       loading: true
  //     }
  //   });
  //   expect(wrapper.classes()).toContain('btn-loading');
  // });

  // it('is disabled when loading', () => {
  //   const wrapper = mount(BrickButton, {
  //     props: {
  //       loading: true
  //     }
  //   });
  //   expect(wrapper.attributes('disabled')).toBeDefined();
  // });

  // it('supports custom attributes', () => {
  //   const wrapper = mount(BrickButton, {
  //     attrs: {
  //       'data-testid': 'custom-button'
  //     }
  //   });
  //   expect(wrapper.attributes('data-testid')).toBe('custom-button');
  // });
});
