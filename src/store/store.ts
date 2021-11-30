import { get, set } from '@/utils/local'
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
    state.historyList.push(payload)
    set('historyList', JSON.stringify(state.historyList))
  },
  getHistoryList(state: State) {
    if (get('historyList')) {
      state.historyList = JSON.parse(get('historyList') as string) || []
    }
  }
}

export type CMT = keyof typeof mutations