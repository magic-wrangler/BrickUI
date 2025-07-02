<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">
        BrickUI Component Library
      </h1>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BrickButton variant="primary" @click="handleClick">
          Primary Button
        </BrickButton>

        <BrickButton variant="secondary" @click="handleClick">
          Secondary Button
        </BrickButton>

        <BrickButton variant="danger" @click="handleClick">
          Danger Button
        </BrickButton>
      </div>

      <div class="mt-8">
        <BrickCard title="Welcome to BrickUI" class="max-w-md mx-auto">
          <p class="text-gray-600">
            This is a Vue 3 component library built with TypeScript, Pinia, and
            UnoCSS. Check out our Storybook for interactive component
            documentation.
          </p>
        </BrickCard>
      </div>

      <div class="mt-8 text-center">
        <p class="text-gray-500">Counter: {{ counterStore.counter }}</p>
        <button
          @click="counterStore.increment"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Increment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();

const handleClick = (): void => {
  // eslint-disable-next-line no-console
  console.log('Button clicked!');
};
</script>
