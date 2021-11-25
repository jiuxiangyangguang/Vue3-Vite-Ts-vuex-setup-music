<script setup lang="ts">
import { getListById } from '@/api/music'
import useTime from '@/hooks/useTime'
import { computed, onActivated, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()
const songName = ref('')

const back = () => {
  $router.push('/')
}
</script>

<template>
  <div class="animt-css3">
    <!-- input框 -->
    <div class="search">
      <van-search placeholder="请输入搜索关键词" />
      <van-icon name="down" @click="back" />
    </div>
  </div>
</template>

<style lang="less" scoped>
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
    margin: 10px;
    padding: 0;
    :deep(.van-search__content) {
    }
  }
}
</style>
