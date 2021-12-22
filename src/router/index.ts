/*
 * @Author: c
 * @Date: 2021-11-16 14:44:41
 * @LastEditTime: 2021-12-02 11:13:18
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\router\index.ts
 * 版权声明
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/layout/Home.vue'
import Find from '@/views/Find/Find.vue'
import useStore from '@/hooks/useStore'
const r = import.meta.globEager('/src/views/Find/compnents/*.vue') // 一下引入所有vue文件
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'find',
    meta: { keepAlive: true, transition: 'fadess' },
    children: [
      {
        path: 'find',
        name: 'Find',
        meta: { keepAlive: true, transition: 'fadess' },
        component: Find,
      },
      {
        path: 'podcast',
        name: 'Podcast',
        component: () => import('@/views/Podcast/Podcast.vue'),
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/My/My.vue'),
      },
      {
        path: 'follow',
        name: 'Follow',
        component: () => import('@/views/Follow/Follow.vue'),
      },
      {
        path: 'yuncun',
        name: 'Yuncun',
        component: () => import('@/views/Yuncun/Yuncun.vue'),
      }
    ]
  },
  {
    path: '/song',
    name: 'song',
    component: () => import('@/views/SongSheet/SongSheet.vue'),
    meta: {
      transition: 'fade'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search/Search.vue'),
    meta: {
      transition: ''
    }
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('@/views/PlayPage/PlayHome.vue'),
    meta: {
      transition: ''
    }
  },
  {
    path: '/setup',
    name: 'SetUp',
    component: () => import('@/views/SetUp/SetUp.vue'),
    meta: {
      transition: ''
    }
  },
  {
    path: '/skin',
    name: 'Skin',
    component: () => import('@/views/Skin/Skin.vue'),
    meta: {
      transition: ''
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      transition: ''
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
