<script setup lang="ts">
import { computed, onActivated, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getListById } from '@/api/music'
import useTime from '@/hooks/useTime'
import useStore from '@/hooks/useStore'
const $route = useRoute()
const $router = useRouter()

const $store = useStore()
</script>

<template>
  <div class="random"></div>
</template>

<style lang="less" scoped>
.random {
  width: 50%;
  height: 100px;
  margin: 0 auto;
  border: 1px solid #eee;
}
</style>
