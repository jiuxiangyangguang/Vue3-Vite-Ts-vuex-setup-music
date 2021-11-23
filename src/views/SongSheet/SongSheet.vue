<script setup lang="ts">
import { getListById } from '@/api/music'
import { onActivated, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()
const songInfo = ref<any>({})
const getListData = async () => {
  const id = $route.query.id as string
  const { playlist }: any = await getListById({ id })
  songInfo.value = playlist
}
const back = () => {
  $router.push('/')
}
onActivated(() => {
  songInfo.value = {}
  getListData()
})
</script>

<template>
  <div class="animt-css3">
    <div class="topbox">
      <div
        class="bgurl"
        :style="{ background: `url(${songInfo.coverImgUrl})` }"
      ></div>
      <div class="nav">
        <van-icon name="down" @click="back" />
        <svg-icon name="gedanwangy" style="font-size: 24px"></svg-icon>
        <p>动态歌单</p>
      </div>
      <!-- 图片展示盒子 -->
      <div class="img-info">
        <img-com :url="songInfo.coverImgUrl" size="100"></img-com>
        <div class="info">
          <p class="text">{{ songInfo.name }}</p>
          <p class="icon">
            <span v-for="item in songInfo.tags">{{ item }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.topbox {
  position: relative;
  padding: 10px;

  .bgurl {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(60px);
    position: absolute;
    top: 0;
    z-index: -1;
  }
  .nav {
    display: flex;
    line-height: 24px;
    color: #fff;
    p {
      margin-left: 4px;
    }
    .van-icon {
      transform: rotate(90deg);
      margin-right: 10px;
    }
  }
  .img-info {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    :deep(.img-com) {
      width: 100px;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 10px;
    }
    .info {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      .text {
        color: #fff;
        line-height: 24px;
      }
      .icon {
        span {
          font-size: 12px;
          padding: 4px;
          background-color: #ff976a;
          border-radius: 10px;
          color: #fff;
          margin: 4px;
          display: inline-block;
        }
      }
    }
  }
}
</style>
