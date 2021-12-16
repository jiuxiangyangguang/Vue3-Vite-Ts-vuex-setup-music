<script setup lang="ts">
import { computed, onActivated, ref, watch } from 'vue'
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
interface PlayList {
  id: number
  coverImgUrl: string
  name: string
  playCount: number
  creator: any
  trackCount: number
}
const props = defineProps({
  currenplayList: {
    type: Array as () => Array<PlayList>,
    default: []
  }
})
const touchEnd = () => {
  // 卷入的高度在父盒子身上
  const scrollHeight = cord.value.scrollHeight
  const clientHeight = cord.value.clientHeight
  const scrollTop = cord.value.scrollTop

  if (clientHeight + scrollTop >= scrollHeight) {
    lodingFlag.value = true
    emit('loadMore', props.currenplayList.length + 30)
  }
}

const jump = (item: any) => {
  $router.push({ path: '/song', query: { id: item.id } })
}

watch(
  () => props.currenplayList,
  () => {
    flag.value = true
    lodingFlag.value = false // 加载更多
  },
  { deep: true }
)
</script>

<template>
  <div class="animt" ref="cord" v-show="flag">
    <div class="cord" @touchend="touchEnd()">
      <ul>
        <li v-for="item in currenplayList" @click="jump(item)">
          <img-com :url="item.coverImgUrl" size="100" skeleton></img-com>
          <div class="info">
            <p class="songname">{{ item.name }}</p>
            <p class="artistsname">
              {{ item.trackCount }}首,by {{ item.creator.nickname }},播放{{
                (item.playCount / 10000).toFixed(1)
              }}万次播放
            </p>
          </div>
        </li>
        <div class="loding" v-show="lodingFlag && currenplayList.length">
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
      padding: 10px 10px 30px 10px;
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
        margin: 10px 0;
        :deep(.img-com) {
          width: 60px;
          border-radius: 10px;
          overflow: hidden;
        }
        .info {
          flex: 1;
          margin-left: 10px;
          .songname {
            font-size: 14px;
            line-height: 30px;
          }
          .artistsname {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            font-size: 12px;
            color: #aaa;
          }
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
