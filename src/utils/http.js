import xhr from './xhr'

export default {
  request: function (data) {
    return new Promise((resolve, reject) => {
      xhr(data).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetch (params = {}) {
    return this.request({
      method: 'get',
      data: params
    })
  },
  post (params = {}) {
    return this.request({
      method: 'post',
      data: params,
      headers: {'x-requested-with': 'XMLHttpRequest'}
    })
  }
}
