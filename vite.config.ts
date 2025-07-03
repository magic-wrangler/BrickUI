import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from '@unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 库构建模式
  if (mode === 'lib') {
    return {
      plugins: [vue(), UnoCSS()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'BrickUI',
          fileName: format => `brickui.${format}.js`,
          formats: ['es', 'umd']
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            },
            exports: 'named'
          }
        },
        emptyOutDir: true
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src')
        }
      }
    };
  }

  // 开发模式配置
  return {
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        dts: 'src/typings/auto-imports.d.ts'
      }),
      Components({
        dts: 'src/typings/components.d.ts'
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  };
});
