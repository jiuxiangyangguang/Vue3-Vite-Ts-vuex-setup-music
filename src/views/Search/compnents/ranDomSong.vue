<script setup lang="ts">
import { computed, onActivated, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getListById } from '@/api/music'
import useTime from '@/hooks/useTime'
import useStore from '@/hooks/useStore'
const $route = useRoute()
const $router = useRouter()
const scollBox = ref() // 滚动盒子
const $store = useStore()

const scollStart = () => {
  scollBox.value.classList.remove('ani')
  setTimeout(() => {
    scollBox.value.classList.add('ani')
  }, 200)
}
</script>

<template>
  <div class="random">
    <ul ref="scollBox">
      <li>歌曲</li>
      <li>歌曲</li>
      <li>歌曲</li>
      <li>歌曲</li>
      <li>歌曲</li>
      <li>歌曲</li>
      <li>歌曲</li>
      <li>歌曲</li>
      <li>歌曲</li>
    </ul>
  </div>
  <div class="staet" @click="scollStart">开始</div>
</template>

<style lang="less" scoped>
.random {
  width: 50%;
  height: 50px;
  margin: 0 auto;
  border: 1px solid #eee;
  box-sizing: border-box;
  overflow: hidden;
  ul {
    width: 100%;
    // animation: identifier 3s ease-in-out;
    // animation-fill-mode: forwards;
    li {
      width: 90%;
      height: 50px;
      background-color: #f33609;
      border-radius: 10px;
      text-align: center;
      margin: 0 10px;
    }
  }
  .ani {
    animation: identifier 3s ease-in-out;
  }
}
@keyframes identifier {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400px);
  }
}
</style>
