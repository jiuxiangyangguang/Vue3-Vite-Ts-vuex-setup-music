/*
 * @Author: c
 * @Date: 2021-11-26 16:32:01
 * @LastEditTime: 2021-12-05 19:39:07
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\store\store.ts
 * 版权声明
 */
import { get, set, ref } from '@/utils/local'
interface route {
  name: string,
  path: string
}
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
  durationAudioLength: 0, // 音乐播放长度
  setCurrentLen: 0, // 设置当前长度
  progerssAudioLength: 0,
  totalAudioLength: 0,
  mode: 0 as 0 | 1 | 2, // 0:正常列表循环 1：随机播放 2：单曲循环
  mute: false, // 是否静音,
  jump: -1,
  prev: false,
  next: false,
  volume: 0.5, // 音量 [0,1]
  lyric: '', // 歌词
  index: 0, // 当前播放第几首 数组索引
  currentPlay: [] as Array<CurrentPlay>,
  currentPlayLen: 0,
  animation: {
    flag: true,
    mode: 'circlewave'
  }
}
const userInfo = {
  uid: '',
  nickname: '未登录',
  picUrl: '',
  follows: 0,
  followeds: 0,
  eventCount: 0,
  isLogin: false,
  likeArr: [] as Array<number>,
  city: '',
  province: '',
  gender: 0 as 0 | 1 | 2,
  birthday: 0,
  signature: ''
}
const skin = {
  progress: 'hhua',
  lineColor: '#ff5345'
}


const currentPlay = {}
type Audio = typeof audio
type UserInfo = typeof userInfo
type Skin = typeof skin



export interface State {
  historyList: Array<SearchArr>
  audio: Audio,
  showPlayList: boolean,
  routeArr: Array<route>,
  userInfo: UserInfo,
  skin: Skin,
  localMusic: Array<CurrentPlay>
}

export const state: State = {
  historyList: [],
  audio: { ...audio },
  showPlayList: false,
  routeArr: [],
  userInfo: { ...userInfo },
  skin,
  localMusic: []
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
  setCurrentPlayCle(state: State) {
    state.audio.currentPlay.length = 0
  },
  setCurrentPlayRef(state: State, index: number) {
    state.audio.currentPlay.splice(index, 1)
    state.audio.currentPlayLen = state.audio.currentPlay.length
    if (state.audio.index) state.audio.index--
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
  resAudio(state: State) {
    state.audio = audio
  },
  setAnimation(state: State, animation: boolean) {
    state.audio.animation.flag = animation
    set('audio', JSON.stringify(state.audio))
  },
  setIndex(state: State, index: number) {
    if (index < 0) {
      state.audio.index = state.audio.currentPlayLen - 1
    } else if (index === state.audio.currentPlayLen) {
      state.audio.index = 0
    } else {
      state.audio.index = index
    }
  },
  setMode(state: State, mode: 0 | 1 | 2) {
    state.audio.mode = mode
  },
  setVolume(state: State, num: number) {
    state.audio.volume = num
  },
  setShowPlayList(state: State) {
    state.showPlayList = !state.showPlayList
  },
  setUserInfo(state: State, obj: LoginObj) {
    state.userInfo[obj.name] = obj.data
    set('userInfo', JSON.stringify(state.userInfo))
  },
  setUserInfoCle(state: State) {
    state.userInfo = userInfo
    ref('userInfo')
    ref('token')
  },
  setlikeArrRef(state: State, id: number) {
    state.userInfo.likeArr = state.userInfo.likeArr.filter(item => item !== id)
  },
  setlikeArrAdd(state: State, id: number) {
    state.userInfo.likeArr.push(id)
  },
  setSkinIcon(state: State, icon: Icon) {
    state.skin[icon.name] = icon.data
    set('skin', JSON.stringify(state.skin))
  },
  setLocalMusic(state: State, obj: CurrentPlay) {
    if (state.localMusic.some(item => item.id === obj.id)) return
    state.localMusic.unshift(obj)
    set('localMusic', JSON.stringify(state.localMusic))
  },
  setAntMode(state: State, mode: string) {
    state.audio.animation.mode = mode
  },
  setAntFlag(state: State, flag: boolean) {
    state.audio.animation.flag = flag
  },

  setRouteArr(state: State, route: route) {
    // 不重复添加路由
    if (state.routeArr.some(item => item.name === route.name)) return
    state.routeArr.push(route)
  },
  setLocation(state: State) {
    set('audio', JSON.stringify(state.audio))
    set('userInfo', JSON.stringify(state.userInfo))
  },
  getLocation(state: State) {
    //@ts-ignore
    const audiodata = get('audio') && JSON.parse(get('audio'))
    //@ts-ignore
    const userInfoData = get('userInfo') && JSON.parse(get('userInfo'))
    //@ts-ignore
    const skin = get('skin') && JSON.parse(get('skin'))
    //@ts-ignore
    const localMusic = get('localMusic') && JSON.parse(get('localMusic'))
    state.audio = Object.assign(state.audio, audiodata)
    state.userInfo = Object.assign(state.userInfo, userInfoData)
    state.localMusic = Object.assign(state.localMusic, localMusic)
    state.skin = Object.assign(state.skin, skin)
    state.audio.playFlag = false
  }
}

export type CMT = keyof typeof mutations