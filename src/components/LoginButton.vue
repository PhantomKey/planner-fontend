<template>
  <div>
    <q-btn outline
          color="white"
          style="width:150px;"
          label="Login"
          @click="openLoginDialog = true">
    </q-btn>
    <q-dialog v-model="openLoginDialog">
      <img src="~assets/userprofileicon.png" style="max-width:150px; margin-top:-15%;z-index:9999;position:absolute">
      <q-card class="dialog" dense style="min-width:40%;max-width:40%;min-height:65%;,max-height:65%;">
        <q-card-section class="row justify-center">
          <h4 style="padding-top:25px">LOGIN TO TRIP PLANNER</h4>
          <q-input bg-color="#ffeeef" filled v-model="username" label="Username" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="account_box" />
            </template>
          </q-input>
          <q-input bg-color="#ffeeef" filled type="password" v-model="password" label="Password" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-btn label="Login" style="min-width:90%;max-width:90%;background:#fa928f;color:white" @click="loginClicked()"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default{
  data() {
    return {
      openLoginDialog: false,
      username: '',
      password: ''
    }
  },
  methods: {
    loginClicked() {
      console.log(this.username)
      this.$http.post('/api/v1/login', { username: this.username, password: this.password })
        .then((request) => this.loginSuccessful(request))
        .catch((err) => this.loginFailed(err))
    },
    loginSuccessful (req) {
      if (!req.data || !req.data.JWTToken) {
        this.loginFailed()
        console.log('cannot find token login failed')
        return
      }
      console.log('login success with',req.data)

      localStorage.token = req.data.JWTToken
      this.error = false
      console.log('storing token into local storage')
      this.$router.replace(this.$route.query.redirect || '/Home')
    },
    loginFailed (err) {
      console.log('login unsuccess',err)
      this.error = 'Username or password incorrect'
      delete localStorage.token
    }
  }
}
</script>

<style>
  .dialog {
    background-color: #fff9f9;
  }
</style>
