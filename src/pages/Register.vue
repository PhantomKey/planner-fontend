<template>
  <!-- Default form register -->
  <div class="box">
    <form class="horizontal" @submit.prevent="submit">
      <h3>Sign up</h3>
      <div style="text-align:center;display:inline-block;margin-top:-4rem;">
        <div class="row">
            <div class="column">
              <div class="set">
                <span class="icon" style="margin-left:-8rem;"><i class="fas fa-user"></i></span>
                <input class="data" type="text" v-model="user.username" placeholder="username">
              </div>
            </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="set">
              <span class="icon" style="margin-left:-8rem;"><i class="fas fa-user"></i></span>
                <input class="data" type="text" v-model="user.firstname" placeholder="Firstname">
            </div>
          </div>
          <div class="column">
            <div class="set">
              <span class="icon"><i class="fas fa-user"></i></span>
              <input class="data" type="text" v-model="user.lastname" placeholder="Lastname" style="margin-left:2rem;">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="set">
            <span class="icon" style="margin-left:-8rem;"><i class="fas fa-envelope"></i></span>
            <input class="data" type="email" v-model="user.email" placeholder="Email: Example@xxx.com">
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="set">
              <span class="icon" style="margin-left:-8rem;"><i class="fas fa-lock"></i></span>
              <input class="data" type="password" v-model="user.password" placeholder="password">
            </div>
            <div class="set" style="margin-top:2rem;">
              <span class="icon" style="margin-left:-8rem;margin-top:3.3rem;"><i class="fas fa-calendar-alt"></i></span>
              <p class="gray-text" style="margin-top:2rem;">Your birthday</p>
              <input class="data"  style="margin-top:-0.3rem;" type="date" v-model="user.birthday" placeholder="birthday">
            </div>
          </div>
          <div class="column">
            <div class="set">
              <span class="icon"><i class="fas fa-lock"></i></span>
              <input class="data" type="password" v-model="user.cpassword" placeholder="confirm password" style="margin-left:2rem;">
            </div>
             <div class="set" style="margin-top:4rem;">
                <p class="gray-text" style="margin-left:2rem;">Gender</p>
                <div class="cntr">
                  <label for="male" class="radio">
                    <input name="rdo" class="hidden" type="radio" id="male" value=m v-model="user.gender">
                    <span class="label"><p>male</p></span>
                  </label>
                  <label for="female" class="radio">
                    <input name="rdo" class="hidden" type="radio" id="female" value=f v-model="user.gender">
                    <span style="margin-left:4rem;" class="label"><p>female</p></span>
                  </label>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="btnlayout" style="margin-top:2rem">
            <button type="submit" class="btn">Register</button>
      </div>
      <p style="text-align:center;margin-top:1rem;margin-left:0rem;padding-left:0px" class="login">Have account?  <span @click="$router.push('/Login')">Sign in</span></p>
    </form>
  </div>
  <!-- Default form register -->
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        cpassword: '',
        birthday: '',
        gender: ''
      }
    }
  },
  methods: {
    submit () {
      if (this.checkpassword()) {
        console.log(this.user.username)
        this.$http.post('/register/', { username: this.user.username, firstname: this.user.firstname, lastname: this.user.lastname, password: this.user.password, email: this.user.email, dob: this.user.birthday, gender: this.user.gender })
          .then(request => this.registersucess(request))
          .catch(() => this.registerFailed())
      }
      console.log(this.user)
    },
    registersucess (req) {
      console.log('woohoo')
      console.log(req.data)
      if (req.data.code === 201) {
        console.log('success')
        alert('success')
        this.$router.replace(this.$route.query.redirect || '/')
      } else {
        console.log('wtf')
        this.registerFailed()
      }
    },
    registerFailed () {
      console.log('Register Fail')
    },
    checkpassword () {
      console.log('haha')
      if (this.user.password !== this.user.cpassword) {
        alert('password not match')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
.hset{
  width: fit-content !important;
  text-align: left;
  display: inline-block !important;
}
.set{
  display: inline-block;
  margin-top: 1.5rem;
  width: 300px;
  height: 50px;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
}
.set .icon{
  position: absolute !important;
  top: 50%;
  z-index: 1;
  color: #4f5b66;
}
.set input#search:hover, .container-1 input#search:focus, .container-1 input#search:active{
    outline:none;
    background: #ffffff;
  }
.icon{
  margin-top:1.3rem;
  margin-left: -6rem; 
}
p{
  text-align: left;
  font-size: 10pt;
  color: #2b303b;
  padding-left: 45px;
}
h3{
  margin-top: 1rem;
  text-align: center;
  text-decoration: underline cornflowerblue;
}
.box{
  margin-left: auto;
  margin-right: auto;
  margin-top: 1%;
  margin-bottom: 5%;
  width: 50rem;
  height: auto;
  border-radius: 20px;
  border-style: hidden;
  box-shadow: 5px 10px 8px 10px #888888;
  text-align: center;
}
form{
  width: 90%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align:center;
  display: inline-block;
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
.data{
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
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
  display: inline;

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
.btn {
  margin-top: 2.5rem;
  margin-left: auto;
  margin-right: auto;
  border: none;
  color: white;
  overflow: hidden;
  padding: 0;
  text-transform: uppercase;
  width: 250px;
  height: 40px;
  position: relative;
  background-color: #426FC5;
  border-radius: 10em;
}
.btnlayout{
  text-align: center;
}
.login>span{
  background-color: transparent;
  text-decoration: underline;
  -webkit-transition: color .55s ease;
  -moz-transition: color .55s ease;
  -ms-transition: color .55s ease;
  -o-transition: color .55s ease;
  transition: color .55s ease;
}
.login>span:hover{
  color: #2ecc71;
  shadow: 0 5px 15px rgba(145, 92, 182, .4);
}
.radio {
  position: relative;
  cursor: pointer;
  line-height: 20px;
  font-size: 14px;
  margin: 15px;
}
.radio .label {
  position: relative;
  display: block;
  float: left;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border: 2px solid #c8ccd4;
  border-radius: 100%;
  -webkit-tap-highlight-color: transparent;
}
.radio .label:after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #225cff;
  transform: scale(0);
  transition: all 0.2s ease;
  opacity: 0.08;
  pointer-events: none;
}
.radio:hover .label:after {
  transform: scale(3.6);
}
input[type="radio"]:checked + .label {
  border-color: #225cff;
}
input[type="radio"]:checked + .label:after {
  transform: scale(1);
  transition: all 0.2s cubic-bezier(0.35, 0.9, 0.4, 0.9);
  opacity: 1;
}
.cntr {
  margin-top: 0.5rem;
  position:absolute;
  margin-left: 2rem; 
}
.hidden {
  display: none;
}
</style>
