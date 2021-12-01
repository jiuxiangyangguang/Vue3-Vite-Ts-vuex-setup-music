<script setup lang="ts">
import { computed, onActivated, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMultimatch } from '@/api/music'
import useTime from '@/hooks/useTime'
import useStore from '@/hooks/useStore'
import SeachHomeVue from './compnents/SeachHome.vue'
import SearchTabs from './compnents/SearchTabs.vue'
import { dir, log } from 'console'
const $router = useRouter()
const $store = useStore()
const cord = ref()
const emit = defineEmits(['loadMore'])
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
  currenShowList: {
    type: Array as () => Array<SongS>,
    default: []
  }
})
const touchEnd = () => {
  // 卷入的高度在父盒子身上
  const scrollHeight = cord.value.scrollHeight
  const clientHeight = cord.value.clientHeight
  const scrollTop = cord.value.scrollTop

  if (clientHeight + scrollTop >= scrollHeight) {
    emit('loadMore', props.currenShowList.length + 30)
  }
}
const loadMore = () => {}
</script>

<template>
  <div class="animt" ref="cord">
    <div class="cord" @touchend="touchEnd()">
      <h2>
        单曲 <span><van-icon name="play-circle-o" />播放</span>
      </h2>
      <ul>
        <li v-for="item in currenShowList">
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
          <svg-icon class="svg" name="ms" style="color: #fc716d"></svg-icon>
        </li>
        <div class="loding">
          <img src="../../../assets/icon/mss.gif" alt="" />
          <span>正在加载...</span>
        </div>
      </ul>
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
      padding: 0 10px;
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
          font-size: 12px;
          color: #aaa;
        }
        & > svg {
          padding: 4px;
          border-radius: 10px;
          background-color: #eee;
        }
      }
      li:last-child {
        border-bottom: 1px solid #eee;
      }
    }
  }
}
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
</style>
