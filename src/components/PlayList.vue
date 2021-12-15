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
const tipsText = ref('列表循环')
const progerssAudioLength = computed(
  () => $store.state.audio.progerssAudioLength
) // 总长度

const mode = computed(() => $store.state.audio.mode) // 播放模式

const volume = computed(() => $store.state.audio.volume) // 音量

const currentPlay = computed(() => $store.state.audio.currentPlay) // 当前音乐列表

const index = computed(() => $store.state.audio.index) // 当前音乐在播放列表中的索引

const setCurrentLen = computed(() => $store.state.audio.setCurrentLen) // 用户手动设置播放长度

const currentPlayLen = computed(() => $store.state.audio.currentPlayLen) // 播放列表长度

// 播放模式
const modeChange = () => {
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

// 退出播放列表
const show = (e: any) => {
  if (e.target.className === 'playlist') $store.commit('setShowPlayList')
}

// 点击播放
const play = (index: number) => {
  $store.commit('setIndex', index)
}

// 点击删除歌曲
const del = (i: number) => {
  if (index.value === i && currentPlayLen.value === 1) {
    // 只有一首歌曲
    $store.commit('resAudio') // 清空audio
    $store.commit('setShowPlayList') // 不显示播放列表
  }
  if (index.value === i && currentPlayLen.value === index.value + 1) {
    // 删除最后一个歌曲
    $store.commit('setCurrentPlayRef', i)
    $store.commit('setIndex', 0)
    return
  }
  $store.commit('setCurrentPlayRef', i)
}
</script>

<template>
  <div class="playlist" @click="show($event)">
    <div class="list">
      <div class="top">
        <p class="curren">
          当前播放<span>({{ currentPlayLen }})</span>
        </p>
        <p class="icon" @click="modeChange">
          <svg-icon
            :name="mode === 1 ? 'sjbf' : mode === 0 ? 'lbbf' : 'dqxh'"
            style="font-size: 18px"
          />
          <span>{{ tipsText }}</span>
        </p>
      </div>

      <ul>
        <li v-for="(item, i) in currentPlay" @click="play(i)">
          <p :class="index === i ? 'current' : ''">
            <svg-icon name="td" v-if="index === i"></svg-icon>
            {{ item.name }} - <span>{{ item.songName }}</span>
          </p>
          <van-icon name="cross" @click.stop="del(i)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.playlist {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10000;
  .list {
    width: 90%;
    height: 400px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    border-radius: 20px;
    padding: 20px 14px;
    box-sizing: border-box;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20px;
      .curren {
        font-weight: 700;
        span {
          color: #aaa;
          font-size: 12px;
        }
      }
      .icon {
        display: flex;
        align-items: center;
        span {
          margin-left: 4px;
        }
      }
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 40px;
        p {
          font-size: 14px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .current {
          color: #f43319;
          span {
            color: #f43319;
          }
        }
        span {
          font-size: 12px;
          color: #aaa;
        }
      }
    }
  }
}
</style>
