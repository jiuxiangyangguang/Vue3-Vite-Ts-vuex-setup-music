<script setup lang="ts">
import { getBanner } from '@/api/music'
import { reactive, ref } from 'vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
  Navigation,
  Controller,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
  EffectFade
} from 'swiper'

// Import Swiper styles
import 'swiper/css/bundle'

const banners = ref(<any>[])
const pagination = reactive({
  clickable: true
})
const autoplay = reactive({
  running: true,
  delay: 3000
})
const modules = [Pagination, Autoplay]
const getBannerData = async () => {
  const data: any = await getBanner()
  banners.value = data.banners
}

const onSlideChange = (e: any) => {
  // console.log(e.activeIndex)
}
getBannerData()
</script>

<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :loop="true"
    :autoplay="autoplay"
    :pagination="pagination"
    class="swiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item in banners">
      <img :src="item.imageUrl" />
      <div class="icon">{{ item.typeTitle }}</div>
    </swiper-slide>
  </swiper>
</template>

<style lang="less" scoped>
.swiper {
  width: 100%;
  margin: 0 auto;
  height: 130px;
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .swiper-slide {
    position: relative;
    .icon {
      position: absolute;
      bottom: 0;
      right: 0;
      color: #ffff;
      height: 20px;
      text-align: center;
      line-height: 20px;
      padding: 2px 4px;
      background-color: #4c9adb;
      border-radius: 10px 0 0 0;
      font-size: 12px;
    }
  }
  :deep(.swiper-pagination-bullet) {
    background-color: #eee;
  }
  :deep(.swiper-pagination-bullet-active, .swiper-pagination-bullet-active-main) {
    background-color: #b90b0b !important;
  }
}
</style>
