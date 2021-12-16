/*
 * @Author: c
 * @Date: 2021-12-02 11:21:46
 * @LastEditTime: 2021-12-02 11:23:18
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\hooks\useJumpPlay.ts
 * 版权声明
 */

import { useRoute, useRouter } from 'vue-router'

export default function (id?: number | undefined) {

  const $router = useRouter()
  $router.push('/')

}
