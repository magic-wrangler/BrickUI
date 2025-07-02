import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import UnoCSS from '@unocss/vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [UnoCSS()],
      resolve: {
        alias: {
          '@': '/src'
        }
      }
    })
  },
}

export default config