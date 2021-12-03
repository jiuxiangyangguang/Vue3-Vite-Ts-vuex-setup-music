<!--
 * @Author: c
 * @Date: 2021-11-16 14:43:38
 * @LastEditTime: 2021-12-03 13:47:24
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\App.vue
 * 版权声明
-->
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { useRoute } from 'vue-router'

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const $routr = useRoute()
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <keep-alive :include="['Find']">
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>

  <!--  音乐播放组件 隐藏的全局共享 不可删除 -->
  <audio-bar />
  <!-- 音乐播放组件 -->
  <audio-box />
</template>

<style lang="less"></style>
