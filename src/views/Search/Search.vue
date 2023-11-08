<script lang="ts">
export default {
  name: 'Search'
}
</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getKeyWord } from '@/api/music'
import useTime from '@/hooks/useTime'
import useStore from '@/hooks/useStore'
import SeachHomeVue from './compnents/SeachHome.vue'
import SearchTabs from './compnents/SearchTabs.vue'

const $router = useRouter()
const searValue = ref('') // 搜索关键字
const searList = ref([]) // 搜索结果数组
const flag = ref(true) // 搜索关键词盒子
const search = ref() // 搜索框DOM
const $store = useStore()
const $time = useTime()
const com = ref(1) //显示某个组件
$store.commit('getHistoryList') // 获取历史搜索

// 自动聚焦
onMounted(() => {
  search.value.focus()
})

// 搜索事件
const onSearch = () => {
  const seach = {
    value: searValue.value,
    date: $time.getTimeYMD
  }
  $store.commit('setHistoryList', seach)
  com.value = 0 // 切换tab
}
// 搜索框input事件
const inputValue = async () => {
  flag.value = true // 打开搜索关键字盒子
  const data: any = await getKeyWord(searValue.value)
  searList.value = data?.result?.allMatch || []
}
// 用户点击事件
const keyWord = (str: string) => {
  flag.value = false // 关闭搜索关键字盒子
  searValue.value = str
  onSearch()
}
// 获取端口事件
const focus = () => {
  flag.value = true // 打开搜索关键字盒子
  com.value = 1 // 切换tabs
}
const back = () => {
  if (searValue.value) {
    searValue.value = ''
    com.value = 1 // 切换tab
  } else {
    $router.push('/')
  }
}
const tabSwitch = (str: string) => {
  flag.value = false // 关闭搜索关键字盒子
  searValue.value = str
  com.value = 0
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
        @update:model-value="inputValue"
        @focus="focus"
        autofocus
        placeholder="请输入搜索关键词"
        :clearable="false"
      />
      <van-icon :name="searValue ? 'cross' : 'down'" @click="back" />
      <div class="searchMue" v-show="searList.length && flag">
        <p v-for="item: any in searList" @click="keyWord(item.keyword)">
          <van-icon name="search" />
          <span>{{ item.keyword }}</span>
        </p>
      </div>
    </div>
    <component
      @tabSwitch="tabSwitch"
      :keyword="searValue"
      :is="com ? SeachHomeVue : SearchTabs"
    ></component>
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
      margin: 10px 0;
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
