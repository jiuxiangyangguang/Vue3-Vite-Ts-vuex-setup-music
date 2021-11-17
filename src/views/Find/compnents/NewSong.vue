<script setup lang="ts">
import { getNewSong } from '@/api/music'
import BScroll from '@better-scroll/core'
import { nextTick, onMounted, ref } from 'vue'

const better = () => {
  const bs = new BScroll('.wrapper', {
    scrollX: true,
    click: true
  })
}
const newSongData = ref([])
const newsong = async () => {
  const { result }: any = await getNewSong()
  newSongData.value = result.slice(0, 3)
}

newsong()
</script>

<template>
  <!-- 推荐新音乐 -->
  <div class="newsong">
    <div class="title">
      <p><van-icon name="replay" /> 推荐新音乐</p>
      <span><van-icon name="play-circle-o" />播放</span>
    </div>
    <ul>
      <li v-for="item: any in newSongData">
        <img-com :url="item.picUrl" :size="100"></img-com>
        <div class="info">
          <p class="songname">{{ item.name }}</p>
          <p class="artistsname">{{ item.song.artists[0].name }}</p>
        </div>
        <svg-icon class="svg" name="sp" style="color: #fc716d"></svg-icon>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.newsong {
  background-color: #fff;
  margin-top: 10px;
  border-radius: 0 0 10px 10px;
  padding: 0 10px;
  .title {
    font-weight: 700;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-weight: normal;
      font-size: 12px;
      padding: 4px 4px 4px 6px;
      border: 1px solid #eee;
      border-radius: 20px;
    }
  }
  ul {
    li {
      display: flex;
      align-items: center;
      height: 50px;
      position: relative;
      .info {
        font-size: 12px;
        margin-left: 10px;
        line-height: 20px;
        .songname {
          font-weight: 700;
        }
        .artistsname {
          color: #ccc;
        }
      }
      :deep(.img-spin) {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 10px;
      }
      .svg {
        padding: 4px;
        position: absolute;
        right: 10px;
        border-radius: 10px;
        background-color: #eee;
      }
    }
  }
}
</style>
