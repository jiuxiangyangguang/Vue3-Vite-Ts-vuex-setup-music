<script setup lang="ts">
import useTime from '@/hooks/useTime'
import { reactive } from '@vue/reactivity'

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
const time = useTime()
setInterval(() => {
  console.log(time.getSeconds())
}, 1000)
</script>

<template>
  <ul>
    <li v-for="item in iconList" class="dfx-dc">
      <div class="icon dfx">
        <p v-if="item.icon === 'eli'" class="time">16</p>
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

<style lang="less">
ul {
  display: flex;
  justify-content: space-between;
  margin-top: 10px !important;
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
