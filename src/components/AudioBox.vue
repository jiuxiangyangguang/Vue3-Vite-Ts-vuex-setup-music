<!--
 * @Author: c
 * @Date: 2021-12-03 13:45:55
 * @LastEditTime: 2021-12-03 14:03:00
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\components\AudioBox.vue
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

const currentPlay = computed(() => $store.state.audio.currentPlay) // 当前音乐列表

const resources = ref('') // 当前播放url

const index = computed(() => $store.state.audio.index) // 当前音乐在播放列表中的索引

const setCurrentLen = computed(() => $store.state.audio.setCurrentLen) // 用户手动设置播放长度

// 音乐播放中
const timeupdate = () => {
  $store.commit('setCurrentAudioLength', audioDom.value.currentTime)
}
// 监听播放
watch(
  playFlag,
  () => {
    if (playFlag.value) {
    } else {
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="audio-box" v-if="currentPlay.length > 0">
    <div class="leftbox">
      <div class="bgc">
        <img-com :url="currentPlay[index]?.picUrl" size="200"></img-com>
      </div>
      <p>{{ currentPlay[index]?.songName }}/{{ currentPlay[index]?.name }}</p>
    </div>

    <van-icon name="play" />
  </div>
</template>

<style lang="less" scoped>
.audio-box {
  position: fixed;
  bottom: 50px;
  width: 100%;
  height: 40px;
  border-top: 1px solid #eee;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  .leftbox {
    display: flex;
    align-items: center;
  }
  .bgc {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    padding: 8px;
    background-color: #000;
    box-sizing: border-box;
    margin: 0 10px;
    transform: translateY(-8px);
    .img-com {
      border-radius: 50%;
      overflow: hidden;
      animation: imgrotate infinite 10s linear;
    }
    .van-icon {
    }
  }
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
