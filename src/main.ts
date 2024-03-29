/*
 * @Author: c
 * @Date: 2021-11-16 14:43:38
 * @LastEditTime: 2021-12-03 09:22:14
 * @LastEditors: jiuxiangyang
 * @Description:
 * @FilePath: \musicwangyi\src\main.ts
 * 版权声明
 */
import Router from '@/router'
import Vuex from '@/store'
import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/style/index.less' // 总样式表
import directive from '@/utils/directive'
import 'virtual:svg-icons-register' // svg插入脚本
const app = createApp(App)
directive(app)
app.use(Router).use(Vuex).mount('#app')
