export default {
  install (Vue, options) {
    Vue.prototype.xhrData = function (method, data, header) {
      let param = data || {}
      let url = Vue.prototype.baseUrl

      if (method.toLowerCase() === 'get') {
        param = '?'
        for (let k in data) {
          param += k + '=' + data[k] + '&'
        }
        param = param.toString().substring(0, param.length - 1)

        url += param
      }

      let json = {method: method, url: url, data: param}

      if (method.toLowerCase() !== 'get') {
        header = header || {}
        header['x-requested-with'] = 'XMLHttpRequest'

        json.headers = header
      }

      return json
    }
  }
}
