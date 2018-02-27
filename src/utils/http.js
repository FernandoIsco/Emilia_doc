import xhr from './xhr'

export default {
  fetch (params = {}) {
    /* let param = ''
    if (params) {
      for (let k in params) {
        param += k + '=' + params[k] + '&'
      }
      param = param.toString().substring(0, param.length - 1)
    } */

    return new Promise((resolve, reject) => {
      xhr({
        method: 'get',
        data: params
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  post (params = {}) {
    return new Promise((resolve, reject) => {
      xhr({
        method: 'post',
        data: params,
        headers: {'x-requested-with': 'XMLHttpRequest'}
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
