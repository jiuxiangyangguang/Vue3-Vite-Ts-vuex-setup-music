/*
 * @Author: c
 * @Date: 2021-11-16 14:43:38
 * @LastEditTime: 2021-12-03 09:28:12
 * @LastEditors: jiuxiangyang
 * @Description:
 * @FilePath: \musicwangyi\vite.config.ts
 * 版权声明
 */
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import { svgBuilder } from './src/utils/svgBuilder'
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  // 获取环境变量
  const httpurl = loadEnv(mode, process.cwd()).VITE_BASE_API

  return {
    base: './',
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()]
      }),
      // svgBuilder('./src/assets/icon/svg/'),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icon/svg')],
        symbolId: 'icon-[name]'
      }),

      viteCompression({
        //生成压缩包gz
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    ],
    server: {
      host: true,
      port: 1111,
      proxy: {
        '/api': {
          target: mode === 'online' ? httpurl : 'http://47.115.228.238:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      open: true
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
    build: {
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true
        }
      },
      minify: 'terser',
      // 取消计算文件大小，加快打包速度
      brotliSize: false,
      sourcemap: false,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
