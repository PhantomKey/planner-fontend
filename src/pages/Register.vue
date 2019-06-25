<template>
  <!-- Default form register -->
  <div class="box">
    <form class="horizontal" @submit.prevent="submit">
      <h3>Sign up</h3>
      <div style="text-align:center;display:inline-block;margin-top:-2rem;">
        <div class="row">
            <div class="column">
              <div class="set">
                <input class="data" type="text" v-model="user.username" placeholder="username">
              </div>
            </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="set">
                <input class="data" type="text" v-model="user.firstname" placeholder="Firstname">
            </div>
          </div>
          <div class="column">
            <div class="set">
              <input class="data" type="text" v-model="user.lastname" placeholder="Lastname" style="margin-left:2rem;">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="set">
            <input class="data" type="email" v-model="user.email" placeholder="Email: Example@xxx.com">
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="set">
              <input class="data" type="password" v-model="user.password" placeholder="password">
            </div>
            <div class="set" style="margin-top:2rem;">
              <p class="gray-text">Your birthday</p>
              <input type="date" v-model="user.birthday" placeholder="">
            </div>
          </div>
          <div class="column">
            <div class="set">
              <input class="data" type="password" v-model="user.cpassword" placeholder="confirm password" style="margin-left:2rem;">
            </div>
             <div class="set" style="margin-top:2rem;">
                <p class="gray-text">Gender</p>
                <input type="radio" name="Gender" id="Gender" value=m v-model="user.gender"> male <input type="radio" name="Gender" id="gender" value=f v-model="user.gender"> female
              </div>
          </div>
        </div>
      </div>
      <div class="btnlayout">
            <button type="submit" class="btn">Register</button>
      </div>
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
}
p{
  text-align: left;
  font-size: 1rem;
  margin-left: 2rem;
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
</style>
