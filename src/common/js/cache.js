import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  // 如果存在该数据 那么直接返回
  if (index === 0) {
    return
  }
  // 如果存在该数据前面 删掉一条数据
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 向数组的最前插入一条数据
  arr.unshift(val)
  // 如果有设置最大数据并且数组的长度要大于设置的最大数那么数组删除数组最后的数据
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 删除
function deleteFromArray(arr, compare) {
  var index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 删除搜索的单条记录
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item.includes(query)
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 清空搜索历史记录
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 报错播放的歌曲
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

// 加载历史歌曲
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

// 增加喜欢的
export function savaFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 删除
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 加载
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
