<script lang="ts">
export default {
  // name: 'my'
}
</script>
<script setup lang="ts">
import { getLiekList, getMusicDetail } from '@/api/music'
import Menu from '@/components/Menu.vue'
import useStore from '@/hooks/useStore'
import { showDialog } from 'vant'
import 'vant/es/dialog/style'
import { computed, onActivated, ref } from 'vue'
import { useRouter } from 'vue-router'
const infoIcon = ref<Array<infoIcon>>([
  {
    name: '最近播放',
    icon: 'zjbf'
  },
  {
    name: '本地/下载',
    icon: 'bdxz'
  },
  {
    name: '云盘',
    icon: 'yp'
  },
  {
    name: '已购',
    icon: 'yg'
  },
  {
    name: '我的好友',
    icon: 'wdhy'
  },
  {
    name: '收藏和赞',
    icon: 'schz'
  },
  {
    name: '我的博客',
    icon: 'wdbk'
  },
  {
    name: '音乐罐子',
    icon: 'yygz'
  }
]) // icon数组
const $store = useStore()
const $router = useRouter()

const nickname = computed(() => $store.state.userInfo.nickname) // 登入名称
const uid = computed(() => $store.state.userInfo.uid) // 用户名称
const isLogin = computed(() => $store.state.userInfo.isLogin) // 是否登录
const user = computed(() => $store.state.userInfo) // 用户数据
const len = ref(0)
const ids = ref([]) // 心动模式歌单
const popupShow = ref(false) // 侧边菜单

const getlist = async () => {
  const data: any = await getLiekList({ uid: uid.value })
  ids.value = data?.ids
  len.value = data?.ids?.length
  $store.commit('setUserInfo', { name: 'likeArr', data: data?.ids })
}
const jump = () => {
  if (!isLogin.value) {
    $router.push('login')
  } else {
    $router.push('setup')
  }
}
// 心动模式
const lick = async () => {
  // 获取歌曲详情
  if (!isLogin.value) {
    showDialog({
      message: '登录之后即可开启心动模式',
      confirmButtonText: '登录'
    })
      .then(() => {
        $router.push('login')
      })
      .catch(() => {
        // on cancel
      })

    return
  }
  const idsArr = ids.value.join(',')
  const data: any = await getMusicDetail({ ids: idsArr })
  const song: Array<Song> = data?.songs

  $store.commit('setCurrentPlayCle')
  song.forEach((item) => {
    // 向歌曲列表添加歌曲
    $store.commit('setCurrentPlay', {
      name: item.name,
      songName: item?.ar[0]?.name,
      id: Number(item.id), // 一定要存储数字类型
      picUrl: item?.al.picUrl
    })
  })
}
onActivated(() => {
  popupShow.value = false

  if (isLogin.value) getlist()
})
</script>

<template>
  <div class="my">
    <!-- 底部跳转 -->
    <div class="jumptop">
      <svg-icon
        name="caidan"
        @click="popupShow = true"
        :style="{
          fontSize: '20px',
          color: '#808080'
        }"
      ></svg-icon>

      <van-icon name="search" />
    </div>
    <!-- 基本信息 -->
    <div class="userName">
      <div class="imgbox">
        <svg-icon v-if="!isLogin" name="sign"></svg-icon>
        <img-com v-if="isLogin" :url="user.picUrl"></img-com>
      </div>
      <div class="card">
        <p class="name" @click="jump">{{ nickname }}</p>
        <p class="info">
          <span>{{ user.follows }}关注</span>
          <span>{{ user.followeds }}粉丝</span>
          <span>Lv.{{ user.eventCount }}</span>
        </p>
      </div>
    </div>
    <!-- icon区域 -->
    <div class="icon card">
      <ul>
        <li v-for="item in infoIcon">
          <svg-icon :name="item.icon" style="font-size: 24px"></svg-icon>
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <p class="add">+ 音乐应用</p>
    </div>
    <!-- 我喜欢的音乐 -->
    <div class="card liek">
      <div class="left-box">
        <svg-icon name="xd" style="font-size: 40px"></svg-icon>
        <div class="text">
          <p>我喜欢的音乐</p>
          <p>{{ len }}首</p>
        </div>
      </div>
      <div class="icon" @click="lick">
        <svg-icon name="xxd" style="font-size: 16px"></svg-icon>
        心动模式
      </div>
    </div>
  </div>

  <!-- 菜单弹出层 -->
  <van-popup
    v-model:show="popupShow"
    position="left"
    :style="{ width: '70%', height: '100%' }"
  >
    <Menu></Menu>
  </van-popup>
</template>

<style lang="less">
.my {
  height: 100%;
  background-color: #f3f3f3;
  padding: 0 10px;
  .jumptop {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  .userName {
    display: flex;
    flex-direction: column;
    align-items: center;
    .imgbox {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #aaa;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(50%);
      overflow: hidden;
    }
    .card {
      padding-top: 30px;
      width: 100%;
      text-align: center;
      line-height: 30px;
      .name {
        font-weight: 700;
      }
      .info {
        color: #aaa;
        span:nth-child(2) {
          margin: 0 8px;
        }
      }
    }
  }
  .icon {
    .add {
      font-size: 12px;
      text-align: center;
      color: #aaa;
      border-top: 1px solid #eee;
      line-height: 24px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 60px;
        height: 60px;
        margin: 10px;
        span {
          font-size: 12px;
        }
      }
    }
  }
  .liek {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-box {
      display: flex;
      p:first-child {
        font-size: 16px;
        color: #000;
      }
      p {
        font-size: 12px;
        line-height: 20px;
        color: #aaa;
        margin-left: 4px;
      }
    }
    .icon {
      height: 20px;
      display: flex;
      align-items: center;
      font-weight: normal;
      font-size: 12px;
      padding: 2px 4px;
      border: 1px solid #eee;
      border-radius: 20px;
    }
  }

  .card {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
    box-sizing: border-box;
  }
}
</style>
