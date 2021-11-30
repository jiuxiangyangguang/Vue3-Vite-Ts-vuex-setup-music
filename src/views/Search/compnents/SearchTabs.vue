<script setup lang="ts">
import { computed, onActivated, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getListById } from '@/api/music'
import useTime from '@/hooks/useTime'
import useStore from '@/hooks/useStore'
const $route = useRoute()
const $router = useRouter()
const $store = useStore()
const props = defineProps
</script>

<template>哈哈哈</template>

<style lang="less" scoped></style>
