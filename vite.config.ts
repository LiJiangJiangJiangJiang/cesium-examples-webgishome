import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import path from "path";

// import externalGlobals from "rollup-plugin-external-globals";

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router", "pinia"] // 自动导入vue和vue-router相关api(需要pinia的话这里需要引入pinia)
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
  // build: {
  //   rollupOptions: {
  //     external: ["vue", "element-plus"],
  //     plugins: [
  //       externalGlobals({
  //         vue: "Vue",
  //         "element-plus": "ElementPlus"
  //       })
  //     ]
  //   }
  // }
});
