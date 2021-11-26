<script setup lang="ts">
import SwiperVue from '@/components/Swiper.vue'
import IconNavVue from './compnents/IconNav.vue'
import NewSongVue from './compnents/NewSong.vue'
import RankListVue from './compnents/RankList.vue'
import RecommendVue from './compnents/Recommend.vue'
// import SearchVue from '../../components/Search-com.vue'
</script>
<script lang="ts">
export default {
  name: 'Find'
}
</script>
<template>
  <div class="find">
    <!-- 搜索组件 -->
    <search-com @click="$router.push('search')"></search-com>
    <div class="banner-nav">
      <!-- 轮播图区域 -->
      <swiper-vue></swiper-vue>
      <!-- icon导航栏区域 -->
      <icon-nav-vue></icon-nav-vue>
    </div>
    <!-- 卡片盒子 -->
    <div class="cord">
      <!-- 推荐歌单 -->
      <recommend-vue></recommend-vue>
      <!-- 推荐新音乐 -->
      <new-song-vue></new-song-vue>
      <!-- 排行榜 -->
      <rank-list-vue></rank-list-vue>
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
