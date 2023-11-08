<!--
 * @Author: c
 * @Date: 2021-11-16 14:43:38
 * @LastEditTime: 2021-12-05 19:07:53
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\App.vue
 * 版权声明
-->
<script lang="ts">
import { computed, defineAsyncComponent, shallowRef, watch } from 'vue'
const playlist = shallowRef(null)

export default {
  components: { playlist }
}
</script>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import useStore from './hooks/useStore'

const $route = useRoute()
const $store = useStore()
const show = computed(() => $store.state.showPlayList)
$store.commit('getLocation')

watch(show, () => {
  if (show.value) {
    playlist.value = defineAsyncComponent(
      () => import('@/components/PlayList.vue')
    )
  } else {
    playlist.value = null
  }
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <keep-alive :include="['Home', 'PlayHome', 'Search']">
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>

  <!--  音乐播放组件 隐藏的全局共享 不可删除 -->
  <audio-bar />
  <!-- 音乐播放组件 -->
  <audio-box v-show="$route.path !== '/play' && $route.path !== '/login'" />

  <!-- 播放列表 -->
  <transition name="playlist">
    <component :is="playlist"></component>
  </transition>
</template>

<style lang="less"></style>
