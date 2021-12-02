/*
 * @Author: c
 * @Date: 2021-11-16 14:43:38
 * @LastEditTime: 2021-12-02 18:16:00
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\main.ts
 * 版权声明
 */
import { createApp } from 'vue'
import Router from '@/router'
import Vuex from '@/store'
import App from './App.vue'
import { Notify } from 'vant'

import 'virtual:svg-icons-register'
import '@/assets/style/index.less' // 总样式表

createApp(App)
  .use(Router)
  .use(Vuex)
  .mount('#app')
