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
</script>

<template>
  <div class="playlist">784156</div>
</template>

<style lang="less" scoped></style>
