<script setup lang="ts">
import { computed, onActivated, ref, watch } from 'vue'
import { Notify } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { getMultimatch } from '@/api/music'
import useTime from '@/hooks/useTime'
import useStore from '@/hooks/useStore'
// import SeachHomeVue from './compnents/SeachHome.vue'
// import SearchTabs from './compnents/SearchTabs.vue'
import { dir, log } from 'console'
const $router = useRouter()
const $store = useStore()
const cord = ref()
const emit = defineEmits(['loadMore'])
const flag = ref<boolean>(false) // 等待框
const lodingFlag = ref<boolean>(false) // 加载框
const currentPlay = computed(() => $store.state.audio.currentPlay) // 当前列表
interface SongS {
  name: string
  id: number
  album: ALB
  artists: Array<ART>
}
interface ALB {
  id: number
  name: string
}
interface ART {
  id: number
  name: string
}
const props = defineProps({
  currensongList: {
    type: Array as () => Array<SongS>,
    default: []
  }
})
const touchEnd = () => {
  // 卷入的高度在父盒子身上
  const scrollHeight = cord.value.scrollHeight
  const clientHeight = cord.value.clientHeight
  const scrollTop = cord.value.scrollTop

  if (props.currensongList.length + 30 >= 120) {
    Notify({ type: 'warning', message: '没有更多咯' })
    return
  }
  if (scrollHeight - clientHeight - scrollTop <= 5) {
    lodingFlag.value = true
    emit('loadMore', props.currensongList.length + 30)
  }
}
watch(
  () => props.currensongList,
  () => {
    flag.value = true
    lodingFlag.value = false
  },
  { deep: true }
)
// 跳转音乐页
const jump = (id: number) => {
  $router.push({
    path: 'play',
    query: {
      id
    }
  })
}
// 不跳转页面添加歌曲
const addSong = (item: any) => {
  const index = currentPlay.value.findIndex((song) => song.id === item.id)
  const obj = {
    name: item.name,
    songName: item.artists[0].name,
    picUrl: item.album.picUrl,
    id: item.id
  }
  const param = index === -1 ? obj : index
  $store.commit(index === -1 ? 'setCurrentPlay' : 'setIndex', param)
}
</script>

<template>
  <div class="animt" ref="cord" v-show="flag">
    <div class="cord" @touchend="touchEnd()">
      <h2>
        单曲 <span><van-icon name="play-circle-o" />播放</span>
      </h2>
      <ul>
        <li v-for="item in currensongList" @click="jump(item.id)">
          <div class="left">
            <p class="songname">{{ item.name }}</p>
            <p class="arname">
              <svg-icon
                class="svg"
                name="wus"
                style="font-size: 20px"
              ></svg-icon
              >{{ item.artists[0].name }}-{{ item.album.name }}
            </p>
          </div>
          <svg-icon
            class="svg"
            name="ms"
            style="color: #fc716d"
            @click.stop="addSong(item)"
          ></svg-icon>
        </li>
        <div class="loding" v-show="lodingFlag && currensongList.length">
          <img src="../../../assets/icon/mss.gif" alt="" />
          <span>正在加载...</span>
        </div>
      </ul>
    </div>
  </div>
  <div class="lodings" v-show="!flag">
    <img src="../../../assets/icon/mss.gif" alt="" />
    <span>正在加载...</span>
  </div>
</template>

<style lang="less" scoped>
.animt {
  height: 100%;
  height: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .cord {
    margin: 10px auto;
    width: 90%;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 #eee;
    h2 {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      span {
        font-weight: normal;
        font-size: 12px;
        padding: 4px 4px 4px 6px;
        border: 1px solid #eee;
        border-radius: 20px;
      }
    }
    ul {
      padding: 0 10px 30px 10px;
      .loding {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 4px;
        img {
          width: 20px;
        }
        span {
          font-size: 14px;
        }
      }
      li {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #eee;
        .songname {
          font-size: 14px;
          line-height: 20px;
        }
        .arname {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          font-size: 12px;
          color: #aaa;
        }
        & > svg {
          flex: 0 0 24px;
          padding: 4px;
          border-radius: 10px;
          background-color: #eee;
          font-size: 24px;
          box-sizing: border-box;
        }
      }
      li:last-child {
        border-bottom: 1px solid #eee;
      }
    }
  }
}
.lodings {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10000;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  img {
    width: 20px;
  }
  span {
    font-size: 14px;
  }
}
</style>
