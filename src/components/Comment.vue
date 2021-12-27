<script setup lang="ts">
import { reactive, ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { getMusicComment } from '@/api/music'
import { getUserDetails } from '@/api/user'

const $store = useStore()
</script>

<template></template>

<style lang="less" scoped></style>
