import { commonParams } from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = 'api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    hostUin: 0,
    platform: 'yqq',
    g_tk: '5381',
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
