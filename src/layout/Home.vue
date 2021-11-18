<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { KeepAlive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const active = ref<string>('/find')
const $router = useRouter()
const $route = useRoute()

/* 跳转路由 */
const onChange = (index: string): void => {
  $router.push(index)
}
watch($route, () => {
  active.value = $route.path
})
</script>

<template>
  <!-- 二级路由部分 -->
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component" :key="route.path"></component>
    </keep-alive>
  </router-view>
  <!-- 导航栏部分 -->
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item name="/find">
      <p>发现</p>
      <template #icon="props">
        <svg-icon
          name="log"
          :style="{
            fontSize: '20px',
            color: props.active ? '#fff' : '#808080'
          }"
        ></svg-icon>
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="/podcast">
      <p>博客</p>
      <template #icon="props">
        <svg-icon
          name="boke"
          :style="{
            fontSize: '20px',
            color: props.active ? '#fff' : '#808080'
          }"
        ></svg-icon>
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="/my">
      <p>我的</p>
      <template #icon="props">
        <svg-icon
          name="music"
          :style="{
            fontSize: '20px',
            color: props.active ? '#fff' : '#808080'
          }"
        ></svg-icon>
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="/follow">
      <p>关注</p>
      <template #icon="props">
        <svg-icon
          name="guanz"
          :style="{
            fontSize: '20px',
            color: props.active ? '#fff' : '#808080'
          }"
        ></svg-icon>
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="/yuncun">
      <p>云村</p>
      <template #icon="props">
        <svg-icon
          name="guangc"
          :style="{
            fontSize: '20px',
            color: props.active ? '#fff' : '#808080'
          }"
        ></svg-icon>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="less">
.van-tabbar-item {
  p {
    font-size: 12px;
    transform: scale(0.8) !important;
  }
  .van-tabbar-item__icon {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 2px;
  }
  &.van-tabbar-item--active {
    p {
      color: red;
    }
    .van-tabbar-item__icon {
      background: linear-gradient(
        123deg,
        rgba(253, 132, 127, 1) 0%,
        rgba(250, 59, 60, 1) 100%
      );
    }
  }
}
</style>
