import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { VantResolver } from 'vite-plugin-components'  // 自动的注册vant组件 
import styleImport from 'vite-plugin-style-import'
import { svgBuilder } from './src/utils/svgBuilder'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgBuilder('./src/assets/icon/svg/'),
    ViteComponents({
      customComponentResolvers: [VantResolver()]
    }),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`
        }
      ]
    })
  ],
  server: {
    host: true,
    port: 1102
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
})
