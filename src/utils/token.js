import md5 from 'js-md5'

let sign = {
  getToken: function (params, key) {
    console.log(sign.assemble(params))
    return md5(sign.assemble(params) + key).toUpperCase()
  },
  assemble: function (params) {
    if (typeof params !== 'object' || params === null) return ''
    let key = Object.keys(params).sort()

    let str = ''
    for (let i = 0; i < key.length; i++) {
      str += key[i] + (typeof params[key[i]] === 'object' ? sign.assemble(params[key[i]]) : params[key[i]])
    }
    return str
  }
}

export default sign
