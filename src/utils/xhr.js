import axios from 'axios'
import cookie from './cookie'
import apiConfig from './config'
import token from './token'

axios.defaults.timeout = apiConfig.apiTimeout
axios.defaults.baseURL = apiConfig.apiUrl

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (typeof config.data === 'undefined') config.data = {}
    config.data.s = cookie.get('session')
    config.data.t = (new Date()).getTime()
    config.data.i = apiConfig.identity
    config.data.sr = apiConfig.source
    config.data.q = Object.assign({}, config.data.q)
    config.data.si = token.getToken(config.data, apiConfig.key)
    config.data = JSON.stringify(config.data)

    if (config.method.toLowerCase() === 'get') {
      config.url = axios.defaults.baseURL + '?query=' + config.data
    } else {
      config.headers = Object.assign(config.headers, {'Content-Type': 'application/json'})
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error.response.data)
  }
)

export default axios
