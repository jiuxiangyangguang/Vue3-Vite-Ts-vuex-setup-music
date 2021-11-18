import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/layout/Home.vue'
import Find from '@/views/Find/Find.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'find',
    children: [
      {
        path: 'find',
        name: 'Find',
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
    name: 'Song',
    component: () => import('@/views/SongSheet/SongSheet.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
