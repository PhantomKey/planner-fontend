<template>
  <!-- Default form login -->
  <div class=box>
    <div class=row>
      <div class="column pic">
        <div class="container">
          <div style=" color:black;vertical-align:middle;margin-top:50%;">“The world is a book and those who do not travel read only one page.”</div>
        </div>
      </div>
      <div class="column log">
        <form @submit.prevent="login">
          <br>
          <h3>Sign in</h3>
          <div class="" v-if="error" style="color:red">{{ error }}</div>
          <div class="container-1">
            <span class="icon" style="margin-top:0.3rem"><i class="fa fa-user" aria-hidden="true"></i></span>
            <input class="data" type="text" v-model="username" placeholder="username" style="margin-top:1rem"/>
          </div>
          <div class="container-1">
            <span class="icon" style="margin-top:1.3rem;"><i class="fas fa-key"></i></span>
            <input class="data" type="password" v-model="password" placeholder="password" style="margin-top:2rem"/>
          </div>
          <button type="submit" class="btn btn-round color-1">Login</button>
          <p class="register">Don't have account? <span @click="$router.push('/Register')" style="cursor:pointer;">Register </span></p>
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
      this.$router.replace(this.$route.query.redirect || '/Home')
    },
    loginFailed () {
      console.log('nooo')
      this.error = 'Username or password incorrect'
      delete localStorage.token
    }
  }
}
</script>

<style scoped>

input{
  float: left;
  margin-left: 2.5rem;
  display: block;
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
  background-color: bisque;
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
  text-align:center;
  clear: both;
}
.row{
  height: 100%;
}
.pic{
  background-image: url("/assets/beach.jpg");
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 50%;
  background-color:bisque;
}
/* textbox */
.data{
  width: 300px;
  height: 50px;
  background:#F2F1EF;
  border: none;
  font-size: 10pt;
  float: left;
  color: #2b303b;
  padding-left: 45px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  display: block;

  -webkit-transition: background .55s ease;
  -moz-transition: background .55s ease;
  -ms-transition: background .55s ease;
  -o-transition: background .55s ease;
  transition: background .55s ease;
}
.data::-webkit-input-placeholder {
   color: #65737e;
}
.data:-moz-placeholder { /* Firefox 18- */
   color: #65737e;
}
.data::-moz-placeholder {  /* Firefox 19+ */
   color: #65737e;
}
.data:hover, .data:focus, .data:active{
    outline:none;
    background: #ffffff;
}
/* button style */
.btn {
  margin-top: 2.5rem;
  border: none;
  color: white;
  overflow: hidden;
  padding: 0;
  text-transform: uppercase;
  width: 250px;
  height: 40px;
  position: relative;
}
.btn.color-1 {
  background-color: #426FC5;
}
.btn-round {
  border-radius: 10em;
}
/* register */
.register{
  display: block;
  margin-left: 4.5rem;
  margin-top: 2rem;
}
.register>span{
  text-decoration: underline;
  -webkit-transition: color .55s ease;
  -moz-transition: color .55s ease;
  -ms-transition: color .55s ease;
  -o-transition: color .55s ease;
  transition: color .55s ease;
}
.register>span:hover{
  color:#00897b;
}
/* __________________ */
.container-1{
  margin-top: 1rem;
  width: 300px;
  height: 50px;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
}
.container-1 .icon{
  position: absolute !important;
  top: 50%;
  margin-left: -5.6rem;
  z-index: 1;
  color: #4f5b66;
}
.container-1 input#search:hover, .container-1 input#search:focus, .container-1 input#search:active{
    outline:none;
    background: #ffffff;
  }
.container {
  height:100%;
  position: relative;
  text-align: center;
  color: white;
}
img {
  height:162%;
  width: 100%;
  vertical-align: mididle;
}
</style>
