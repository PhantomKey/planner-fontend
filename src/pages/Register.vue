<template>
  <!-- Default form register -->
  <form class="">
    <br>
    <p>Sign up</p>
    <p class="grey-text">Your username</p>
    <input type="text" id="username"/>
    <br>
    <p class="grey-text">Your Firstname</p>
    <input type="text" id="firstname"/>
    <br/>
    <p class="grey-text">Your Lastname</p>
    <input type="text" id="lastname"/>
    <br>
    <p class="grey-text">Your email</p>
    <input type="email" id="Email"/>
    <br/>
    <p for="defaultFormRegisterPasswordEx" class="grey-text">Your password</p>
    <input type="password" id="defaultFormRegisterPasswordEx"/>
    <br>
    <p class="grey-text">Confirm your password</p>
    <input type="confirm_password" id="confirm_password"/>
    <br>
    <p class="gray-text">Your birthday</p>
    <input type="date" id="BoD" name="birthday">
    <p></p>
    <div class="text-center mt-4">
      <button class="btn btn-unique" type="submit">Register</button>
    </div>
  </form>
  <!-- Default form register -->
</template>
<style scoped>
form{
  text-align:center
}
</style>
