<style>
.content {
  max-width: 230px;
  margin: auto;
}
</style>

<template>
  <div class="content">
    <br>
    <p> This is a front page </p>
    <login-button></login-button>
    <br>
    <p> </p>
    <register-button></register-button>
  </div>
</template>

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
