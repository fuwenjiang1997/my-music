import axios from 'axios'

// 请求时的拦截
axios.interceptors.request.use(function (config) {
  // 发起请求之前做的处理
  return config
}, function (error) {
  return Promise.reject(error)
})

const requestMethod = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  PATH: 'path',
  POST_PATH: 'postPath',
  DELETE_PATH: 'deletePath',
}

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.withCredentials = true; // 跨域允许携带cookie
// axios.defaults.headers.post["content-type"] = "application/x-www-from-urlencoded"; // 设置post请求格式

axios.defaults.headers = {
}

axios.defaults.timeout = 120 * 60 * 1000

export default {
  requestMethod: requestMethod,
  get(url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: options
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  post(url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: options
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  delete(url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: url,
        data: options
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  put(url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: url,
        data: options
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}