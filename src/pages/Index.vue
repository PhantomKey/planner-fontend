<style scoped>
div{
  text-align:center;
}
</style>

<template>
  <div>
    <!-- <br>
    <p> Welcome to trip planner </p>
    <login-button></login-button>
    <br>
    <p></p>
    <register-button></register-button>
    <br>
    <p></p> -->
    <div class="text-h2">
      <b>NEVER STOP TRAVELING</b>
    </div>
  </div>
</template>

<script>
import LoginButton from '../components/LoginButton.vue'
import RegisterButton from '../components/RegisterButton.vue'
export default {
  name: 'PageIndex',
  components: {
    'login-button': LoginButton,
    'register-button': RegisterButton,
  }

}
</script>
