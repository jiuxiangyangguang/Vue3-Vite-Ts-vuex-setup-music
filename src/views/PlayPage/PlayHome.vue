<!--
 * @Author: c
 * @Date: 2021-12-02 11:08:33
 * @LastEditTime: 2021-12-03 10:59:47
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\views\PlayPage\PlayHome.vue
 * 版权声明
-->
<script lang="ts">
export default {
  name: 'PlayHome'
}
</script>
<script setup lang="ts">
import { computed, onActivated, ref, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMusicDetail } from '@/api/music'
import useStore from '@/hooks/useStore'
import playcont from './PlayCont.vue'
import volume from './Volume.vue'
const $route = useRoute()
const $router = useRouter()
const songdetail = ref<Array<Song>>([])
const imgrotate = ref(null)
const $store = useStore()
const playFlag = computed(() => $store.state.audio.playFlag) // 是否播放
const index = computed(() => $store.state.audio.index) // 当前播放索引
const currentPlay = computed(() => $store.state.audio.currentPlay) // 当前播放列表
interface Song {
  name: string
  id: number
  al: AL
  ar: Array<AR>
}
interface AL {
  id: number
  name: string
  picUrl: string
}
interface AR {
  id: number
  name: string
}
//
const getDetail = async (flag: boolean, ids: number | string) => {
  const data: any = await getMusicDetail({ ids })
  songdetail.value = data?.songs

  currentPlay.value.forEach((item, i) => {
    if (item.id === ids) {
      $store.commit('setIndex', i)
      flag = false
    }
  })
  if (flag) {
    // 向歌曲列表添加歌曲歌曲
    $store.commit('setCurrentPlay', {
      name: songdetail.value[0]?.name,
      songName: songdetail.value[0]?.ar[0]?.name,
      id: ids,
      picUrl: songdetail.value[0]?.al.picUrl
    })
  }
}
// 控制图片是否旋转
watch(
  playFlag,
  async () => {
    await nextTick()
    const el = document.querySelector('.img-com') as HTMLImageElement
    if (playFlag.value) {
      el.style.animationPlayState = 'running'
    } else {
      el.style.animationPlayState = 'paused'
    }
  },
  { immediate: true }
)
// 上下切换歌曲
watch(index, async () => {
  const id = currentPlay.value[index.value].id
  // 防止因为切换歌曲,从其他页面跳转过来
  if ($route.path === '/play') $router.push({ path: 'play', query: { id } }) // 虽然路由更新但参数未更新
  getDetail(false, id)
})
// @ts-ignore
onActivated(() => {
  getDetail(true, $route.query.id as string)
})

const back = () => {
  $router.push('/')
}
</script>

<template>
  <div class="animt-css3">
    <!-- 背景模糊盒子 -->
    <div
      class="bgcurl"
      :style="{
        background: `url(${songdetail[0]?.al.picUrl}?param=100y100)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    ></div>
    <!-- 歌曲名称 -->
    <div class="title">
      <van-icon class="back" name="down" @click="back" />
      <div class="content">
        <p class="name">{{ songdetail[0]?.name }}</p>
        <p class="text">{{ songdetail[0]?.ar[0]?.name }}</p>
      </div>
      <van-icon name="share-o" />
    </div>
    <!-- 音量控制组件 -->
    <volume />
    <!-- 图片旋转组件 -->
    <div class="img-rotate" ref="imgrotate">
      <img-com :url="songdetail[0]?.al.picUrl" size="200"></img-com>
    </div>
    <!-- 进度条--播放组件 -->
    <div class="controller">
      <playcont></playcont>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bgcurl {
  width: 100%;
  height: 100%;
  filter: blur(50px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.animt-css3 {
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .content {
    p {
      width: 100%;
      text-align: center;
      line-height: 20px;
      color: #fff;
      font-size: 14px;
    }
    p.text {
      font-size: 12px;
      color: #aaa;
    }
  }
  .van-icon.back {
    transform: rotate(90deg);
  }
}
.img-rotate {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .img-com {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    animation: imgrotate infinite 10s linear;
  }
}
.controller {
  height: 100px;
  position: relative;
}

@keyframes imgrotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
