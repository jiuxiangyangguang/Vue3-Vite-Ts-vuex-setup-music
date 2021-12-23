<script lang="ts">
export default {
  // name: 'my'
}
</script>
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import Menu from '@/components/Menu.vue'
import useStore from '@/hooks/useStore'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { getInfoUpdate, setUpImg } from '@/api/user'
import { areaList } from '@vant/area-data'
import useTime from '@/hooks/useTime'
import axios from 'axios'
import { Toast } from 'vant'

const $store = useStore()

const $router = useRouter()

const uploader = ref() // 获取图片上传DOM

const nickname = computed(() => $store.state.userInfo.nickname) // 登入名称

const uid = computed(() => $store.state.userInfo.uid) // 用户名称

const isLogin = computed(() => $store.state.userInfo.isLogin) // 是否登录

const user = computed(() => $store.state.userInfo) // 用户数据

const show = ref(false) // 是否显示遮罩层

const info = ref('') //当前弹窗内容

const maxDate = new Date()
const minDate = new Date(1991, 0, 1)
const date = new Date(user.value.birthday)

const clickEv = (v: string) => {
  info.value = v
  show.value = true
}

const checkedGender = (gender: number) => {
  $store.commit('setUserInfo', {
    name: 'gender',
    data: gender
  })
}
// 选择城市
const confirm = (v: any) => {
  $store.commit('setUserInfo', {
    name: 'province',
    data: Number(v[0].code)
  })
  $store.commit('setUserInfo', {
    name: 'city',
    data: Number(v[1].code)
  })
}
// 选择时间
const confirmY = (v: any) => {
  $store.commit('setUserInfo', {
    name: 'birthday',
    data: v.getTime()
  })
}
// 上传头像
const afterRead = async (file: any) => {
  Toast.fail('服务器升级中,暂不支持头像上传')
  const data = await setUpImg({ aa: 100 })
}
// 头像点击事件
const uploaderclick = () => {
  uploader.value.chooseFile()
}
// 监听用户信息修改
watch(
  user,
  async () => {
    const v = user.value
    const data = await getInfoUpdate({
      city: v.city,
      province: v.province,
      gender: v.gender,
      birthday: v.birthday,
      signature: v.signature
    })
  },
  { deep: true }
)
</script>

<template>
  <div class="myinfo">
    <div class="top-box">
      <van-icon name="down" @click="$router.go(-1)" /> 我的资料
    </div>
    <ul class="basic-info">
      <li @click="uploaderclick">
        <p class="text">头像</p>
        <p class="content">
          <img-com :url="user.picUrl"></img-com>
        </p>
      </li>
      <li>
        <p class="text">昵称</p>
        <p class="content">
          {{ user.nickname }}
        </p>
      </li>
      <li @click="clickEv('gender')">
        <p class="text">性别</p>
        <p class="content">
          {{ user.gender ? (user.gender === 1 ? '男' : '女') : '保密' }}
        </p>
      </li>
      <li>
        <p class="text">二维码</p>
        <p class="content">
          <img-com :url="user.picUrl"></img-com>
        </p>
      </li>
    </ul>

    <ul class="basic-info">
      <li @click="clickEv('birthday')">
        <p class="text">生日</p>
        <p class="content">{{ useTime().getTimeYMD(user.birthday) }}</p>
      </li>
      <li @click="clickEv('city')">
        <p class="text">地区</p>
        <p class="content">
          {{ areaList.province_list[user.province] }}
          {{ areaList.city_list[user.city] }}
        </p>
      </li>
      <li>
        <p class="text">大学</p>
        <p class="content">暂无</p>
      </li>
      <li>
        <p class="text">简介</p>
        <p class="content">
          {{ user.signature }}
        </p>
      </li>
    </ul>
  </div>
  <!-- 文件上传 -->
  <van-uploader ref="uploader" v-show="false" :after-read="afterRead" />
  <van-overlay :show="show" @click="show = false">
    <!-- 选择时间 -->
    <van-datetime-picker
      v-if="info === 'birthday'"
      v-model="date"
      type="date"
      title="选择年月日"
      @confirm="confirmY"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <!-- 选择城市 -->
    <van-area
      title="请选择省市"
      :area-list="areaList"
      :columns-num="2"
      :value="String(user.city)"
      @confirm="confirm"
      v-if="info === 'city'"
    />
    <!-- // 选择性别 -->
    <van-radio-group v-model="user.gender" @click.stop v-if="info === 'gender'">
      <van-cell-group inset>
        <van-cell title="男" clickable @click="checkedGender(1)">
          <template #right-icon>
            <van-radio :name="1" />
          </template>
        </van-cell>
        <van-cell title="女" clickable @click="checkedGender(2)">
          <template #right-icon>
            <van-radio :name="2" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </van-overlay>
</template>

<style lang="less">
.myinfo {
  background-color: #f5f5f5;
  height: 100%;
  .top-box {
    padding: 4px 10px;
    background-color: #fff;
    display: flex;
    height: 30px;
    line-height: 30px;
    .van-icon {
      transform: rotate(90deg);
      font-size: 20px;
      margin-right: 16px;
    }
  }
  ul {
    background-color: #fff;
    padding: 4px 10px;
    margin: 8px 0;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 40px;
      padding: 4px 0;
      border-bottom: 1px solid #f5f5f5;
      &:last-child {
        border: 0;
      }
      .content {
        font-size: 14px;
        color: #aaa;
      }
      .img-com {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }
}
.van-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
<<<<<<< HEAD
  .van-radio-group {
    flex: 1;
  }
  .van-area {
    box-sizing: border-box;
    margin: 10px;
    flex: 1;
    border-radius: 10px;
=======
  .van-datetime-picker,
  .van-radio-group,
  .van-area {
    border-radius: 10px;
    margin: 10px;
    flex: 1;
>>>>>>> origin/master
    overflow: hidden;
    .van-picker-column__item--selected {
      color: #fb4f4e;
    }
  }
<<<<<<< HEAD
  .van-datetime-picker {
    margin: 10px;
    flex: 1;
  }
=======
>>>>>>> origin/master
}
</style>
