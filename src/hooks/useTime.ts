/*
 * @Author: c
 * @Date: 2021-11-16 18:37:14
 * @LastEditTime: 2021-12-02 16:51:01
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\hooks\useTime.ts
 * 版权声明
 */
import { log } from "console";

interface Time {
  getDate: () => number
  getFullYear: () => number
  getSeconds: () => number
  getTimeYMD: (e: number | undefined) => string
  getTimeYMDHMS: (e: number | undefined) => string
  getMS: (e: number) => string
}

export default function (time?: number | undefined) {

  const timeDate: Time = {
    getDate: () => new Date().getDate(),
    getFullYear: () => new Date().getFullYear(),
    getSeconds: () => new Date().getSeconds(),
    getTimeYMD: (time) => {
      const date = new Date(time || 0);
      const YY = date.getFullYear() + '-';
      const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      const hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      const mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      const ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return (YY + MM + DD)
    },
    getTimeYMDHMS: (time) => {
      const date = new Date(time || 0);
      const YY = date.getFullYear() + '-';
      const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      const hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      const mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      const ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return (YY + MM + DD + " " + hh + mm + ss)
    },
    getMS: (time) => {
      time = Math.floor(time)
      if (time >= 60) {
        const mm = time / 60 < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60)
        const ss = time % 60 < 10 ? `0${time % 60}` : time % 60
        return mm + ':' + ss
      } else {
        const ss = time % 60 < 10 ? `0${time % 60}` : time % 60
        return '00' + ':' + ss
      }

    }
  }

  return timeDate

}