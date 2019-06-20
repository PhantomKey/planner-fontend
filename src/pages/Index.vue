<template>
  <div>
    <p> This is a front page </p>
    <login-button></login-button>
    <p> </p>
    <register-button></register-button>
  </div>
</template>

<style>
</style>

<script>
import LoginButton from '../components/LoginButton.vue'
import RegisterButton from '../components/RegisterButton.vue'
export default {
  name: 'PageIndex',
  components: {
    'login-button': LoginButton,
    'register-button': RegisterButton
  }

}
</script>
