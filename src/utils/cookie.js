let cookie = {
  set: function (name, value, time, path, domain) {
    let expires = new Date()
    expires.setTime(expires.getTime() + time)

    document.cookie = name + '=' + escape(value) + '; expires=' + expires.toGMTString() + (path ? '; path=' + path : '') + (domain ? '; domain=' + domain : '')
  },
  get: function (name) {
    let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))

    if (arr != null) return unescape(arr[2])
    return null
  },
  del: function () {
    let expires = new Date()
    expires.setTime(expires.getTime() - 1)

    let val = this.get(name)
    if (val != null) document.cookie = name + '=' + val + '; expires=' + expires.toGMTString()
  }
}

export default cookie
