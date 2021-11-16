<script setup lang="ts">
import SwiperVue from '@/components/Swiper.vue'
import IconNavVue from './compnents/IconNav.vue'
import RecommendVue from './compnents/Recommend.vue'
import SearchVue from './compnents/Search.vue'
</script>

<template>
  <div class="find">
    <!-- 搜索组件 -->
    <SearchVue></SearchVue>

    <div class="main">
      <!-- 轮播图区域 -->
      <SwiperVue></SwiperVue>
      <!-- icon导航栏区域 -->
      <IconNavVue></IconNavVue>
      <!-- 推荐歌单 -->
      <RecommendVue></RecommendVue>
    </div>
  </div>
</template>

<style lang="less">
.find {
  .main {
    padding: 0 10px;
  }
}
</style>
