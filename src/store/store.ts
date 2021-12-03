/*
 * @Author: c
 * @Date: 2021-11-26 16:32:01
 * @LastEditTime: 2021-12-03 10:00:32
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
interface CurrentPlay {
  name: string
  songName: string
  id: number
  picUrl: string
}
const audio = {
  playFlag: false, // 是否播放
  lineFlagPlay: false, // 进度条控制
  currentAudioLength: 0, // 当前播放长度
  durationAudioLength: 0, // 音乐长度
  setCurrentLen: 0, // 设置当前长度
  progerssAudioLength: 0,
  totalAudioLength: 0,
  mode: 0 as 0 | 1 | 2, // 0:正常列表循环 1：随机播放 2：单曲循环
  mute: false, // 是否静音,
  jump: -1,
  prev: false,
  next: false,
  volume: 50, // 音量
  lyric: '', // 歌词
  index: 0, // 当前播放第几首 数组索引
  currentPlay: [] as Array<CurrentPlay>,
  currentPlayLen: 0
}
const currentPlay = {}
type Audio = typeof audio



export interface State {
  historyList: Array<SearchArr>
  audio: Audio,
}

export const state: State = {
  historyList: [],
  audio
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
  },
  setCurrentPlay(state: State, obj: CurrentPlay) {
    state.audio.currentPlay.unshift(obj)
    state.audio.currentPlayLen = state.audio.currentPlay.length
    set('audio', JSON.stringify(state.audio))
  },
  setPlayFlag(state: State, flag: boolean) {
    state.audio.playFlag = flag
  },
  setPlayFlags(state: State) {
    state.audio.playFlag = !state.audio.playFlag
  },
  setCurrentAudioLength(state: State, length: number) {
    state.audio.currentAudioLength = length || 0
  },
  setDurationAudioLength(state: State, length: number) {
    state.audio.durationAudioLength = length || 0
  },
  setSetCurrentLen(state: State, length: number) {
    state.audio.setCurrentLen = length
  },
  setIndex(state: State, index: number) {
    state.audio.index = index
  },
  setMode(state: State, mode: 0 | 1 | 2) {
    state.audio.mode = mode
  }
}

export type CMT = keyof typeof mutations