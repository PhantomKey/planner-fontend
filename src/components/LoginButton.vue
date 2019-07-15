<template>
  <div>
    <q-btn outline
          color="white"
          style="width:150px;"
          label="Login"
          @click="openLoginDialog = true">
    </q-btn>
    <q-dialog v-model="openLoginDialog">
      <q-card class="dialog" dense style="min-width:40%;max-width:40%;min-height:70%;,max-height:70%;">
        <q-card-section class="row justify-center">
          <h4>Log in to Trip Planner</h4>
          <img src="~assets/userprofileicon.png" style="max-width:30%;">
          <q-input bg-color="#ffeeef" filled v-model="username" label="Username" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="account_box" />
            </template>
          </q-input>
          <q-input bg-color="#ffeeef" filled type="password" v-model="password" label="Password" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-btn label="Login" style="min-width:90%;max-width:90%;background:#fa928f;color:white"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default{
  data() {
    return {
      openLoginDialog: false,
      username: '',
      password: ''
    }
  }
}
</script>

<style>
  .dialog {
    background-color: #fff9f9;
  }
</style>
