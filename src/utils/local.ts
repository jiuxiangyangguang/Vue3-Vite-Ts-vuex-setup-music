/* 封装本地存储方法 */

export function set(k: string, v: any) {
  window.localStorage.setItem(k, v)
}

export function get(k: string) {
  return window.localStorage.getItem(k)
}

export function cle() {
  window.localStorage.clear()
}

export function ref(val: string) {
  window.localStorage.removeItem(val)
}
