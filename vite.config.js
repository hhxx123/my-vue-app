import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from "unplugin-vue-components/vite"
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import vueJSX from "@vitejs/plugin-vue-jsx"
const path = require('path');
const root = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/default.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    vueJSX(),
    AutoImport({//自动导入elementUi
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  // root,
  build: {
    rollupOptions: {
      input: { // 多entry
        index: path.resolve(__dirname, "index.html"),
        demo: path.resolve(__dirname, "demo.html"),
      }
    }
  },
  // presets:['@vue/babel-preset-jsx']
})
