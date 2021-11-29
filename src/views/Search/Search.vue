<script setup lang="ts">
import { computed, onActivated, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getListById } from '@/api/music'
import ranDomSong from './compnents/ranDomSong.vue'
import useTime from '@/hooks/useTime'
import useStore from '@/hooks/useStore'
const $route = useRoute()
const $router = useRouter()
const songName = ref('')
const searValue = ref('') // 搜索关键字
const search = ref() // 搜索框DOM
const $store = useStore()
const $time = useTime()
const historyList = computed(() => $store.state.historyList) // 历史记录数组
onMounted(() => {
  // 自动聚焦
  search.value.focus()
})

// 搜索事件
const onSearch = () => {
  const seach = {
    value: searValue.value,
    date: $time.getTimeYMD
  }
  $store.commit('setHistoryList', seach)
}
const back = () => {
  $router.push('/')
}
</script>

<template>
  <div class="animt-css3">
    <!-- input框 -->
    <div class="search">
      <van-search
        ref="search"
        v-model="searValue"
        @search="onSearch"
        autofocus
        placeholder="请输入搜索关键词"
      />
      <van-icon name="down" @click="back" />
    </div>
    <!-- 历史 -->
    <div class="history" v-if="historyList.length > 0">
      <div class="title">历史</div>
      <ul>
        <li v-for="item in historyList">{{ item.value }}</li>
      </ul>
    </div>
    <!-- 榜单切换 -->
    <ranDomSong />
  </div>
</template>

<style lang="less" scoped>
.animt-css3 {
  padding: 0 4px;
  box-sizing: border-box;
}
.search {
  display: flex;
  height: 40px;
  align-items: center;
  .van-icon {
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
  margin-top: 10px;
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
