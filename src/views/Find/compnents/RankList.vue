<script setup lang="ts">
import { getTopList } from '@/api/music'
import { ref } from 'vue'
const topList: any = ref([])
const getTopListData = async () => {
  const { list }: any = await getTopList()
  topList.value = list.slice(0, 3)
}
getTopListData()
</script>

<template>
  <div class="rank">
    <div class="title">
      <p>排行榜</p>
      <span>更多<van-icon name="arrow" /></span>
    </div>
    <div class="rankcord">
      <p class="title">{{ topList[0]?.name }}</p>
      <ul>
        <li v-for="item in topList[0]?.tracks">
          <p>{{ item?.first }} {{ item?.second }}</p>
          <van-icon name="fire" color="#fc3b41" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.rank {
  background-color: #fff;
  margin-top: 10px;
  padding: 0 10px;
  & > .title {
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
  .rankcord {
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 4px 0px #eee;
    .title {
      font-weight: 700;
      text-align: center;
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
      }
    }
  }
}
</style>
