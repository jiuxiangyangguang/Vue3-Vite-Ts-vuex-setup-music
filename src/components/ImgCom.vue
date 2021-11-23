<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

interface Img {
  url: string
  size?: number | string
  skeleton?: boolean
}
const $store = useStore()
const $route = useRoute()
const flag = ref<boolean>(true)
const props = withDefaults(defineProps<Img>(), {
  url: '',
  size: 100,
  skeleton: false
})
const emit = defineEmits(['imgload'])
const onLoad = () => {
  flag.value = false
  emit('imgload')
}
</script>

<template>
  <div class="img-com">
    <van-skeleton title :row="3" v-show="flag" v-if="skeleton" />
    <img :src="url + `?param=${size}y${size}`" @load="onLoad" v-show="!flag" />
  </div>
</template>

<style lang="less" scoped>
.img-com {
  width: 100%;
  height: 100%;
}
img {
  min-height: 10px;
  height: 100%;
}
</style>
