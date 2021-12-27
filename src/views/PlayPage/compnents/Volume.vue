<!--
 * @Author: c
 * @Date: 2021-12-02 14:17:53
 * @LastEditTime: 2021-12-03 11:42:24
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\views\PlayPage\PlayCont.vue
 * 版权声明
-->
<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
const $store = useStore()

const speed = ref() // 是进度条

const volume = computed(() => $store.state.audio.volume) // 音量

const dot = ref() // 是进度点

const progress = ref() // 音量条外壳

const len = ref(0) // 手动偏移进度条

const lineTotalLen = ref(0) // 进度条长度

// 控制播放暂停

// 手指在屏幕上滑动式触发
const touchmove = (e: any) => {
  const lineOffLen = progress.value.offsetLeft // 进度条距离右边长度
  lineTotalLen.value = progress.value.clientWidth // 进度条总长度
  const el = e.targetTouches[0] // 获取触摸的元素
  const ellen = el.pageX // 触摸元素距离屏幕右边距离
  len.value = ellen - lineOffLen
  if (len.value >= lineTotalLen.value) len.value = lineTotalLen.value
  if (len.value < 0) len.value = 0
  dot.value.style.left = `${len.value}px`
  speed.value.style.width = `${len.value}px`
  $store.commit('setVolume', len.value / lineTotalLen.value)
}

// 手指离开屏幕
watch(
  volume,
  async () => {
    await nextTick()
    lineTotalLen.value = progress.value.clientWidth // 进度条总长度
    len.value = lineTotalLen.value * volume.value
    dot.value.style.left = `${len.value}px`
    speed.value.style.width = `${len.value}px`
  },
  { immediate: true }
)
</script>

<template>
  <!-- 音量进度条 -->
  <div class="progressbar">
    <svg-icon
      name="volume100"
      style="color: #dcdbdb; font-size: 12px"
    ></svg-icon>
    <div class="progressbgc" ref="progress">
      <div class="progressline" ref="speed"></div>
      <div class="dot" ref="dot" @touchmove="touchmove"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.progressbar {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  :deep(.svg-icon) {
    margin-right: 4px;
  }
  .progressbgc {
    flex: 1;
    height: 2px;
    background-color: #aaa;
    position: relative;
  }
  .progressline {
    width: 0;
    height: 2px;
    background-color: #fff;
  }
  .dot {
    position: absolute;
    top: 50%;
    transform: translate(-8px, -50%);
    background-color: transparent;
    width: 6px;
    height: 6px;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;
    &:after {
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}
</style>
