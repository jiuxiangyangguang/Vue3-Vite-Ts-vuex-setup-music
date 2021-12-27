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
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const $store = useStore()

const $route = useRoute()

const $router = useRouter()

const playFlag = computed(() => $store.state.audio.playFlag) // 是否播放

const currentRate = ref(0)

const currentAudioLength = computed(() => $store.state.audio.currentAudioLength) // 当前播放长度

const durationAudioLength = computed(
  () => $store.state.audio.durationAudioLength
) // 音乐播放长度

const currentPlay = computed(() => $store.state.audio.currentPlay) // 当前音乐列表

const index = computed(() => $store.state.audio.index) // 当前音乐在播放列表中的索引

// 音乐播放中

// 控制播放暂停
const play = () => {
  $store.commit('setPlayFlags')
}

// 跳转音乐页
const jump = () => {
  $router.push({
    path: 'play',
    query: {
      id: currentPlay.value[index.value].id
    }
  })
}

// 打开歌曲列表
const showList = () => {
  $store.commit('setShowPlayList')
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
// 控制图片是否旋转
watch(
  playFlag,
  async () => {
    await nextTick()
    const el = document.getElementById('imgcom') as HTMLElement
    if (!el) return // 盒子不显示时不需要播放动画
    if (playFlag.value) {
      el.style.animationPlayState = 'running'
    } else {
      el.style.animationPlayState = 'paused'
    }
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="audio-box"
    v-if="currentPlay.length > 0"
    :style="{ bottom: $route?.matched[0]?.path === '/' ? '50px' : '0px' }"
  >
    <div class="leftbox" @click="jump">
      <div class="bgc">
        <img-com
          id="imgcom"
          :url="currentPlay[index]?.picUrl"
          size="200"
        ></img-com>
      </div>
      <p>
        {{ currentPlay[index]?.songName }}-
        <span>{{ currentPlay[index]?.name }}</span>
      </p>
    </div>

    <div class="icon">
      <van-circle
        v-model:current-rate="currentRate"
        :rate="(currentAudioLength * 100) / durationAudioLength"
        size="30px"
        color="#fc3b41"
        layer-color="#ebedf0"
        :stroke-width="60"
      />
      <van-icon :name="!playFlag ? 'play' : 'pause'" @click="play" />
      <svg-icon name="bflb" style="font-size: 18px" @click="showList" />
    </div>
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
  box-sizing: border-box;
  .leftbox {
    display: flex;
    width: 80%;
    align-items: center;
    span {
      color: #aaa;
    }
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
  .icon {
    width: 20%;
    font-size: 20px;
    position: relative;
    display: flex;
    align-items: center;
    .van-icon {
      position: absolute;
      left: 7px;
      font-size: 16px;
    }
    svg {
      color: #000;
      margin-left: 10px;
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
