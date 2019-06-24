<template>
  <!-- Default form login -->
  <div class=box>
    <div class=row>
      <div class="column pic">
      </div>
      <div class="column log">
        <form @submit.prevent="login">
          <br>
          <h3>Sign in</h3>
          <div class="" v-if="error">{{ error }}</div>
          <p class="grey-text">Your email/ Username </p>
          <input type="text" v-model="username"/>
          <br>
          <br>
          <p class="grey-text">Your password </p>
          <input type="password" v-model="password"/>
          <br>
          <p></p>
          <div class="text-center">
            <button class="btn btn-primary" type="submit" >Login</button>
          </div>
        </form>
      </div>
    </div>
</div>
  <!-- Default form login -->
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  methods: {
    login () {
      console.log(this.username)
      this.$http.post('/api/v1/login', { username: this.username, password: this.password })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful (req) {
      if (!req.data.JWTToken) {
        console.log(req.data)
        this.loginFailed()
        console.log('haha')
        return
      }

      localStorage.token = req.data.JWTToken
      this.error = false
      console.log('haha1')
      this.$router.replace(this.$route.query.redirect || '/planner')
    },
    loginFailed () {
      console.log('nooo')
      this.error = 'Login failed!'
      delete localStorage.token
    }
  }
}
</script>

<style scoped>

#defaultFormLoginEmailEx #defaultFormLoginPasswordEx{
  text-align: left;
}
p{
  text-align: left;
  font-size: 1rem;
  margin-left: 2rem;
}
h3{
  margin-top:-5%;
  text-decoration: underline cornflowerblue;
}
.box{
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  width: 50rem;
  height: 35rem;
  border-radius: 20px;
  border-style: hidden;
  box-shadow: 5px 10px 8px 10px #888888;
}
.log{
  width: 50%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align:center;
}
.form{
  width: 50%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  /* text-align:center; */
  clear: both;
}
.row{
  height: 100%;
}
.pic{
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 50%;
  background-color: bisque;
}
</style>
