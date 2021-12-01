/*
 * @Author: c
 * @Date: 2021-11-26 16:32:01
 * @LastEditTime: 2021-12-01 18:22:40
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\store\store.ts
 * 版权声明
 */
import { get, set, ref } from '@/utils/local'
interface SearchArr {
  value: string;
  date: string;
}
export interface State {
  historyList: Array<SearchArr>
}
export const state: State = {
  historyList: []
}
export const mutations = {
  setHistoryList(state: State, payload: SearchArr) {
    state.historyList.unshift(payload)
    set('historyList', JSON.stringify(state.historyList))
  },
  getHistoryList(state: State) {
    if (get('historyList')) {
      state.historyList = JSON.parse(get('historyList') as string) || []
    }
  },
  deHistoryList(state: State) {
    state.historyList = []
    ref('historyList')
  }
}

export type CMT = keyof typeof mutations