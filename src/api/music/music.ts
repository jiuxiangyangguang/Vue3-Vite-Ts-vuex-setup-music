interface IDs {
  ids: number | null
}
interface ID {
  id: number | number
}
interface SongId {
  songid: string
}

export default {
  banner: { url: '/banner', type: 'get' }
}


// export function homepage() {
//   return request.get('/homepage/block/page')
// }

// // 获取海报 
// export function getBanner() {
//   return request.get('/banner')
// }
// // 推荐歌单 
// export function getPersonalized(limit: number = 10) {
//   return request.get(`/personalized?limit=${limit}`)
// }
// // 推荐新音乐 
// export function getNewSong(limit: number = 10) {
//   return request.get(`/personalized/newsong?limit=${limit}`)
// }
// // 获取排行榜信息
// export function getTopList() {
//   return request.get('/toplist/detail')
// }

// // 根据id获取歌单详情
// export function getListById(params: ID) {
//   return request.get('/playlist/detail', params)
// }
// // 根据id获取歌曲相关视频
// export function getMvList(params: SongId) {
//   return request.get('/mlog/music/rcmd', params)
// }
// // 热搜列表(简略)
// export function getHot() {
//   return request.get('/search/hot')
// }
// // 热搜列表(详细)
// export function getHotDetail() {
//   return request.get('/search/hot/detail')
// }
// // 搜索建议
// export function getKeyWord(params: string) {
//   return request.get(`/search/suggest?keywords=${params}&type=mobile`)
// }
// // 搜索关键词相关全部信息
// /** 获取新歌速递
//   @param type  1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
// **/
// export function getMultimatch(params: string, type: number = 1, limit: number = 30) {
//   return request.get(`/search/cloudsearch?keywords=${params}&type=${type}&limit=${limit}`)
// }

// // 根据id获取音乐详情
// export function getMusicDetail(params: IDs) {
//   return request.get('/song/detail', params)
// }
