<script setup lang="ts">
import { getListById } from '@/api/music'
import useTime from '@/hooks/useTime'
import { computed, onActivated, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()
const songInfo = ref<SongList>({})
const flag = ref<boolean>(false)
const timeInvert = useTime()
interface SongList {
  commentCount?: number
  name?: string
  shareCount?: number
  subscribedCount?: number
  tags?: Array<string>
  trackIds?: Array<any>
  trackUpdateTime?: number
  tracks?: Array<any>
  coverImgUrl?: string
}
const getListData = async () => {
  const id = $route.query.id as string
  const { playlist }: any = await getListById({ id })
  songInfo.value = playlist as SongList
}
const back = () => {
  $router.push('/')
}
const imgloag = () => {
  console.log(1)

  flag.value = true
}
onActivated(() => {
  songInfo.value = {}
  getListData()
})
</script>

<template>
  <div class="animt-css3">
    <div class="loding" v-show="!flag">
      <img src="../../assets/icon/mss.gif" alt="" />
      <span>正在加载...</span>
    </div>
    <div class="lodings" v-show="flag">
      <div class="topbox">
        <div
          class="bgurl"
          :style="{
            background: `url(${songInfo.coverImgUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
        ></div>
        <div class="nav">
          <van-icon name="down" @click="back" />
          <svg-icon name="gedanwangy" style="font-size: 24px"></svg-icon>
          <p>动态歌单</p>
        </div>
        <!-- 图片展示盒子 -->
        <div class="img-info">
          <img-com
            :url="songInfo.coverImgUrl"
            size="100"
            @imgload="imgloag"
          ></img-com>
          <div class="info">
            <p class="text">{{ songInfo.name }}</p>
            <p class="time">
              {{ timeInvert.getTimeInvert(songInfo.trackUpdateTime) }}
              <van-icon name="fire-o" color="#ee0a24" />
            </p>
            <p class="icon">
              <span v-for="item in songInfo.tags">{{ item }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 中间悬浮盒子 -->
      <div class="suspension">
        <!-- 收藏 -->
        <div class="subscribedCount">
          <svg-icon name="sc" style="font-size: 18px"></svg-icon>
          <span>{{ songInfo.subscribedCount }}</span>
        </div>
        <!-- 评论 -->
        <div class="commentCount">
          <svg-icon name="pl" style="font-size: 18px"></svg-icon>
          <span>
            {{ songInfo.commentCount }}
          </span>
        </div>
        <!-- 分享 -->
        <div class="shareCount">
          <svg-icon name="fx" style="font-size: 18px"></svg-icon>
          <span>
            {{ songInfo.shareCount }}
          </span>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="songlist">
        <div class="list" v-for="(item, index) in songInfo.tracks">
          <div class="index">{{ index + 1 }}</div>
          <div class="info">
            <p class="songname">{{ item.name }}</p>
            <p class="songArName">
              <span v-for="son in item.ar"> {{ son.name + '/' }}</span>
            </p>
          </div>
          <div class="icon">
            <svg-icon class="svg" name="sp" style="color: #fc716d"></svg-icon>
            <svg-icon class="svg" name="ms" style="color: #fc716d"></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.topbox {
  position: relative;
  padding: 10px;
  padding-bottom: 40px;
  overflow: hidden;
  .bgurl {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    filter: blur(30px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .nav {
    display: flex;
    line-height: 24px;
    color: #fff;
    p {
      margin-left: 4px;
    }
    .van-icon {
      transform: rotate(90deg);
      margin-right: 10px;
    }
  }
  .img-info {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    :deep(.img-com) {
      width: 100px;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 10px;
    }
    .time {
      color: #fff;
      font-size: 12px;
    }
    .info {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      .text {
        color: #fff;
        line-height: 24px;
      }
      .icon {
        span {
          font-size: 12px;
          padding: 4px;
          background-color: #ff976a;
          border-radius: 10px;
          color: #fff;
          margin: 4px;
          display: inline-block;
        }
      }
    }
  }
}
.suspension {
  width: 80%;
  background-color: #fff;
  display: flex;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #fafafa;
  transform: translateY(-50%);
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 5px 0 #eee;
  & > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #828484;
    span {
      margin-left: 10px;
    }
  }
  .commentCount {
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
}
.songlist {
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 8px 0;
    &:active {
      background-color: #eee;
    }
    .index {
      width: 40px;
      line-height: 40px;
      text-align: center;
    }
    .info {
      flex: 1;
      .songname {
        width: 100%;
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .songArName {
        font-size: 12px;
        color: #aaa;
      }
    }
    .icon {
      width: 80px;
      svg {
        padding: 4px;
        border-radius: 10px;
        background-color: #eee;
      }
    }
  }
}
.loding {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 20px;
  }
  span {
    font-size: 14px;
  }
}
</style>
