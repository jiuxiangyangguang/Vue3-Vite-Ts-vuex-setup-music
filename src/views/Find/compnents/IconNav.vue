<script setup lang="ts">
import { getPersonalFm } from '@/api/music'
import useStore from '@/hooks/useStore'
import useTime from '@/hooks/useTime'
import { reactive } from '@vue/reactivity'
const $store = useStore()

const Time = useTime().getDate()
const iconList = [
  {
    name: '每日推荐',
    icon: 'eli'
  },
  {
    name: '私人FM',
    icon: 'fm'
  },
  {
    name: '歌单',
    icon: 'gedan'
  },
  {
    name: '排行榜',
    icon: 'rank'
  },
  {
    name: '数字专辑',
    icon: 'zhaunji'
  }
]

const jump = async (icon: string) => {
  if (icon === 'fm') {
    $store.commit('setCurrentPlayCle')

    const { data }: any = await getPersonalFm()

    data.forEach((item: SongS) => {
      // 向歌曲列表添加歌曲
      $store.commit('setCurrentPlay', {
        name: item.name,
        songName: item?.artists[0].name,
        id: Number(item.id), // 一定要存储数字类型
        picUrl: item?.album.picUrl
      })
    })
  }
}
</script>

<template>
  <ul>
    <li v-for="item in iconList" class="dfx-dc" @click="jump(item.icon)">
      <div class="icon dfx">
        <p v-if="item.icon === 'eli'" class="time">{{ Time }}</p>
        <svg-icon
          :name="item.icon"
          :style="{
            fontSize: '21px'
          }"
        ></svg-icon>
      </div>
      <div class="name">{{ item.name }}</div>
    </li>
  </ul>
</template>

<style lang="less" scoped>
ul {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  li {
    text-align: center;
    display: flex;
    .icon {
      width: 40px;
      height: 40px;
      background-color: #fde4ed;
      border-radius: 50%;
      display: flex;
      position: relative;
      .time {
        position: absolute;
        font-size: 12px;
        color: #fff;
        font-weight: 700;
        color: #fd383f;
        transform: translateY(3px) scale(0.8);
      }
    }
    .name {
      font-size: 12px;
      margin-top: 4px;
    }
  }
}
</style>
