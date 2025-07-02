<template>
  <div :class="cardClasses">
    <div
      v-if="title || $slots.header"
      class="px-6 py-4 border-b border-gray-200"
    >
      <slot name="header">
        <h3 class="text-lg font-medium text-gray-900">
          {{ title }}
        </h3>
      </slot>
    </div>

    <div class="px-6 py-4">
      <slot />
    </div>

    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
  bordered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  shadow: 'md',
  rounded: true,
  bordered: true
});

const cardClasses = computed(() => {
  const baseClasses = ['bg-white', 'overflow-hidden'];

  // Shadow classes
  const shadowClasses = {
    none: [],
    sm: ['shadow-sm'],
    md: ['shadow-md'],
    lg: ['shadow-lg'],
    xl: ['shadow-xl']
  };

  // Rounded classes
  const roundedClasses = props.rounded ? ['rounded-lg'] : [];

  // Border classes
  const borderClasses = props.bordered ? ['border', 'border-gray-200'] : [];

  return [
    ...baseClasses,
    ...shadowClasses[props.shadow],
    ...roundedClasses,
    ...borderClasses
  ].join(' ');
});
</script>
