<script setup lang="ts">
import { getNewSong } from '@/api/music'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import useStore from '@/hooks/useStore'
const $router = useRouter()
const $store = useStore()
const newSongData = ref([]) // 默认展示3首歌曲

const songData = ref([]) // 获取的所有歌曲
const newsong = async () => {
  const { result }: any = await getNewSong()
  songData.value = result
  newSongData.value = result.slice(0, 3)
}

// 刷新推荐歌单
const replay = async () => {
  const len = 34
  const { result }: any = await getNewSong(len)
  const one = Math.ceil(Math.random() * len - 4)
  //@ts-ignore
  newSongData.value = [result[one], result[one + 1], result[one + 2]]

  songData.value = result
}
// 播放全部
const palyAll = () => {
  $store.commit('setCurrentPlayCle') // 清空歌曲列表
  const arr = [...songData.value]
  arr.reverse().forEach((item: any) => {
    const obj = {
      name: item.name,
      songName: item.song.artists[0].name,
      id: item.id,
      picUrl: item.picUrl
    }
    $store.commit('setCurrentPlay', obj)
  })
}
// 跳转音乐页
const jump = (id: number) => {
  $router.push({
    path: 'play',
    query: {
      id
    }
  })
}

newsong()
</script>

<template>
  <!-- 推荐新音乐 -->
  <div class="newsong">
    <div class="title">
      <p><van-icon name="replay" @click="replay" /> 推荐新音乐</p>
      <span @click="palyAll"><van-icon name="play-circle-o" />播放</span>
    </div>
    <ul>
      <li v-for="item: any in newSongData" @click="jump(item.id)">
        <img-com :url="item.picUrl" :size="100"></img-com>
        <div class="info">
          <p class="songname">{{ item.name }}</p>
          <p class="artistsname">{{ item.song.artists[0].name }}</p>
        </div>
        <svg-icon class="svg" name="sp" style="color: #fc716d"></svg-icon>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.newsong {
  background-color: #fff;
  margin-top: 10px;
  border-radius: 0 0 10px 10px;
  padding: 0 10px;
  .title {
    font-weight: 700;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-weight: normal;
      font-size: 12px;
      padding: 4px 4px 4px 6px;
      border: 1px solid #eee;
      border-radius: 20px;
    }
  }
  ul {
    li {
      display: flex;
      align-items: center;
      height: 50px;
      position: relative;
      .info {
        font-size: 12px;
        margin-left: 10px;
        line-height: 20px;
        .songname {
          font-weight: 700;
        }
        .artistsname {
          color: #ccc;
        }
      }
      :deep(.img-com) {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 10px;
      }
      .svg {
        padding: 4px;
        position: absolute;
        right: 10px;
        border-radius: 10px;
        background-color: #eee;
      }
    }
  }
}
</style>
