<!--
 * @Author: c
 * @Date: 2021-12-02 14:17:53
 * @LastEditTime: 2021-12-03 11:21:57
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\views\PlayPage\PlayCont.vue
 * 版权声明
-->
<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { getMusicDetail } from '@/api/music'
import { Notify } from 'vant'
import useTime from '@/hooks/useTime'
const $store = useStore()

const tipsText = ref('') // 播放模式提示

const showNotify = ref(false) // 播放模式提示框

const showLove = ref(false) // 播放模式提示

const collection = ref() // 爱心DOM

const playFlag = computed(() => $store.state.audio.playFlag) // 是否播放

const index = computed(() => $store.state.audio.index) // 当前播放索引

const mode = computed(() => $store.state.audio.mode) // 当前播放模式

const currentPlayLen = computed(() => $store.state.audio.currentPlayLen) // 当前播放列表长度

const currentLength = computed(() => $store.state.audio.currentAudioLength) // 当前长度

const durationLength = computed(() => $store.state.audio.durationAudioLength) // 总长度

const speed = ref() // 是进度条

const dot = ref() // 是进度条

const progress = ref() // 进度条外壳

const flag = ref(false) // 进度条外壳

const len = ref(0) // 手动偏移进度条

const lineTotalLen = ref(0) // 进度条长度

const time = useTime()

const play = () => {
  $store.commit('setPlayFlags')
}

// 爱心
const anim = () => {
  collection.value.classList.add('anim-one')
  showLove.value = !showLove.value
  setTimeout(() => {
    collection.value.classList.remove('anim-one')
  }, 500)
}

// 手指在屏幕上滑动式触发
const touchmove = (e: any) => {
  flag.value = true // 切换手动控制
  const lineOffLen = progress.value.offsetLeft // 进度条距离右边长度
  lineTotalLen.value = progress.value.clientWidth // 进度条总长度
  const el = e.targetTouches[0] // 获取触摸的元素
  const ellen = el.pageX // 触摸元素距离屏幕右边距离
  len.value = ellen - lineOffLen
  if (len.value >= lineTotalLen.value) len.value = lineTotalLen.value
  if (len.value < 0) len.value = 0
  dot.value.style.left = `${len.value}px`
  speed.value.style.width = `${len.value}px`
}

// 手指离开屏幕
const touchend = () => {
  flag.value = false // 切换自动控制
  // 设置播放进度
  const currentLen = (len.value / lineTotalLen.value) * durationLength.value
  $store.commit('setSetCurrentLen', currentLen)
}

// 上一首
const prev = () => {
  const num = index.value - 1
  if (num < 0) {
    $store.commit('setIndex', currentPlayLen.value - 1)
  } else {
    $store.commit('setIndex', num)
  }
}

// 下一首
const next = () => {
  const num = index.value + 1
  if (num === currentPlayLen.value) {
    $store.commit('setIndex', 0)
  } else {
    $store.commit('setIndex', num)
  }
}

// 播放模式
const modeChange = () => {
  showNotify.value = true
  setTimeout(() => {
    showNotify.value = false
  }, 2000)
  let modes = mode.value + 1 >= 3 ? 0 : mode.value + 1
  if (modes === 0) {
    tipsText.value = '列表循环'
  } else if (modes === 1) {
    tipsText.value = '随机播放'
  } else {
    tipsText.value = '单曲循环'
  }
  $store.commit('setMode', modes)
}

// 进度条自动控制
watch(currentLength, () => {
  if (flag.value) return // 手动控制就调用自动控制
  //  进度条
  const len =
    (Math.ceil(currentLength.value) * 100) / Math.ceil(durationLength.value)
  speed.value.style.width = `${len}%`
  // 小圆点
  dot.value.style.left = `${len}%`
})
</script>

<template>
  <!-- 下载,收藏,爱心 -->
  <div class="collection" ref="collection">
    <van-icon
      name="like"
      :color="showLove ? '#ff5345' : '#eee'"
      @click="anim"
    />
  </div>

  <!-- 进度条 -->
  <div class="progressbar">
    <span class="text">{{ time.getMS(currentLength) }}</span>
    <div class="progress" ref="progress">
      <div class="speed" ref="speed"></div>
      <div class="dot" ref="dot" @touchmove="touchmove" @touchend="touchend">
        <svg-icon name="hhua" />
      </div>
    </div>
    <span class="text">{{ time.getMS(durationLength) }}</span>
  </div>

  <!-- 播放控制 -->
  <div class="icon">
    <svg-icon
      :name="mode === 1 ? 'sjbf' : mode === 0 ? 'lbbf' : 'dqxh'"
      style="font-size: 18px"
      @click="modeChange"
    />
    <svg-icon name="prev" @click="prev" />
    <van-icon
      @click="play"
      :name="!playFlag ? 'play-circle-o' : 'pause-circle-o'"
    />
    <svg-icon name="next" @click="next" />
    <svg-icon name="bflb" style="font-size: 18px" />
  </div>

  <!-- 模式提示框 -->
  <div class="msak" v-show="showNotify">{{ tipsText }}</div>
</template>

<style lang="less" scoped>
.collection {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.progressbar {
  display: flex;
  justify-content: center;
  align-items: center;
  .progress {
    width: 70%;
    height: 2px;
    background-color: #aaa;
    margin: 0 4px;
    position: relative;
    .speed {
      width: 0;
      background-color: #fc3b41;
      height: 100%;
    }
    .dot {
      width: 16px;
      height: 16px;
      position: absolute;
      top: -8px;
      transform: translateX(-2px);
    }
  }
  .text {
    font-size: 12px;
    color: #aaa;
  }
}
.icon {
  display: flex;
  font-size: 40px;
  color: #fff;
  align-items: center;
  margin-top: 10px;
  padding: 0 30px;
  .svg-icon {
    flex: 1;
  }
  .van-icon {
    margin: 0 10px;
  }
}
.msak {
  position: absolute;
  background-color: #fff;
  padding: 0 10px;
  border-radius: 15px;
  height: 30px;
  line-height: 30px;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  font-size: 12px;
  transform: translate(-50%, -50%);
}
.anim-one {
  .van-icon {
    animation: heartbeat 0.5s ease infinite;
  }
}
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
