/*
 * @Author: c
 * @Date: 2021-11-16 14:43:38
 * @LastEditTime: 2021-12-03 09:28:12
 * @LastEditors: jiuxiangyang
 * @Description:
 * @FilePath: \musicwangyi\vite.config.ts
 * 版权声明
 */
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { VantResolver } from 'vite-plugin-components'  // 自动的注册vant组件 
import styleImport from 'vite-plugin-style-import'
import viteCompression from 'vite-plugin-compression'
// import { svgBuilder } from './src/utils/svgBuilder'
import viteSvgIcons from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
//@ts-ignore
export default defineConfig(({ mode }) => {
  // 获取环境变量
  const httpurl = loadEnv(mode, process.cwd()).VITE_BASE_API

  return {
    plugins: [
      vue(),
      // svgBuilder('./src/assets/icon/svg/'),
      viteSvgIcons({
        iconDirs: [resolve(process.cwd(), 'src/assets/icon/svg')],
        symbolId: 'icon-[name]'
      }),
      ViteComponents({
        customComponentResolvers: [VantResolver()],
      }),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `vant/es/${name}/style`
          }
        ]
      }),
      viteCompression({
        //生成压缩包gz
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
    server: {
      host: true,
      port: 1102,
      proxy: {
        '/api': {
          target: mode === 'online' ? httpurl : 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      open: true
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
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
          drop_debugger: true,
        },
      },
      // 取消计算文件大小，加快打包速度
      brotliSize: false,
      sourcemap: false,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
    }
  }
}
)