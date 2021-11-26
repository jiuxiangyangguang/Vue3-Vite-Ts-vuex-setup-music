import { get, set } from '@/utils/local'
interface SearchArr {
  value: string;
  date: string;
}
export interface State {
  historyList: Array<SearchArr>
}
export const state: State = {
  historyList: [{ value: '一直循环里', date: '2021/11/12' }]
}
export const mutations = {
  setHistoryList(state: State, payload: SearchArr) {
    state.historyList.push(payload)
    set('historyList', JSON.stringify(state.historyList))
  },
  getHistoryList(state: State) {
    get('historyList')
  }
}

export type CMT = keyof typeof mutations