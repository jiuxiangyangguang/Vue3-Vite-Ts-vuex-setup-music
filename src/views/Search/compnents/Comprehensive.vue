<script setup lang="ts">
import { computed, onActivated, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/hooks/useStore'
const $route = useRoute()
const $router = useRouter()
const $store = useStore()
const flag = ref<boolean>(false) // 等待框
const songlist = ref()
interface Song {
  name: string
  id: number
  al: AL
  ar: Array<AR>
}
interface AL {
  id: number
  name: string
  picUrl: string
}
interface AR {
  id: number
  name: string
}
interface PlayListS {
  name: string
  id: number
  coverImgUrl: string
  trackCount: number
  playCount: number
}
interface MlogList {
  moreText?: string
  resources?: []
}
interface PlayList {
  moreText?: string
  playLists?: Array<PlayListS>
}
interface SongList {
  moreText?: string
  songs?: Array<Song>
}
const props = defineProps<{
  songList: SongList
  playList: PlayList
  new_mlog: MlogList
}>()

watch(
  () => props.songList,
  () => {
    flag.value = true
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
</script>

<template>
  <div class="animt">
    <!-- 单曲列表 -->
    <div class="song" v-show="flag">
      <h2>
        单曲 <span><van-icon name="play-circle-o" />播放</span>
      </h2>
      <ul>
        <li v-for="item in songList.songs" @click="jump(item.id)">
          <div class="left">
            <p class="songname">{{ item.name }}</p>
            <p class="arname">
              <svg-icon
                class="svg"
                name="wus"
                style="font-size: 20px"
              ></svg-icon
              >{{ item.ar[0].name }}-{{ item.al.name }}
            </p>
          </div>
          <svg-icon class="svg" name="ms" style="color: #fc716d"></svg-icon>
        </li>
      </ul>
    </div>
    <!-- 歌单列表 -->
    <div class="playList" v-show="flag">
      <h2>歌单</h2>
      <ul>
        <li v-for="item in playList.playLists">
          <img-com :url="item.coverImgUrl" size="100" skeleton></img-com>
          <div class="rightbox">
            <p>{{ item.name }}</p>
            <p class="text">
              {{ item.trackCount }}首,播放{{ item.playCount / 10000 }}万次
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="loding" v-show="!flag">
      <img src="../../../assets/icon/mss.gif" alt="" />
      <span>正在加载...</span>
    </div>
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
}
.song {
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
    padding: 0 10px;
    li {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #eee;
      position: relative;

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
.playList {
  margin: 10px auto;
  width: 90%;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #eee;
  h2 {
    padding: 10px;
  }
  ul {
    padding: 0 10px;
    li {
      display: flex;
      align-items: center;
      margin: 10px 0;
      font-size: 14px;
      position: relative;
      &::before {
        content: '';
        display: block;
        margin: 0 auto;
        width: 30px;
        height: 4px;
        border-radius: 8px 8px 0 0;
        background-color: #eee;
        position: absolute;
        top: -3px;
        left: 20px;
        transform: translateX(-50%);
      }
      :deep(.img-com) {
        margin-right: 10px;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        overflow: hidden;
        z-index: 1;
      }
      p {
        line-height: 20px;
      }
      p.text {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
}

.loding {
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
