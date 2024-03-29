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
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { getUrl, getLikeMusic, getMusicComment } from '@/api/music'
import { Toast } from 'vant'
import useTime from '@/hooks/useTime'
const $store = useStore()

const tipsText = ref('') // 播放模式提示

const showNotify = ref(false) // 播放模式提示框

const collection = ref() // 爱心DOM

const likeArr = computed(() => $store.state.userInfo.likeArr) // 喜欢的音乐列表

const playFlag = computed(() => $store.state.audio.playFlag) // 是否播放

const index = computed(() => $store.state.audio.index) // 当前播放索引

const mode = computed(() => $store.state.audio.mode) // 当前播放模式

const progressIcon = computed(() => $store.state.skin.progress) // 当前用户选选择的图标

const lineColor = computed(() => $store.state.skin.lineColor) // 当前用户选择颜色

const currentPlay = computed(() => $store.state.audio.currentPlay) // 当前播放列表

const currentLength = computed(() => $store.state.audio.currentAudioLength) // 当前长度

const durationLength = computed(() => $store.state.audio.durationAudioLength) // 总长度

const speed = ref() // 是进度条

const dot = ref() // 是进度条

const progress = ref() // 进度条外壳

const flag = ref(false) // 进度条外壳

const len = ref(0) // 手动偏移进度条

const lineTotalLen = ref(0) // 进度条长度

const updomnShow = ref(false) // 是否显示下载盒子

const time = useTime()

const showLove = computed(() =>
  likeArr.value.some(
    (item: number) => item === currentPlay.value[index.value].id
  )
) // 喜欢歌曲

// 控制播放暂停
const play = () => {
  $store.commit('setPlayFlags')
}

// 爱心
const anim = async () => {
  collection.value.classList.add('anim-one')
  setTimeout(() => {
    collection.value.classList.remove('anim-one')
  }, 500)

  const ev = showLove.value ? 'setlikeArrRef' : 'setlikeArrAdd'
  $store.commit(ev, currentPlay.value[index.value].id)

  await getLikeMusic({
    like: showLove.value,
    id: currentPlay.value[index.value].id
  })
}

// 下载音乐
const urlDownload = async (br: 320000 | 128000 | 999000) => {
  const { data }: any = await getUrl({
    id: currentPlay.value[index.value].id,
    br
  })
  updomnShow.value = false
  if (!data.url) {
    Toast.fail('当前歌曲不支持下载')
  } else {
    fetch(data.url)
      .then((res) => res.blob())
      .then((blob) => {
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.style.display = 'none'
        const url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = `${currentPlay.value[index.value].name}-${
          currentPlay.value[index.value].songName
        }.mp3`
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      })
    $store.commit('setLocalMusic', currentPlay.value[index.value])
  }
}

// 查看评论
const getComment = async () => {
  await getMusicComment({
    id: currentPlay.value[index.value].id,
    limit: 30
  })
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
  $store.commit('setIndex', index.value - 1)
}

// 下一首
const next = () => {
  $store.commit('setIndex', index.value + 1)
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

// 播放列表
const show = () => {
  $store.commit('setShowPlayList')
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
  <div class="mask" @click="updomnShow = false" v-if="updomnShow">
    <div class="updomn" @click.stop>
      <div class="title">请选择下载音质</div>
      <p @click="urlDownload(128000)">标准</p>
      <p @click="urlDownload(320000)">较高</p>
      <p @click="urlDownload(999000)">极高(无损)</p>
    </div>
  </div>
  <!-- 下载,收藏,评论 -->
  <div class="collection" ref="collection">
    <van-icon
      name="like"
      :color="showLove ? '#ff5345' : '#eee'"
      @click="anim"
    />
    <van-icon
      name="upgrade"
      color="#fff"
      :style="{ transform: 'rotate(180deg)' }"
      @click="updomnShow = true"
    />
    <van-icon name="chat-o" color="#fff" @click="getComment" />
  </div>

  <!-- 进度条 -->
  <div class="progressbar">
    <span class="text">{{ time.getMS(currentLength) }}</span>
    <div class="progress" ref="progress">
      <div class="speed" ref="speed"></div>
      <div class="dot" ref="dot" @touchmove="touchmove" @touchend="touchend">
        <svg-icon :name="progressIcon" />
      </div>
    </div>
    <span class="text">{{ time.getMS(durationLength) }}</span>
  </div>

  <!-- 播放控制 -->
  <div class="icon">
    <svg-icon
      :name="mode === 1 ? 'sjbf' : mode === 0 ? 'lbbf' : 'dqxh'"
      :style="{ fontSize: '18px', color: lineColor }"
      @click="modeChange"
    />
    <svg-icon name="prev" @click="prev" />
    <van-icon
      @click="play"
      :name="!playFlag ? 'play-circle-o' : 'pause-circle-o'"
    />
    <svg-icon name="next" @click="next" />
    <svg-icon name="bflb" style="font-size: 18px" @click="show" />
  </div>

  <!-- 模式提示框 -->
  <div class="msak" v-show="showNotify">{{ tipsText }}</div>
</template>

<style lang="less" scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.1);
}
.updomn {
  position: fixed;
  width: 90%;
  background-color: #fff;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  box-sizing: border-box;
  .title {
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    line-height: 40px;
    font-size: 14px;
  }
}
.collection {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  .van-icon {
    margin: 0 8px;
  }
}
.progressbar {
  display: flex;
  justify-content: center;
  align-items: center;
  .progress {
    width: 70%;
    height: 2px;
    background-color: #aaa;
    margin: 0 16px;
    position: relative;
    .speed {
      width: 0;
      background-color: v-bind(lineColor);
      height: 100%;
    }
    .dot {
      width: 16px;
      height: 16px;
      position: absolute;
      top: -8px;
      transform: translateX(-50%);
    }
  }
  .text {
    font-size: 12px;
    color: #fff;
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
    color: #fff;
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
  .van-icon.van-icon-like {
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
