<script setup lang="ts">
import { getPersonalized } from '@/api/music'
import { reactive, ref } from '@vue/reactivity'
import BScroll from '@better-scroll/core'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()

const li = ref<Array<HTMLLIElement>>([]) // liDOM元素

const jumpFlag = ref(true) // 是否允许跳转

const time = ref() // 定时

const better = () => {
  const bs = new BScroll('.wrapper', {
    scrollX: true,
    click: true,
    preventDefaultException: {
      className: /(^|\s)test(\s|$)/
    }
  })
  // 滚动开始不允许跳转
  bs.on('scrollStart', () => {
    jumpFlag.value = false
  })
  // 滚动结束可以跳转
  bs.on('scrollEnd', () => {
    jumpFlag.value = true
  })
}

const songList = ref<Array<Img>>([])

const getlistData = async () => {
  const { result }: any = await getPersonalized()
  songList.value = result
  await nextTick()
  better()
}

<<<<<<< HEAD
const jump = (item: any) => {
  $router.push({ path: '/song', query: { id: item.id } })
=======
const scale = (e: any, index: number) => {
  li.value[index].style.transform = 'scale(0.9)'
}
</script>

<template>
  <div class="recom">
    <p class="title">
      推荐歌单 <span>更多<van-icon name="arrow" /></span>
    </p>
      <ul>
<<<<<<< HEAD
        <li v-for="item in songList" @click="jump(item)">
=======
          v-for="(item, index) in songList"
          @touchstart="scale($event, index)"
          @touchmove="jumpCharge()"
          @touchend="jump(item, index)"
          :ref="(el:any) => li.push(el)"
        >
>>>>>>> origin/master
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
    padding-bottom: 4px;
    li {
      display: flex;
      width: 100px;
      flex-direction: column;
      margin-right: 10px;
      padding: 4px 0;
      position: relative;
<<<<<<< HEAD
=======
      transition: all 0.2s ease;
>>>>>>> origin/master
      &::before {
        content: '';
        display: block;
        margin: 0 auto;
        width: 80px;
        height: 10px;
        border-radius: 8px 8px 0 0;
        background-color: #eee;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      p {
        font-size: 12px;
        // transform: scale(0.8);
        line-height: 14px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        z-index: 1;
      }
      .img-com {
        z-index: 1;
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
