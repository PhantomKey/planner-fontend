<template>
  <div>
    <body>
      <div class="text-h2" style="padding-top: 15%">
        <b style="color:white">NEVER STOP TRAVELING</b>
      </div>
      <div class="text-h5" style="color: white; padding-bottom:2%">
        “To Travel is to Live” – Hans Christian Andersen.
      </div>
      <div>
        <login-button></login-button>
        <div class="divider"></div>
        <register-button></register-button>
      </div>
    </body>
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
<style scoped>
  body {
    background-image: url("../assets/02.jpg");
    background-repeat: no-repeat;
    background-position: 10% 60%;
    background-size: cover;
    background-attachment: fixed;
    position: fixed;
  }
  div{
    text-align:center;
  }
  .divider{
    width:1%;
    height:auto;
    display:inline-block;
  }
</style>
