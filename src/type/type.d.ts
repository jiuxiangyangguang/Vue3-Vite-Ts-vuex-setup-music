interface Song {
  name: string
  id: number
  al: AL
  ar: Array<AR>
}

interface AL {
  id: number
  name: string
  picUrl: string
}
interface AR {
  id: number
  name: string
}
interface PlayListS {
  name: string
  id: number
  coverImgUrl: string
  trackCount: number
  playCount: number
}
interface MlogList {
  moreText?: string
  resources?: []
}
interface PlayListV {
  moreText?: string
  playLists?: Array<PlayListS>
}
interface SongList {
  moreText?: string
  songs?: Array<Song>
}

interface HOT {
  first?: string
  iconType?: number
  second?: number
}

interface SongS {
  name: string
  id: number
  album: ALB
  artists: Array<ART>
}
interface ALB {
  id: number
  name: string
  picUrl?: string
}
interface ART {
  id: number
  name: string
}
interface PlayList {
  id: number
  coverImgUrl: string
  name: string
  playCount: number
  creator: any
  trackCount: number
}
interface Lyric {
  time?: number
  text?: string
}
interface MusicList {
  id: string
  name: string
  url: string
}
interface Img {
  id: number
  name: string
  picUrl: string
}

interface SongList {
  commentCount?: number
  name?: string
  shareCount?: number
  subscribedCount?: number
  tags?: Array<string>
  trackIds?: Array<any>
  trackUpdateTime?: number
  tracks?: Array<any>
  coverImgUrl?: string
}

interface infoIcon {
  name: string
  icon: string
}
interface Login {
  email?: string
  password?: string
  phone?: string
  md5_password?: string
}
interface LoginObj {
  name: string
  data: string
}
interface Icon {
  name: string
  data: string
}
