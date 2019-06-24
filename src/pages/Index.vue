<style scoped>
div{
  text-align:center;
}
</style>

<template>
  <div class="">
    <br>
    <p> This is a front page </p>
    <login-button></login-button>
    <br>
    <p></p>
    <register-button></register-button>
    <br>
    <p></p>
    <add-friend></add-friend>
  </div>
</template>

<script>
import LoginButton from '../components/LoginButton.vue'
import RegisterButton from '../components/RegisterButton.vue'
import AddFriend from '../components/AddFriend.vue'
export default {
  name: 'PageIndex',
  components: {
    'login-button': LoginButton,
    'register-button': RegisterButton,
    'add-friend': AddFriend
  }

}
</script>
