<template>
<div v-if="isLogin()">
<div class ="box">
  <div class="text-center">
    <br>
    <h2>Add new Member</h2>
    <br>
    <p>Firstname</p>
    <input type="text" name="firstname" id="firstname">
    <p>lastname</p>
    <input type="text" name="lastname" id="lastname">
    <p>Age</p>
    <input type="text" name="age" id="age">
    <p>Gender</p>
    <input type="radio" name="Gender" id="Gender" value=m> male <input type="radio" name="Gender" id="gender" value=f> female
    <p></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/Home')"
    >Go back</q-btn>
  </div>
  </div>
  </div>
  <div v-else>
    <error-404></error-404>
  </div>
</template>

<script>
import Error404 from './Error404.vue'

export default {
  components:{
    'error-404': Error404
  },
  methods: {
    isLogin () {
      console.log(localStorage.token)
      if (localStorage.token) {
        console.log('woohoo')
        return true
      } else {
        console.log('nooo')
        return false
      }
    }
}
}
</script>

<style>
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
</style>
