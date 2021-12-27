<script lang="ts">
export default {
  // name: 'my'
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import useStore from '@/hooks/useStore'
import { useRouter } from 'vue-router'
import { Dialog, Notify } from 'vant'

const $store = useStore()

const $router = useRouter()

const progress = computed(() => $store.state.skin.progress) // 当前用户选选择的图标

const lineColor = computed(() => $store.state.skin.lineColor) // 当前用户选选择的颜色

const mode = computed(() => $store.state.audio.animation.mode) // 当前动效

const flag = computed({
  get() {
    return $store.state.audio.animation.flag
  },
  set(value) {
    $store.commit('setAntFlag', value)
  }
}) // 当前是否开启动效

const iconArr = ['hhua', 'gtx', 'ljr', 'mgdz', 'zzx']
const colorArr = ['#ff5345', '#8d13a4', '#f16325', '#76e3de', 'zzx']
const modeArr = ['circlewave', 'circlebar']
// 设置进度条图标
const setIcon = (icon: string) => {
  $store.commit('setSkinIcon', { name: 'progress', data: icon })
}
// 设置颜色
const setcolor = (icon: string) => {
  $store.commit('setSkinIcon', { name: 'lineColor', data: icon })
}
// 设置动效
const modeChange = (mode: string) => {
  if (flag.value) {
    $store.commit('setAntMode', mode)
    Notify({ type: 'warning', message: '音乐动效目前处于测试阶段' })
  } else {
    Dialog.confirm({
      message: '是否开启音乐动画,该功能处于实验阶段'
    }).then(() => {
      $store.commit('setAntFlag', true)
    })
  }
}
</script>

<template>
  <div class="skin">
    <div class="top-box">
      <van-icon name="down" @click="$router.go(-1)" /> 个性装扮
    </div>
    <div class="card">
      <div class="title">
        <p>进度条图标<span>个性装扮,与众不同</span></p>
        <van-icon name="fire" color="#ee0a24" />
      </div>
      <ul class="icon">
        <li
          v-for="item in iconArr"
          :class="{ active: progress === item }"
          @click="setIcon(item)"
        >
          <svg-icon :name="item" style="font-size: 30px"></svg-icon>
          <div class="flag" v-show="progress === item">
            <svg-icon name="bj" class="bj"></svg-icon>
          </div>
        </li>
      </ul>
    </div>

    <div class="card">
      <div class="title">
        <p>全局颜色<span>进度条,提示框</span></p>
        <van-icon name="fire" color="#ee0a24" />
      </div>
      <ul class="icon">
        <li
          v-for="item in colorArr"
          :class="{ active: lineColor === item }"
          :style="{ backgroundColor: item }"
          @click="setcolor(item)"
        >
          <div class="flag" v-show="lineColor === item">
            <svg-icon name="bj" class="bj"></svg-icon>
          </div>
        </li>
      </ul>
    </div>

    <div class="card">
      <div class="title">
        <p>
          播放动效<span :style="{ color: '#fe010d' }"
            >实验阶段部分歌曲不支持</span
          >
        </p>
        <van-switch
          v-model="flag"
          size="16"
          active-color="#ee0a24"
          inactive-color="#dcdee0"
        />
      </div>
      <ul class="icon">
        <li
          v-for="item in modeArr"
          :class="{ active: mode === item }"
          :style="{ backgroundColor: item }"
          @click="modeChange(item)"
        >
          <p>{{ item === 'circlewave' ? '动感圆波' : '跳动节奏' }}</p>
          <div class="flag" v-show="mode === item">
            <svg-icon name="bj" class="bj"></svg-icon>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less">
.skin {
  height: 100%;
  background-color: #eee;
  .top-box {
    padding: 4px 10px;
    background-color: #fff;
    display: flex;
    height: 30px;
    line-height: 30px;
    .van-icon {
      transform: rotate(90deg);
      font-size: 20px;
      margin-right: 16px;
    }
  }
  .card {
    width: 94%;
    margin: 10px auto;
    background-color: #fff;
    padding: 4px;
    border-radius: 10px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 40px;
      font-size: 16px;
      margin-left: 4px;
      font-weight: 700;
      span {
        font-weight: normal;
        font-size: 12px;
        color: #aaa;
        margin-left: 4px;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 8px;
      li {
        width: 60px;
        height: 80px;
        margin: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 0 4px #ccc;
        position: relative;
        box-sizing: border-box;
        p {
          text-align: center;
          font-size: 14px;
          padding: 0 10px;
          line-height: 20px;
        }
        .flag {
          height: 16px;
          width: 16px;
          font-size: 10px;
          position: absolute;
          bottom: -1px;
          right: -1px;
          border-radius: 100% 0% 60% 40% / 100% 40% 60% 0%;
          background-color: #fe010d;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #fe010d;
          border: 0;
          z-index: 1000;
          .bj {
            transform: translate(1px, 1px);
          }
        }
      }
      .active {
        border: 1px solid #fe010d;
        box-shadow: 0 0 0px #fff;
      }
    }
  }
}
</style>
