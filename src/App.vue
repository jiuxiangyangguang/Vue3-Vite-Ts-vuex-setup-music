<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { useRoute } from 'vue-router'

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const $routr = useRoute()
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <keep-alive :include="['Find']">
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang="less"></style>
