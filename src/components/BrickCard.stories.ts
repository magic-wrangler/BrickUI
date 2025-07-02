import type { Meta, StoryObj } from '@storybook/vue3';
import BrickCard from './BrickCard.vue';
import BrickButton from './BrickButton.vue';

const meta: Meta<typeof BrickCard> = {
  title: 'Components/BrickCard',
  component: BrickCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible card component with header, content, and footer slots.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Card title'
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Card shadow level'
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Apply rounded corners'
    },
    bordered: {
      control: { type: 'boolean' },
      description: 'Show border'
    }
  },
  args: {
    default: 'Card content goes here...'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title'
  }
};

export const WithoutTitle: Story = {
  args: {}
};

export const NoShadow: Story = {
  args: {
    title: 'No Shadow Card',
    shadow: 'none'
  }
};

export const LargeShadow: Story = {
  args: {
    title: 'Large Shadow Card',
    shadow: 'xl'
  }
};

export const NoBorder: Story = {
  args: {
    title: 'No Border Card',
    bordered: false
  }
};

export const NotRounded: Story = {
  args: {
    title: 'Square Card',
    rounded: false
  }
};

export const WithSlots: Story = {
  render: () => ({
    components: { BrickCard, BrickButton },
    template: `
      <BrickCard class="w-80">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Custom Header</h3>
            <span class="text-sm text-gray-500">Badge</span>
          </div>
        </template>
        
        <div class="space-y-4">
          <p class="text-gray-600">
            This card uses custom header and footer slots to create a more complex layout.
          </p>
          <p class="text-sm text-gray-500">
            You can put any content in these slots.
          </p>
        </div>
        
        <template #footer>
          <div class="flex justify-end space-x-2">
            <BrickButton variant="secondary" size="sm">Cancel</BrickButton>
            <BrickButton variant="primary" size="sm">Save</BrickButton>
          </div>
        </template>
      </BrickCard>
    `
  })
};

export const ProductCard: Story = {
  render: () => ({
    components: { BrickCard, BrickButton },
    template: `
      <BrickCard class="w-80" title="Product Name">
        <div class="space-y-4">
          <div class="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
            <span class="text-gray-500">Product Image</span>
          </div>
          <p class="text-gray-600">
            This is a sample product description that shows how the card component can be used for e-commerce.
          </p>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-gray-900">$99.99</span>
            <span class="text-sm text-green-600">In Stock</span>
          </div>
        </div>
        
        <template #footer>
          <div class="flex space-x-2">
            <BrickButton variant="secondary" size="sm" class="flex-1">Add to Cart</BrickButton>
            <BrickButton variant="primary" size="sm" class="flex-1">Buy Now</BrickButton>
          </div>
        </template>
      </BrickCard>
    `
  })
};

export const AllShadows: Story = {
  render: () => ({
    components: { BrickCard },
    template: `
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
        <BrickCard title="No Shadow" shadow="none" class="w-48">
          <p class="text-sm text-gray-600">shadow="none"</p>
        </BrickCard>
        <BrickCard title="Small Shadow" shadow="sm" class="w-48">
          <p class="text-sm text-gray-600">shadow="sm"</p>
        </BrickCard>
        <BrickCard title="Medium Shadow" shadow="md" class="w-48">
          <p class="text-sm text-gray-600">shadow="md"</p>
        </BrickCard>
        <BrickCard title="Large Shadow" shadow="lg" class="w-48">
          <p class="text-sm text-gray-600">shadow="lg"</p>
        </BrickCard>
        <BrickCard title="XL Shadow" shadow="xl" class="w-48">
          <p class="text-sm text-gray-600">shadow="xl"</p>
        </BrickCard>
      </div>
    `
  }),
  parameters: {
    layout: 'fullscreen'
  }
};
