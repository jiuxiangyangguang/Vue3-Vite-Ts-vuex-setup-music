<!--
 * @Author: c
 * @Date: 2021-12-02 14:17:53
 * @LastEditTime: 2021-12-05 20:03:37
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\components\AudioBar.vue
 * 版权声明
-->
<script setup lang="ts">
import { reactive, ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { getMusicDetail } from '@/api/music'
interface MusicList {
  id: string
  name: string
  url: string
}
const $store = useStore()
const audioDom = ref<any>(null) // 音频标签
const playFlag = computed(() => $store.state.audio.playFlag) // 是否播放
const progerssAudioLength = computed(
  () => $store.state.audio.progerssAudioLength
) // 总长度

const mode = computed(() => $store.state.audio.mode) // 播放模式

const volume = computed(() => $store.state.audio.volume) // 音量

const currentPlay = computed(() => $store.state.audio.currentPlay) // 当前音乐列表

const resources = ref('') // 当前播放url

const index = computed(() => $store.state.audio.index) // 当前音乐在播放列表中的索引

const setCurrentLen = computed(() => $store.state.audio.setCurrentLen) // 用户手动设置播放长度

const currentPlayLen = computed(() => $store.state.audio.currentPlayLen) // 播放列表长度

// 原生开始播放
const audioPlay = () => {
  audioDom.value.volume = volume.value // 设置音量
  $store.commit('setPlayFlag', true)
  $store.commit('setDurationAudioLength', audioDom.value.duration)
}

// 原生暂停播放
const audioPause = () => {
  $store.commit('setPlayFlag', false)
}

// 原生结束播放
const ended = () => {
  let value = index.value + 1
  if (mode.value === 2) {
    $store.commit('setCurrentAudioLength', 0)
    $store.commit('setPlayFlags')
  } else {
    if (mode.value === 1) {
      value = Math.floor(Math.random() * currentPlayLen.value)
    }
    $store.commit('setIndex', value)
  }
}

// 音乐播放中
const timeupdate = () => {
  $store.commit('setCurrentAudioLength', audioDom.value.currentTime)
}
// 当前播放
watch(
  [currentPlay, index],
  () => {
    resources.value = `https://music.163.com/song/media/outer/url?id=${
      currentPlay.value[index.value]?.id
    }.mp3`
    // getMusicDetailData()
  },
  { deep: true, immediate: true }
)
// 监听播放
watch(
  playFlag,
  async () => {
    await nextTick()
    if (playFlag.value) {
      audioDom.value.play()
    } else {
      audioDom.value.pause()
    }
  },
  { immediate: true }
)
watch(volume, () => {
  audioDom.value.volume = volume.value
})
// 监听进度条
watch(setCurrentLen, () => {
  audioDom.value.currentTime = setCurrentLen.value
})
</script>

<template>
  <audio
    controls
    autoplay
    style="display: none"
    @play="audioPlay"
    @pause="audioPause"
    @ended="ended"
    @timeupdate="timeupdate"
    ref="audioDom"
    :src="resources"
  ></audio>
</template>

<style lang="less" scoped></style>
