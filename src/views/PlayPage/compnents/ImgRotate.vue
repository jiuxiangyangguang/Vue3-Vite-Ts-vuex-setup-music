<!--
 * @Author: c
 * @Date: 2021-12-02 11:19:00
 * @LastEditTime: 2021-12-02 13:52:49
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\views\PlayPage\ImgRotate.vue
 * 版权声明
-->
<!--
 * @Author: c
 * @Date: 2021-12-02 11:08:33
 * @LastEditTime: 2021-12-02 11:18:58
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\views\PlayPage\PlayHome.vue
 * 版权声明
-->
<script setup lang="ts">
import { computed, onActivated, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getListById } from '@/api/music'
import useStore from '@/hooks/useStore'
const $route = useRoute()
const $router = useRouter()

const $store = useStore()
</script>

<template>
  <!-- 图片旋转组件 -->
</template>

<style lang="less" scoped></style>
