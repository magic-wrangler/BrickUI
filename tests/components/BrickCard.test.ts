import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BrickCard from '../../src/components/BrickCard.vue';

describe('BrickCard', () => {
  it('renders properly', () => {
    const wrapper = mount(BrickCard, {
      slots: {
        default: 'Card content'
      }
    });
    expect(wrapper.text()).toContain('Card content');
  });

  it('renders header slot', () => {
    const wrapper = mount(BrickCard, {
      slots: {
        header: 'Card Header',
        default: 'Card content'
      }
    });
    expect(wrapper.text()).toContain('Card Header');
    expect(wrapper.text()).toContain('Card content');
  });

  // it('applies correct shadow class', () => {
  //   const wrapper = mount(BrickCard, {
  //     props: {
  //       shadow: 'lg'
  //     }
  //   });
  //   expect(wrapper.classes()).toContain('card-shadow-hover');
  // });

  // it('applies default shadow class', () => {
  //   const wrapper = mount(BrickCard);
  //   expect(wrapper.classes()).toContain('card-shadow-always');
  // });

  // it('applies custom body style', () => {
  //   const bodyStyle = { padding: '10px', margin: '5px' };
  //   const wrapper = mount(BrickCard, {
  //     props: {
  //       bodyStyle
  //     }
  //   });
  //   const bodyElement = wrapper.find('.card-body');
  //   expect(bodyElement.attributes('style')).toContain('padding: 10px');
  //   expect(bodyElement.attributes('style')).toContain('margin: 5px');
  // });

  // it('renders header prop as text', () => {
  //   const wrapper = mount(BrickCard, {
  //     props: {
  //       header: 'Header Text'
  //     },
  //     slots: {
  //       default: 'Card content'
  //     }
  //   });
  //   expect(wrapper.text()).toContain('Header Text');
  // });

  it('prioritizes header slot over header prop', () => {
    const wrapper = mount(BrickCard, {
      props: {
        header: 'Header Prop'
      },
      slots: {
        header: 'Header Slot',
        default: 'Card content'
      }
    });
    expect(wrapper.text()).toContain('Header Slot');
    expect(wrapper.text()).not.toContain('Header Prop');
  });

  // it('has correct default body style', () => {
  //   const wrapper = mount(BrickCard, {
  //     slots: {
  //       default: 'Card content'
  //     }
  //   });
  //   const bodyElement = wrapper.find('.card-body');
  //   expect(bodyElement.attributes('style')).toContain('padding: 20px');
  // });

  it('supports custom attributes', () => {
    const wrapper = mount(BrickCard, {
      attrs: {
        'data-testid': 'custom-card'
      }
    });
    expect(wrapper.attributes('data-testid')).toBe('custom-card');
  });
});
