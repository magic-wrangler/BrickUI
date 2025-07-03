// vite.config.ts
import { defineConfig } from "file:///D:/github/BrickUI/node_modules/.pnpm/vite@5.4.19_@types+node@24.0.10/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/github/BrickUI/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vi_797d1813f6ca222127595577d6700cd7/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///D:/github/BrickUI/node_modules/.pnpm/@unocss+vite@0.57.7_rollup@_570ddd30ba337b051a869cfeacef39c9/node_modules/@unocss/vite/dist/index.mjs";
import AutoImport from "file:///D:/github/BrickUI/node_modules/.pnpm/unplugin-auto-import@0.17.8_b13239ca75e713bc1594c708120cef13/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/github/BrickUI/node_modules/.pnpm/unplugin-vue-components@0.2_293090952a39d4ae2fe3f09ed8531e54/node_modules/unplugin-vue-components/dist/vite.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "D:\\github\\BrickUI";
var vite_config_default = defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      plugins: [
        vue(),
        UnoCSS()
      ],
      build: {
        lib: {
          entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
          name: "BrickUI",
          fileName: (format) => `brickui.${format}.js`,
          formats: ["es", "umd"]
        },
        rollupOptions: {
          external: ["vue"],
          output: {
            globals: {
              vue: "Vue"
            },
            exports: "named"
          }
        },
        emptyOutDir: false
      },
      resolve: {
        alias: {
          "@": resolve(__vite_injected_original_dirname, "src")
        }
      }
    };
  }
  return {
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
        dts: "src/typings/auto-imports.d.ts"
      }),
      Components({
        dts: "src/typings/components.d.ts"
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxcQnJpY2tVSVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2l0aHViXFxcXEJyaWNrVUlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dpdGh1Yi9Ccmlja1VJL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFVub0NTUyBmcm9tICdAdW5vY3NzL3ZpdGUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICAvLyBcdTVFOTNcdTY3ODRcdTVFRkFcdTZBMjFcdTVGMEZcbiAgaWYgKG1vZGUgPT09ICdsaWInKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdnVlKCksXG4gICAgICAgIFVub0NTUygpXG4gICAgICBdLFxuICAgICAgYnVpbGQ6IHtcbiAgICAgICAgbGliOiB7XG4gICAgICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICAgICAgbmFtZTogJ0JyaWNrVUknLFxuICAgICAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgYnJpY2t1aS4ke2Zvcm1hdH0uanNgLFxuICAgICAgICAgIGZvcm1hdHM6IFsnZXMnLCAndW1kJ11cbiAgICAgICAgfSxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgIGV4dGVybmFsOiBbJ3Z1ZSddLFxuICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgICB2dWU6ICdWdWUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhwb3J0czogJ25hbWVkJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW1wdHlPdXREaXI6IGZhbHNlXG4gICAgICB9LFxuICAgICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gXHU1RjAwXHU1M0QxXHU2QTIxXHU1RjBGXHU5MTREXHU3RjZFXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBVbm9DU1MoKSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3BpbmlhJywgJ0B2dWV1c2UvY29yZSddLFxuICAgICAgICBkdHM6ICdzcmMvdHlwaW5ncy9hdXRvLWltcG9ydHMuZC50cydcbiAgICAgIH0pLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIGR0czogJ3NyYy90eXBpbmdzL2NvbXBvbmVudHMuZC50cydcbiAgICAgIH0pXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJPLFNBQVMsb0JBQW9CO0FBQ3hRLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxlQUFlO0FBTHhCLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRXhDLE1BQUksU0FBUyxPQUFPO0FBQ2xCLFdBQU87QUFBQSxNQUNMLFNBQVM7QUFBQSxRQUNQLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxLQUFLO0FBQUEsVUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLFVBQ3hDLE1BQU07QUFBQSxVQUNOLFVBQVUsQ0FBQyxXQUFXLFdBQVcsTUFBTTtBQUFBLFVBQ3ZDLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxRQUN2QjtBQUFBLFFBQ0EsZUFBZTtBQUFBLFVBQ2IsVUFBVSxDQUFDLEtBQUs7QUFBQSxVQUNoQixRQUFRO0FBQUEsWUFDTixTQUFTO0FBQUEsY0FDUCxLQUFLO0FBQUEsWUFDUDtBQUFBLFlBQ0EsU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsUUFDQSxhQUFhO0FBQUEsTUFDZjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsT0FBTztBQUFBLFVBQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxRQUMvQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUdBLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxRQUNULFNBQVMsQ0FBQyxPQUFPLGNBQWMsU0FBUyxjQUFjO0FBQUEsUUFDdEQsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
