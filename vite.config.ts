import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import cesium from "vite-plugin-cesium";
import path from "path";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  console.log("mode:", mode);
  console.log("env:", env);

  return defineConfig({
    base: env.VITE_BASE_URL, // ✅ 关键

    server: {
      host: "0.0.0.0",
      port: 5177,
    },

    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ["vue", "vue-router", "pinia"],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      cesium(),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
