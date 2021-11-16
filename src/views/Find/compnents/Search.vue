<script setup lang="ts"></script>

<template>
  <!-- 搜索组件 -->
  <div class="search">
    <svg-icon
      name="caidan"
      :style="{
        fontSize: '20px',
        color: '#808080'
      }"
    ></svg-icon>
    <van-search placeholder="请输入搜索关键词" />
    <svg-icon
      name="yuying"
      :style="{
        fontSize: '20px',
        color: '#000'
      }"
    ></svg-icon>
  </div>
</template>

<style lang="less" scoped>
.search {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 0 4px;
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
