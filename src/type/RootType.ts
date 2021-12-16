export interface Song {
  name: string
  id: number
  al: AL
  ar: Array<AR>
}
export interface AL {
  id: number
  name: string
  picUrl: string
}
export interface AR {
  id: number
  name: string
}