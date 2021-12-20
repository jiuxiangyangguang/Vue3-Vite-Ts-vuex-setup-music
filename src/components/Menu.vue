<script setup lang="ts">
import { computed, onDeactivated, ref } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '@/hooks/useStore'
const $store = useStore()
const $router = useRouter()

const user = computed(() => $store.state.userInfo) // 用户数据
const jump = () => {
  if (!user.value.isLogin) $router.push('login')
}
const checked = ref(false) // 是否是夜间模式
</script>

<template>
  <div class="menu">
    <div class="info">
      <div class="left-box">
        <p class="name" @click="jump">
          <svg-icon
            name="sign"
            v-if="!user.isLogin"
            :style="{ fontSize: '16px' }"
          ></svg-icon
          >{{ user.nickname }}
        </p>
      </div>
      <svg-icon name="sys" :style="{ fontSize: '16px' }"></svg-icon>
    </div>
    <div class="main">
      <ul class="card">
        <li>
          <p>
            <svg-icon name="dx" :style="{ fontSize: '18px' }"></svg-icon
            >我的消息
          </p>
          <van-icon name="arrow" />
        </li>
        <li>
          <p>
            <svg-icon name="yb" :style="{ fontSize: '18px' }"></svg-icon
            >云呗中心
          </p>
          <van-icon name="arrow" />
        </li>
        <li>
          <p>
            <svg-icon name="czz" :style="{ fontSize: '18px' }"></svg-icon
            >创作者中心
          </p>
          <van-icon name="arrow" />
        </li>
      </ul>

      <!-- 其他设置 -->
      <ul class="card">
        <p class="title">其他</p>
        <li>
          <p>
            <svg-icon name="sz" :style="{ fontSize: '18px' }"></svg-icon>
            设置
          </p>
          <van-icon name="arrow" />
        </li>
        <li>
          <p>
            <svg-icon name="yjms" :style="{ fontSize: '18px' }"></svg-icon>
            夜间模式
          </p>
          <van-switch v-model="checked" size="18px" inactive-color="#cdcdcd" />
        </li>
        <li>
          <p>
            <svg-icon name="gezb" :style="{ fontSize: '18px' }"></svg-icon>
            个性装扮
          </p>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu {
  height: 100%;
  display: flex;
  flex-direction: column;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
    .name {
      .svg-icon {
        margin-right: 10px;
      }
    }
  }
  .main {
    flex: 1;
    padding: 0 10px;
    box-sizing: border-box;
    background-color: #f5f5f5;
  }
  .card {
    margin: 10px 0;
    background-color: #fff;
    border-radius: 10px;
    padding: 0 10px;
    box-sizing: border-box;
    .title {
      line-height: 40px;
      border-bottom: 1px solid #f5f5f5;
    }
    li {
      line-height: 40px;
      height: 40px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .svg-icon {
        margin-right: 6px;
      }
    }
  }
}
</style>
