<script setup lang="ts">
import { getPersonalized } from '@/api/music'

const getlistData = async () => {
  const data = await getPersonalized()
  console.log(data)
  console.log(1)
}
getlistData()
</script>

<template>
  <!-- 推荐歌单 -->
  <div class="recom">
    <p>推荐歌单</p>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<style lang="less" scoped></style>
