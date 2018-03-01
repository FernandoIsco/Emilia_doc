<template>
  <div class="dialog">
    <div class="dialog-bg" @click="close()"></div>
    <div class="modal">
      <div class="modal-header">
        <span class="modal-close" @click="close()">x</span>
      </div>
      <div class="form">
        <div class="form-input">
          <label>admin: </label><input type="text" class="input-area" v-model="adminName" autocomplete="off">
        </div>
        <div class="form-input">
          <label>password: </label><input type="password" class="input-area" v-model="adminPwd" autocomplete="off">
        </div>
        <div class="form-input form-btn">
          <button class="btn" @click="loginAct">submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      adminName: '',
      adminPwd: ''
    }
  },
  methods: {
    close: function () {
      this.$emit('login', [0])
    },
    loginAct: function () {
      if (!this.adminName || !this.adminPwd) return false

      let _ = this
      let data = {n: 'userLogin', q: {name: this.adminName, password: this.adminPwd}}
      _.$http.post(data).then(function (data) {
        _.$cookie.set('userName', data.result.userInfo.name)
        _.$cookie.set('isAdmin', data.result.userInfo.admin)
        window.location.reload()
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  props: ['show']
}
</script>

<style>
  .dialog {position: fixed; top: 0; left: 0; width: 100%; height: 100%;z-index: 1501;}

  .dialog-bg {position: absolute;width: 100%; height: 100%;background: #fff; opacity: 0; filter: alpha(opacity=50);}
  .modal {position: absolute;width: 480px; height: 220px; border: 1px #ccc solid; border-radius: 5px; background-color: #fff;box-shadow: 0 0 30px #888;top: 30%; left: 35%}

  .modal-header {height: 30px;width: 100%; border-bottom: 1px rgba(0,0,0,0.1) solid;}
  .modal-close {float: right;width: 24px; height: 24px;line-height: 30px;cursor: pointer;font-size: 20px;}
  .modal-close:hover {color: #42b983;}

  .form {padding: 20px 50px; }
  .form-input {padding: 10px 0;width: 360px;font-size: 16px;}
  .form label {display: inline-block;width: 80px;}
  .input-area {width: 240px; height: 30px; outline: none; line-height: 30px; color: #2c3e50; padding: 0 15px; border: 1px solid #e3e3e3; border-radius: 5px;}
  .form-btn {text-align: center;}
  .btn {border: none;border-radius: 5px;padding: 5px 10px; cursor: pointer;outline: none;background-color: #ccc;}
</style>
