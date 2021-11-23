<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const $route = useRoute()
const ROU = computed(() => $route.name)
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="['song']">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style lang="less"></style>
