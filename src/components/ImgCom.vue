<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

interface Img {
  url: string
  size?: number
}
const $store = useStore()
const $route = useRoute()
const flag = ref<boolean>(true)
const props = withDefaults(defineProps<Img>(), {
  url: '',
  size: 100
})
</script>

<template>
  <div class="img-spin">
    <img :src="url + `?param=${size}y${size}`" />
  </div>
</template>

<style lang="less" scoped>
.img-spin {
  width: 100%;
  height: 100%;
}
img {
  min-height: 10px;
  height: 100%;
}
</style>
