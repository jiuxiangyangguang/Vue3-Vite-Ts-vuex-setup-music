<!--
 * @Author: c
 * @Date: 2021-11-16 14:43:38
 * @LastEditTime: 2021-12-05 19:07:53
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\App.vue
 * 版权声明
-->
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { useRoute, useRouter } from 'vue-router'
import useStore from './hooks/useStore'

const $route = useRoute()
const $router = useRouter()

const $store = useStore()
$store.commit('getLocation')
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <keep-alive :include="['Home', 'PlayHome']">
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>

  <!--  音乐播放组件 隐藏的全局共享 不可删除 -->
  <audio-bar />
  <!-- 音乐播放组件 -->
  <audio-box v-show="$route.path !== '/play'" />
</template>

<style lang="less"></style>
