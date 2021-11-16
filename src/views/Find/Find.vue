<script setup lang="ts">
import SwiperVue from '@/components/Swiper.vue'
import IconNavVue from './compnents/IconNav.vue'
import SearchVue from './compnents/Search.vue'
IconNavVue
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
