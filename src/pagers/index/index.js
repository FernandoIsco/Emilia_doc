import commonHeader from '@/components/header'
import LoginDialog from '@/components/login'

export default {
  name: 'Index',
  data () {
    return {
      blogs: [],
      page: 1,
      scrollTimeout: 0,
      scrollable: true
    }
  },
  created: function () {
    this.getBlogs()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    getBlogs () {
      if (!this.scrollable) return false

      let _ = this
      let data = {n: 'blogs', q: {ta: {pa: this.page, li: 10, or: {'created_at': 'desc'}}}}
      this.$http.fetch(data).then(function (data) {
        for (let i = 0; i < data.result.list.length; i++) {
          _.blogs.push(data.result.list[i])
        }

        if (parseInt(data.result.rows) === 0) _.scrollable = false
      }).catch(function (error) {
        console.log(error)
      })
    },
    handleScroll () {
      this.scrollTimeout && clearTimeout(this.scrollTimeout)

      let _ = this
      if ((1600 * this.page - window.scrollY) < 1000) {
        _.page += 1
        _.getBlogs()
      }
    }
  },
  filters: {
    getHref (val) {
      return '#/blog/' + val
    }
  },
  components: {commonHeader, LoginDialog}
}
