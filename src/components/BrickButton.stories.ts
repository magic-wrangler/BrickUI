import type { Meta, StoryObj } from '@storybook/vue3';
import BrickButton from './BrickButton.vue';

const meta: Meta<typeof BrickButton> = {
  title: 'Components/BrickButton',
  component: BrickButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants and sizes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'success'],
      description: 'Button variant style'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the button'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state'
    },
    onClick: { action: 'clicked' }
  },
  args: {
    default: 'Button'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger'
  }
};

export const Success: Story = {
  args: {
    variant: 'success'
  }
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm'
  }
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md'
  }
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg'
  }
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true
  }
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true
  }
};

export const AllVariants: Story = {
  render: () => ({
    components: { BrickButton },
    template: `
      <div class="flex gap-4 flex-wrap">
        <BrickButton variant="primary">Primary</BrickButton>
        <BrickButton variant="secondary">Secondary</BrickButton>
        <BrickButton variant="danger">Danger</BrickButton>
        <BrickButton variant="success">Success</BrickButton>
      </div>
    `
  })
};

export const AllSizes: Story = {
  render: () => ({
    components: { BrickButton },
    template: `
      <div class="flex gap-4 items-center flex-wrap">
        <BrickButton variant="primary" size="sm">Small</BrickButton>
        <BrickButton variant="primary" size="md">Medium</BrickButton>
        <BrickButton variant="primary" size="lg">Large</BrickButton>
      </div>
    `
  })
};
