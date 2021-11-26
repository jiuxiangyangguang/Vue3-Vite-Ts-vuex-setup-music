import { log } from "console";

interface Time {
  getDate: () => number
  getFullYear: () => number
  getSeconds: () => number
  getTimeYMD: (e: number | undefined) => string
  getTimeYMDHMS: (e: number | undefined) => string
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
    }
  }

  return timeDate

}