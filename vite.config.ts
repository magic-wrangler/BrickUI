import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from '@unocss/vite';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            'useLocalStorage',
            'useSessionStorage',
            'useClipboard',
            'useToggle',
            'useCounter',
            'useDark',
            'useColorMode'
          ]
        }
      ],
      dts: 'src/typings/auto-imports.d.ts', // 生成 `auto-imports.d.ts` 文件，用于类型声明
      eslintrc: {
        enabled: true, // 生成 .eslintrc-auto-import.json 文件
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Components({
      dts: 'src/typings/components.d.ts', // 生成 `components.d.ts` 文件，用于类型声明
      dirs: ['src/components'], // 组件目录
      extensions: ['vue'], // 组件文件扩展名
      include: [/\.vue$/, /\.vue\?vue/], // 包含的文件
      resolvers: [
        // 自动导入组件库
        // ElementPlusResolver(),
        // AntDesignVueResolver(),
        // NaiveUiResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
