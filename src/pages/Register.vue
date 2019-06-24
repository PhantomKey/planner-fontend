<template>
  <!-- Default form register -->
  <form class="">
    <br>
    <p>Sign up</p>
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
      if (this.user.password.length !== this.user.cpassword.length) {
        alert('password not match')
      } else {
        for (var i = 0; i < this.user.password.length; i++) {
          if (this.user.password[i] !== this.user.cpassword[i]) {
            alert('password not match')
            break
          }
        }
      }
    }
  }
}
</script>

<style scoped>
form{
  text-align:center
}
</style>
