import http from './http'
import PathClass from '@/http/pathClass'

let apiUrl = {
  recommends: {
    getRecommend: new PathClass('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', http.requestMethod.GET).questFunc
  }
}

export default apiUrl