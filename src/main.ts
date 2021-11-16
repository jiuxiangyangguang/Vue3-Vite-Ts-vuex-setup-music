import { createApp } from 'vue'
import Router from '@/router'
import Vuex from '@/store'
import App from './App.vue'


import '@/assets/style/index.less' // 总样式表
import SvgIcon from '@/components/SvgIcon.vue'  // svg图

createApp(App)
  .use(Router)
  .use(Vuex)
  .component("svg-icon", SvgIcon)
  .mount('#app')
