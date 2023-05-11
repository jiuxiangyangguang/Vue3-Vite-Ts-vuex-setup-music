<script setup lang="ts">
import { reactive } from 'vue'
const fileList = reactive([])
const afterRead = () => {}
const onOversize = () => {}
</script>

<template>
    <van-uploader
    v-model="fileList"
    :after-read="afterRead"
    :max-size="5 * 1024 * 1024"
    upload-text="拍照上传"
    multiple
    :max-count="3"
    @oversize="onOversize"
    capture="camera"
    accept="image/*"
  />
</template>

<style lang="less"></style>
