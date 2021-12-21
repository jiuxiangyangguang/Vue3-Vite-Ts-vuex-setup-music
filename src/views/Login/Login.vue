<script setup lang="ts">
import { loginByEmail, loginByPhone, getAccountInfo } from '@/api/user'
import { reactive, ref, toRefs } from 'vue'
import { Toast, Notify } from 'vant'
import { useRouter } from 'vue-router'
import md5 from 'js-md5'
import { set } from '@/utils/local'
import useStore from '@/hooks/useStore'
const $store = useStore()
const $router = useRouter()
const form = reactive({
  username: '',
  password: '',
  async onSubmit() {
    let froms: Login = {
      email: form.username,
      password: md5(form.password),
      md5_password: md5(form.password)
    }
    const flag = form.username.includes('@')
    if (!flag) {
      froms = {
        phone: form.username,
        password: md5(form.password),
        md5_password: md5(form.password)
      }
    }
    const data: any = await (flag ? loginByEmail(froms) : loginByPhone(froms))
    if (data.code === 502) {
      Toast.fail(data.message)
    }
    if (data.code === 200) {
      Notify({ type: 'success', message: `欢迎您,${data.profile.nickname}` })
      $store.commit('setUserInfo', {
        name: 'uid',
        data: data.profile.userId
      })
      $store.commit('setUserInfo', {
        name: 'nickname',
        data: data.profile.nickname
      })
      $store.commit('setUserInfo', {
        name: 'picUrl',
        data: data.profile.avatarUrl
      })
      $store.commit('setUserInfo', {
        name: 'follows',
        data: data.profile.follows
      })
      $store.commit('setUserInfo', {
        name: 'followeds',
        data: data.profile.followeds
      })
      $store.commit('setUserInfo', {
        name: 'eventCount',
        data: data.profile.eventCount
      })
      $store.commit('setUserInfo', {
        name: 'isLogin',
        data: true
      })
      set('token', data.token)
      $router.push('/')
    }
  }
})
</script>

<template>
  <div class="login">
    <div class="login-icon">
      <svg-icon name="wyy" style="font-size: 34px"></svg-icon>
    </div>
    <p class="title" @click="$router.push('/')">立即体验</p>

    <!-- 表单登入区域 -->
    <div class="sign-box">
      <van-form @submit="form.onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.username"
            autocomplete="off"
            name="用户名"
            placeholder="邮箱"
          />
          <van-field
            v-model="form.password"
            autocomplete="off"
            type="password"
            name="密码"
            placeholder="密码"
          />
        </van-cell-group>
        <div style="margin: 4px 0 16px 0">
          <van-button round block type="primary" native-type="submit">
            一键登录
          </van-button>
        </div>
      </van-form>
      <div class="icon">
        <div class="bgc">
          <svg-icon name="wx" style="font-size: 18px"></svg-icon>
        </div>
        <div class="bgc">
          <svg-icon name="qq" style="font-size: 18px"></svg-icon>
        </div>
        <div class="bgc">
          <svg-icon name="wb" style="font-size: 18px"></svg-icon>
        </div>
        <div class="bgc">
          <svg-icon name="wy" style="font-size: 18px"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background-color: #dc2b21;
  position: relative;
  .title {
    position: fixed;
    top: 10px;
    right: 10px;
    color: #f5f5f5;
    font-size: 14px;
  }
  .login-icon {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f12a24;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:after {
      content: '';
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid #f12a24;
      position: absolute;
      animation: identifier 3s linear infinite;
    }
    &:before {
      content: '';
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid #f12a24;
      position: absolute;
      animation: identifier 3s linear infinite 1.5s;
    }
  }
  .sign-box {
    width: 100%;
    position: absolute;
    bottom: 20px;
    .van-form {
      width: 70%;
      margin: 0 auto;
      background-color: #dc2b21;
      .van-cell-group {
        background-color: transparent;
      }
      input {
        color: #fff;
        &::placeholder {
          color: #fff;
        }
      }
      .van-button {
        height: 34px;
        line-height: 34px;
        background-color: #fff;
        border-color: #fff;
        color: #dc2b21;
      }
      .van-cell {
        background-color: #dc2b21;
        color: #fff !important;
        &::after {
          position: absolute;
          box-sizing: border-box;
          content: ' ';
          bottom: 0;
          transform: scaleY(1);
          border-bottom: 1px solid #fff;
        }
      }
    }
    .icon {
      width: 70%;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      .bgc {
        padding: 4px;
        border-radius: 50%;
        border: 1px solid #ff8181;
      }
    }
  }
}
@keyframes identifier {
  0% {
    width: 60px;
    height: 60px;
  }
  100% {
    width: 300px;
    height: 300px;
  }
}
</style>
