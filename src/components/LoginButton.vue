<template>
  <div>
    <q-btn outline
          color="white"
          style="width:150px;"
          label="Login"
          @click="openLoginDialog = true">
    </q-btn>
    <q-dialog v-model="openLoginDialog" @keyup.enter="loginClicked">
      <img src="~assets/userprofileicon.png" style="max-width:150px; margin-top:-15%;z-index:9999;position:absolute">
      <q-card class="dialog" dense style="min-width:40%;max-width:40%;min-height:65%;,max-height:65%;">
        <q-card-section class="row justify-center">
          <h4 style="padding-top:25px;color:#fa928f;">LOGIN TO TRIP PLANNER</h4>
          <q-input dense bg-color="secondary" filled v-model="username" label="Username" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="account_box" />
            </template>
          </q-input>
          <q-input dense bg-color="secondary" filled type="password" v-model="password" label="Password" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-btn label="Login" style="min-width:90%;max-width:90%;background:#fa928f;color:white" @click="loginClicked();showLoading()"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Notify } from 'quasar'
export default{
  data() {
    return {
      openLoginDialog: false,
      username: '',
      password: '',
    }
  },
  methods: {
    loginClicked() {
      setTimeout(()=>{
        console.log(this.username)
      this.$http.post('/api/v1/login', { username: this.username, password: this.password })
        .then((request) => this.loginSuccessful(request))
        .catch((err) => this.loginFailed(err))
      },2000)
      
    },
    loginSuccessful (req) {
      if (!req.data || !req.data.JWTToken) {
        this.loginFailed()
        console.log('cannot find token login failed')
        return
      }
      console.log('login success with',req.data)

      localStorage.token = req.data.JWTToken
      console.log('storing token into local storage')
      this.$router.replace(this.$route.query.redirect || '/Home')
      Notify.create({
        message: 'Login successful',
        color: 'positive',
        textColor: 'black',
        timeout: 3000,
        position: 'top-right',
        icon: 'check_circle'
      })
    },
    loginFailed (err) {
      console.log('login unsuccess',err)
      Notify.create({
        message: 'Invalid username/password',
        color: 'primary',
        textColor: 'white',
        timeout: 3000,
        position: 'top-right',
        icon: 'error'
      })
      delete localStorage.token
    },
    enterToSubmit(){
      const catchEnterKey = evt => {
        if (evt.which === 13 || evt.keyCode === 13) {
          dialog.close()
        }
      }
      window.addEventListener('keyup', catchEnterKey)

      const dialog = Dialog.create({
      onDismiss: () => { window.removeEventListener('keyup', catchEnterKey) }
      })
    },
    showLoading () {
      this.$q.loading.show()

      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 2000)
    }
  },
  beforeDestroy () {
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  }
}
</script>

<style>
  .dialog {
    background-color: #FFFFFF;
  }
</style>
