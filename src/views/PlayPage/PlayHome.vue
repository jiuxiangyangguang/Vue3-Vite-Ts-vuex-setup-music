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
import { getMusicDetail, getMusicUrl } from '@/api/music'
import useStore from '@/hooks/useStore'
import playcont from './compnents/PlayCont.vue'
import volume from './compnents/Volume.vue'
import lyricCom from './compnents/LyricCom.vue'
import url from '../../assets/muu.mp3'
//@ts-ignore
import Vudio from 'vudio'

const $route = useRoute()

const $router = useRouter()

const songdetail = ref<Array<Song>>([])

const vudio = ref()

const $store = useStore()

const imgrotate = ref(null) // 旋转img

const playFlag = computed(() => $store.state.audio.playFlag) // 是否播放

const flag = computed(() => $store.state.audio.animation.flag) // 是否开启动效

const mode = computed(() => $store.state.audio.animation.mode) // 动效模式

const index = computed(() => $store.state.audio.index) // 当前播放索引

const currentPlay = computed(() => $store.state.audio.currentPlay) // 当前播放列表

const currentPlaylen = computed(() => $store.state.audio.currentPlayLen) // 当前播放列表

const imgBoxShow = ref<boolean>(true) // 切换图片歌词显示

// 获取歌曲详情
const getDetail = async (flag: boolean, ids: number | string) => {
  const data: any = await getMusicDetail({ ids })
  songdetail.value = data?.songs

  // 判断歌单列表存不存在该歌曲
  currentPlay.value.forEach((item, i) => {
    if (item.id === Number(ids)) {
      $store.commit('setIndex', i)
      flag = false
    }
  })

  if (flag) {
    // 向歌曲列表添加歌曲
    $store.commit('setCurrentPlay', {
      name: songdetail.value[0]?.name,
      songName: songdetail.value[0]?.ar[0]?.name,
      id: Number(ids), // 一定要存储数字类型
      picUrl: songdetail.value[0]?.al.picUrl
    })
  }
}

// 动效函数
const vudioFun = async (url: string) => {
  if (!vudio.value) {
    await nextTick()
    const audioObj = document.querySelector('#audio')
    const canvasObj = document.querySelector('#canvas')
    vudio.value = new Vudio(audioObj, canvasObj, {
      effect: mode.value, // waveform, circlewave, circlebar, lighting (4 visual effect)
      accuracy: 128, // number of freqBar, must be pow of 2.
      circlewave: {
        maxHeight: 80, // max waveform bar height
        minHeight: 1, // min waveform bar height
        circleRadius: 100,
        fadeSide: false,
        maxParticle: 100,
        shadowBlur: 0,
        shadowColor: 'rgba(244,244,244,1)'
      },
      circlebar: {
        maxHeight: 80, // max waveform bar height
        minHeight: 1, // min waveform bar height
        circleRadius: 100,
        fadeSide: false,
        maxParticle: 100,
        shadowBlur: 0,
        shadowColor: 'rgba(244,244,244,1)'
      }
    })
  }

  fetch(url) // 请求资源
    .then((res) => res.blob())
    .then((file) => {
      const fr = new FileReader()
      if (file.type.indexOf('audio') !== 0) return
      fr.onload = function (evt) {
        //@ts-ignore
        vudio.value.audioSrc.src = evt.target.result
        vudio.value.audioSrc.play()
        vudio.value.dance()
      }
      fr.readAsDataURL(file)
    })
  // // pause as you wish
  // vudio.pause()
}

// 查看是否可以下载
const isdown = async () => {
  if (!flag.value) return // 记录可以动效播放的音乐
  // 获取音乐`url
  const { data }: any = await getMusicUrl({
    id: currentPlay.value[index.value].id
  })
  $store.commit('setLocalMusic', currentPlay.value[index.value])
  if (data[0].url) {
    vudioFun(data[0].url) // 开启动效动画
  }
}

// 切换歌词显示
const showlyric = () => {
  imgBoxShow.value = !imgBoxShow.value
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

// 上下切换歌曲,歌单列表变化
watch([index, currentPlaylen], async () => {
  if (currentPlaylen.value === 0) {
    $router.push('/')
    return
  }
  const id = currentPlay.value[index.value].id
  // 防止因为切换歌曲,从其他页面跳转过来   使用replace来替换历史记录,方便返回上一级
  if ($route.path === '/play') $router.replace({ path: 'play', query: { id } }) // 虽然路由更新但参数未更新
  getDetail(false, id)

  isdown() // 运行动效
})

// 监听音乐动效变化
watch(mode, () => {
  vudio.value.setOption({
    effect: mode.value
  })
})
// @ts-ignore
onActivated(() => {
  getDetail(true, $route.query.id as string)
})

const back = () => {
  $router.go(-1)
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
    <div class="img-rotate" ref="imgrotate" v-show="imgBoxShow">
      <audio id="audios"></audio>
      <canvas id="canvas"></canvas>
      <img-com
        :url="songdetail[0]?.al.picUrl"
        size="200"
        @click="showlyric"
      ></img-com>
    </div>

    <!-- 歌词组件 -->
    <div style="flex: 1" v-show="!imgBoxShow">
      <lyric-com @showlyric="showlyric" />
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
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .img-com {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    animation: imgrotate infinite 10s linear;
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
.controller {
  height: 100px;
  position: relative;
}
#canvas {
  width: 100%;
  height: 100%;
}
@keyframes imgrotate {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
