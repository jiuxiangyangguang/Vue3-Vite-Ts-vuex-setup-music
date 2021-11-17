<script setup lang="ts">
import SwiperVue from '@/components/Swiper.vue'
import IconNavVue from './compnents/IconNav.vue'
import NewSongVue from './compnents/NewSong.vue'
import RankListVue from './compnents/RankList.vue'
import RecommendVue from './compnents/Recommend.vue'
import SearchVue from './compnents/Search.vue'
</script>

<template>
  <div class="find">
    <!-- 搜索组件 -->
    <SearchVue></SearchVue>
    <div class="banner-nav">
      <!-- 轮播图区域 -->
      <SwiperVue></SwiperVue>
      <!-- icon导航栏区域 -->
      <IconNavVue></IconNavVue>
    </div>
    <!-- 卡片盒子 -->
    <div class="cord">
      <!-- 推荐歌单 -->
      <RecommendVue></RecommendVue>
      <!-- 推荐新音乐 -->
      <NewSongVue></NewSongVue>
      <!-- 排行榜 -->
      <RankListVue></RankListVue>
    </div>
  </div>
</template>

<style lang="less">
.find {
  padding-bottom: 58px;
  .banner-nav {
    padding: 0 10px;
  }
  .cord {
    background-color: #eee;
  }
}
</style>
