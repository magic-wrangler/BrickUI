import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import UnoCSS from '@unocss/vite';

// 库构建配置
export default defineConfig({
  plugins: [vue(), UnoCSS()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BrickUI',
      fileName: format => `brickui.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
        // 导出模块声明
        exports: 'named'
      }
    },
    // 生成 .d.ts 文件
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
