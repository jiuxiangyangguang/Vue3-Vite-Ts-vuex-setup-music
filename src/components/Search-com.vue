<script setup lang="ts">
import { onActivated, onDeactivated, ref } from 'vue'
import Menu from './Menu.vue'

const popupShow = ref(false)
</script>

<template>
  <!-- 搜索组件 -->
  <div class="search">
    <svg-icon
      name="caidan"
      @click="popupShow = true"
      :style="{
        fontSize: '20px',
        color: '#808080'
      }"
    ></svg-icon>
    <van-search
      placeholder="请输入搜索关键词"
      @click="$router.push('search')"
    />
    <svg-icon
      name="yuying"
      :style="{
        fontSize: '20px',
        color: '#000'
      }"
    ></svg-icon>
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

<style lang="less" scoped>
.search {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 0 4px;
  position: sticky;
  top: 0px;
  z-index: 1000;
  .van-search {
    flex: 1;
    margin: 0 10px;
    padding: 0;
    border-radius: 34px;
    overflow: hidden;
    background-color: #fff;
    :deep(.van-search__content) {
      background-color: #fff;
    }
  }
}
</style>
