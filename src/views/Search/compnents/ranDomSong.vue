<script setup lang="ts">
import { ref } from 'vue'
const scollBox = ref() // 滚动盒子
const flag = ref<boolean>(false) // 动画阀
const active = ref<string>('es') // 动画阀

// 类型声明方式
// const props = defineProps<{
//   hot: Array<HOT>
// }>()

// 运行时声明
defineProps({
  hot: {
    type: Array as () => Array<HOT>,
    default: () => []
  }
})
const emit = defineEmits(['jump'])
const scollStart = () => {
  if (!flag.value) {
    flag.value = true

    scollBox.value.classList.add('ani')
    setTimeout(() => {
      scollBox.value.classList.remove('ani')
      flag.value = false
    }, 3000)
  }
}
</script>

<template>
  <div class="ranklist">
    <van-tabs v-model:active="active">
      <van-tab title="热搜榜">
        <div class="randombox">
          <ul class="list">
            <li v-for="(item, index) in hot" @click="emit('jump', item.first)">
              <span
                :style="{ color: index < 3 ? '#e71c34' : '#b3afaf' }"
                class="index"
              >
                {{ index + 1 }}
              </span>
              <span :style="{ color: index < 3 ? '#000' : '#b3afaf' }">
                {{ item.first }}
              </span>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="随机榜">
        <div class="randombox">
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
              <li>歌曲</li>
            </ul>
          </div>
          <van-button
            :loading="flag"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            @click="scollStart"
          >
            开始
          </van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="less" scoped>
.ranklist {
  :deep(.van-tabs__wrap) {
    height: 38px !important;
    margin-bottom: 4px;
  }
}
.randombox {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px 0 #eee;
  .list {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 0 0 50%;
      margin: 8px 0;
      font-size: 14px;
      span.index {
        color: #aaa;
      }
      span {
        margin: 4px;
        color: #5c5c5c;
      }
    }
  }
  .random {
    width: 50%;
    height: 70px;
    margin: 0 auto;
    border: 1px solid #eee;
    box-sizing: border-box;
    overflow: hidden;
    ul {
      width: 100%;
      // animation: identifier 3s ease-in-out;
      // animation-fill-mode: forwards;
      padding: 0 10px;
      box-sizing: border-box;
      li {
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        border-radius: 10px;
        text-align: center;
        margin: 10px 0;
      }
      li:nth-child(1) {
        background-image: linear-gradient(to right, #fb3a0e, #f59e97);
      }
      li:nth-child(2) {
        background-image: linear-gradient(to right, #fc3c34, #fbb369);
      }
      li:nth-child(3) {
        background-image: linear-gradient(to right, #df4a6a, #edbbb7);
      }
      li:nth-child(4) {
        background-image: linear-gradient(to right, #503aef, #70caee);
      }
      li:nth-child(5) {
        background-image: linear-gradient(to right, #260374, #a01d9c);
      }
      li:nth-child(6) {
        background-image: linear-gradient(to right, #7451d3, #d8b5f1);
      }
      li:nth-child(7) {
        background-image: linear-gradient(to right, #d81b5b, #f8899a);
      }
      li:nth-child(8) {
        background-image: linear-gradient(to right, #be4111, #edb07d);
      }
      li:nth-child(9) {
        background-image: linear-gradient(to right, #fc3c34, #fbb369);
      }
      li:nth-child(10) {
        background-image: linear-gradient(to right, #fc3c34, #fbb369);
      }
    }
    .ani {
      animation: identifier 3s ease-in-out;
    }
  }
  .van-button {
    height: 30px;
    border-radius: 10px;
  }
}

@keyframes identifier {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-480px);
  }
}
</style>
