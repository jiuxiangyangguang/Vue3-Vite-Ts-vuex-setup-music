<script setup lang="ts">
import { computed, onActivated, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getListById,
  getHot,
  getHotDetail,
  getKeyWord,
  getMultimatch
} from '@/api/music'
import ranDomSong from './ranDomSong.vue'
import useTime from '@/hooks/useTime'
import useStore from '@/hooks/useStore'
const $route = useRoute()
const $router = useRouter()
const searValue = ref('') // 搜索关键字
const $store = useStore()
const $time = useTime()
const hot = ref([])

$store.commit('getHistoryList') // 获取历史搜索
const historyList = computed(() => $store.state.historyList) // 历史记录数组
const emit = defineEmits(['inputValue'])
// 搜索事件
const onSearch = () => {
  const seach = {
    value: searValue.value,
    date: $time.getTimeYMD
  }
  $store.commit('setHistoryList', seach)
}
// 获取排行榜
const getRankList = async () => {
  const {
    result: { hots }
  }: any = await getHot()
  hot.value = hots
}

getRankList()
</script>

<template>
  <!-- 历史 -->
  <div class="history" v-if="historyList.length > 0">
    <div class="title">历史</div>
    <ul>
      <li v-for="item in historyList">{{ item.value }}</li>
    </ul>
  </div>
  <!-- 榜单切换 -->
  <ranDomSong :hot="hot" />
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
    :deep(.van-search__content) {
    }
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

    li {
      flex-shrink: 0;
      padding: 4px 8px;
      background-color: #f2f2f2;
      border-radius: 20px;
      box-sizing: border-box;
      margin: 0 8px;
    }
  }
}
</style>
