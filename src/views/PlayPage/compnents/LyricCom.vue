<!--
 * @Author: c
 * @Date: 2021-12-02 11:19:00
 * @LastEditTime: 2021-12-02 13:52:49
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\views\PlayPage\ImgRotate.vue
 * 版权声明
-->
<script setup lang="ts">
import { computed, onActivated, ref, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMusicLyric } from '@/api/music'
import useStore from '@/hooks/useStore'
const $route = useRoute()
const $router = useRouter()
const $store = useStore()

const ul = ref() // 获取ul DOM

const currentAudioLength = computed(() => $store.state.audio.currentAudioLength) // 当前播放长度

const lyrics = ref<Array<Lyric>>([]) // 歌词对象列表

const currentPlayIndex = ref(0) // 当前播放索引

const index = computed(() => $store.state.audio.index) // 当前播放索引

const currentPlay = computed(() => $store.state.audio.currentPlay) // 当前列表

const currentPlayLen = computed(() => $store.state.audio.currentPlayLen) // 当前列表

const lineColor = computed(() => $store.state.skin.lineColor) // 当前用户选择颜色

const emit = defineEmits(['showlyric'])

// 获取歌词
const getLyric = async (id: string | number) => {
  const {
    lrc: { lyric: lyric }
  }: any = await getMusicLyric({ id })
  const arr: Array<Lyric> = []
  lyric.split('\n').forEach((item: any) => {
    // 转换时间
    const time = Number(item.slice(1, 3) * 60) + Number(item.slice(4, 6))
    // 转换歌词
    const index = item.indexOf(']')
    arr.push({
      time: time,
      text: item.slice(index + 1, item.length)
    })
  })
  lyrics.value = arr
}

watch(currentAudioLength, (newV, lodV) => {
  const index = lyrics.value.findIndex((item) => item.time === Math.floor(newV))
  if (index !== -1) currentPlayIndex.value = index
})

// 监听歌词索引变化
watch(currentPlayIndex, async () => {
  // await nextTick()
  if ($route.path !== '/play') return // 不在播放页面不需要操作歌词

  const top = currentPlayIndex.value
  const span = document.querySelectorAll('li span') as NodeListOf<HTMLLIElement>
  span.forEach((item) => {
    item.style.transition = `background-size 0s linear`
    item.style.backgroundSize = '0'
  })
  //@ts-ignore
  const time = lyrics.value[top + 1].time - lyrics.value[top].time

  span[top].style.transition = `background-size ${time}s linear`
  span[top].style.backgroundSize = '100%'
  ul.value.style.top = `-${top * 40}px`
})

// 更新歌词
watch([currentPlayLen, index, currentPlay], () => {
  if (!currentPlayLen.value) return
  currentPlayIndex.value = 0 // 重置歌曲索引
  getLyric(currentPlay.value[index.value].id as number)
})

getLyric($route.query.id as string)
</script>

<template>
  <!-- 歌词组件 -->
  <div class="lyric" @click="emit('showlyric')">
    <ul ref="ul">
      <li v-for="item in lyrics">
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.lyric {
  height: 100%;
  overflow: scroll;
  position: relative;
  padding: 10px 0;
  box-sizing: border-box;
  ul {
    width: 100%;
    position: absolute;
    top: 0;
    box-sizing: border-box;
    transition: top 0.5s linear;
    transform: translateY(34vh);
  }
  li {
    text-align: center;
    height: 40px;
    padding: 10px 4px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: center;
    span {
      line-height: 20px;
      background: #ffffff -webkit-linear-gradient(
          left,
          v-bind(lineColor),
          v-bind(lineColor)
        ) no-repeat 0 0;
      background-size: 0;
      -webkit-background-clip: text;
      color: transparent;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
}
</style>
