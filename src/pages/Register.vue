<template>
  <!-- Default form register -->
  <div class="box">
    <form class="">
      <br>
      <h3>Sign up</h3>
      <p class="grey-text">Your username</p>
      <input type="text" v-model="user.username">
      <br>
      <p class="grey-text">Your Firstname</p>
      <input type="text" v-model="user.firstname">
      <br/>
      <p class="grey-text">Your Lastname</p>
      <input type="text" v-model="user.lastname">
      <br>
      <p class="grey-text">Your email</p>
      <input type="email" v-model="user.email">
      <br/>
      <p for="defaultFormRegisterPasswordEx" class="grey-text">Your password</p>
      <input type="password" v-model="user.password">
      <br>
      <p class="grey-text">Confirm your password</p>
      <input type="password" v-model="user.cpassword">
      <br>
      <p class="gray-text">Your birthday</p>
      <input type="date" v-model="user.birthday">
      <p></p>
      <div class="text-center mt-4">
        <button class="btn btn-unique" @click="submit" type="submit">Register</button>
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
        birthday: ''
      }
    }
  },
  methods: {
    submit () {
      this.checkpassword()
      console.log(this.user)
    },
    checkpassword () {
      if (this.user.password !== this.user.cpassword) {
        alert('password not match')
      }
    }
  }
}
</script>

<style scoped>
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
  height: auto;
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
form{
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
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 50%;
  background-color: bisque;
}
</style>
