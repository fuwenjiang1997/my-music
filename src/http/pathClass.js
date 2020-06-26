import http from '@/http/http'

export default class  {
  constructor(path, requestMethod) {
    this.path = path
    this.requestMethod = requestMethod || http.requestMethod.GET
    this.questFunc = (options, success, error, urlParams) => {
      console.log(options, urlParams)
      options = options || {}
      let requestFun, requestPath
      if (this.requestMethod === http.requestMethod.PATH) {
        requestPath = this.path + urlParams
        requestFun = http.requestMethod.GET
      } else if (this.requestMethod === http.requestMethod.POST_PATH) {
        requestPath = this.path + urlParams
        requestFun = http.requestMethod.POST
      } else if (this.requestMethod === http.requestMethod.DELETE_PATH) {
        requestPath = this.path + urlParams
        requestFun = http.requestMethod.DELETE
      } else {
        requestPath = this.path
        requestFun = this.requestMethod
      }

      http[requestFun](requestPath, options).then(res => {
        success && success(res)
      }).catch(err => {
        error && error(err)
      })
    }
  }
}