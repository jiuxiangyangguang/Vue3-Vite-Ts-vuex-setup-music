<script setup lang="ts">
import { getPersonalized } from '@/api/music'
import { reactive, ref } from '@vue/reactivity'
import BScroll from '@better-scroll/core'
import { nextTick } from 'vue'

const better = () => {
  const bs = new BScroll('.wrapper', {
    scrollX: true,
    click: true
  })
  console.log(1)
}
interface Img {
  id: number
  name: string
  picUrl: string
}

const songList = ref<Array<Img>>([])

const getlistData = async () => {
  const { result }: any = await getPersonalized()
  songList.value = result
  await nextTick()
  better()
}
getlistData()
</script>

<template>
  <!-- 推荐歌单 -->
  <div class="recom">
    <p class="title">
      推荐歌单 <span>更多<van-icon name="arrow" /></span>
    </p>
    <div class="wrapper">
      <ul>
        <li v-for="item in songList">
          <img-com :url="item.picUrl" :size="500"></img-com>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.recom {
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  border-top: 1px solid #ccc;
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
  .wrapper {
    width: 100%;
    overflow: hidden;
  }
  ul {
    min-width: 1100px;
    display: flex;
    li {
      display: flex;
      width: 100px;
      flex-direction: column;
      margin-right: 10px;
      p {
        text-align: left;
        font-size: 12px;
        transform: scale(0.8);
        line-height: 14px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .img-spin {
        height: auto;
        :deep(img) {
          width: 100px;
          height: 100px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
