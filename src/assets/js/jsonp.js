const originJsonp = require('jsonp')

export default function (url, data, option) {
  return new Promise((resolve, reject) => {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(data[k])}`
  }
  return url ? url.substring(1) : ''
}