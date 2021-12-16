<script setup lang="ts">
import { computed, onActivated, ref, onMounted, watch } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { getMultimatch } from '@/api/music'
import useTime from '@/hooks/useTime'
import useStore from '@/hooks/useStore'
import comsive from './Comprehensive.vue'
import single from './Single.vue'
import songsheet from './SongSheet.vue'

const $route = useRoute()
const $router = useRouter()
const $store = useStore()
const active = ref<string>('综合')
const currensongList = ref() // 单曲组件
const currennew_mlog = ref() // 视频组件
const currenalbum = ref() // 专辑组件
const currenplayList = ref() // 歌单组件
const songList = ref({}) // 单曲列表
const new_mlog = ref({}) // 视频列表
const playList = ref({}) // 歌单列表
const album = ref({}) // 专辑列表
const tablist = [
  {
    name: '综合',
    type: 1018
  },
  {
    name: '单曲',
    type: 1
  },
  {
    name: '歌单',
    type: 1000
  },
  {
    name: '专辑',
    type: 10
  },
  {
    name: '歌词',
    type: 1006
  },
  {
    name: 'MV',
    type: 1004
  }
]

const emit = defineEmits(['tabSwitch'])
const props = defineProps({
  keyword: {
    type: String,
    default: ''
  }
})
// 获取信息
const getDanqu = async (limit?: number) => {
  const list = tablist.filter((item) => item.name === active.value)
  const data: any = await getMultimatch(props.keyword, list[0].type, limit)
  if (list[0].name === '综合') {
    songList.value = data?.result?.song
    new_mlog.value = data?.result?.new_mlog
    playList.value = data?.result?.playList
    album.value = data?.result?.album
  } else if (list[0].name === '单曲') {
    currensongList.value = data?.result?.songs
  } else if (list[0].name === '歌单') {
    currenplayList.value = data?.result?.playlists
    console.log(data?.result?.playlists)
  }
}
watch(
  active,
  () => {
    getDanqu()
  },
  { immediate: true }
)
</script>

<template>
  <van-tabs v-model:active="active" swipeable>
    <van-tab :name="item.name" v-for="item in tablist" :title="item.name">
      <comsive
        :songList="songList"
        :playList="playList"
        :new_mlog="new_mlog"
        v-if="item.name === '综合'"
      />
      <single
        v-if="item.name === '单曲'"
        :currensongList="currensongList"
        @loadMore="getDanqu"
      />
      <songsheet
        v-if="item.name === '歌单'"
        :currenplayList="currenplayList"
        @loadMore="getDanqu"
      />
    </van-tab>
  </van-tabs>
</template>

<style lang="less" scoped>
.van-tabs {
  height: 80%;
}
:deep(.van-tabs__content) {
  height: 100%;
  overflow: hidden;
  .van-tab__pane {
    height: 100%;
  }
  // 切换tab时小图标溢出了
  .van-tab__pane-wrapper--inactive {
    overflow: hidden;
  }
}
</style>
