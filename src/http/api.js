import http from './http'
import PathClass from '@/http/pathClass'

const qqMUrl = '/qqApi'

// let apiUrl = {
//   recommendsApi: {
//     // 推荐页面数据
//     getRecommend: new PathClass(qqMUrl + '/getRecommend', http.requestMethod.GET).questFunc,
//   },
//   singersApi: {
//     getSingerList: new PathClass(qqMUrl + '/getSingerList', http.requestMethod.GET).questFunc,
//   }
// }

export const recommendsApi =  {
  getRecommend: new PathClass(qqMUrl + '/getRecommend', http.requestMethod.GET).questFunc
}

export const singersApi =  {
  getSingerList: new PathClass(qqMUrl + '/getSingerList', http.requestMethod.GET).questFunc
}