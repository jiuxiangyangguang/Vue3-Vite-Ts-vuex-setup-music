<script setup lang="ts">
import { computed, ref } from 'vue'
import { getHot } from '@/api/music'
import ranDomSong from './ranDomSong.vue'
import useStore from '@/hooks/useStore'
const $store = useStore()
const hot = ref([])

$store.commit('getHistoryList') // 获取历史搜索
const historyList = computed(() => $store.state.historyList) // 历史记录数组
const emit = defineEmits(['tabSwitch'])
// 搜索事件
// 获取排行榜
const getRankList = async () => {
  const {
    result: { hots }
  }: any = await getHot()
  hot.value = hots
}
const jump = (str: string) => {
  emit('tabSwitch', str)
}
// 清空历史数据
const del = () => {
  $store.commit('deHistoryList')
}
getRankList()
</script>

<template>
  <!-- 历史 -->
  <div class="history" v-if="historyList.length > 0">
    <div class="title">历史</div>
    <ul>
      <li @click="emit('tabSwitch', item.value)" v-for="item in historyList">
        {{ item.value }}
      </li>
      <van-icon name="delete-o" @click="del" />
    </ul>
  </div>
  <!-- 榜单切换 -->
  <ranDomSong @jump="jump" :hot="hot" />
</template>

<style lang="less" scoped>
.search {
  display: flex;
  height: 40px;
  align-items: center;
  position: relative;
  .searchMue {
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    top: 40px;
    background-color: #fff;
    z-index: 10000;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 20px 0 #eee;
    font-size: 14px;
    p {
      margin: 8px 0;
      .van-icon {
        margin-right: 10px;
      }
      span {
        width: 80%;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  & > .van-icon {
    transform: rotate(90deg);
    margin-right: 10px;
    margin-left: 10px;
    position: absolute;
    right: 10px;
  }
  .van-search {
    flex: 1;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #eee;
    padding: 0;
  }
}
.history {
  margin: 20px 0;
  display: flex;
  height: 20px;
  line-height: 20px;
  .title {
    width: 30px;
    font-weight: 700;
    font-size: 14px;
  }
  ul {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 4px;
    font-size: 12px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .van-icon {
      position: absolute;
      right: 0px;
      font-size: 18px;
      background-color: #fff;
      padding: 2px 10px 2px 2px;
      border-radius: 10px;
    }
    li {
      flex-shrink: 0;
      height: 20px;
      padding: 0px 8px;
      border-radius: 10px;
      background-color: #f2f2f2;
      box-sizing: border-box;
      margin: 0 8px;
    }
  }
}
</style>
