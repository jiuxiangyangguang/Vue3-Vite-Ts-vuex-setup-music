
interface FnNum {
  (): number
}
interface Time {
  getDate: FnNum
  getFullYear: FnNum
  getSeconds: FnNum
}

export default function () {
  const timeDate: Time = {
    getDate: () => new Date().getDate(),
    getFullYear: () => new Date().getFullYear(),
    getSeconds: () => new Date().getSeconds()
  }

  return timeDate

}