<template>
  <div>
    <q-btn outline
          color="white"
          style="width:150px;"
          label="Register"
          @click="openRegisterDialog = true">
    </q-btn>
    <q-dialog v-model="openRegisterDialog">
      <q-card class="dialog" dense style="min-width:40%;max-width:40%;min-height:65%;,max-height:65%;">
        <q-card-section class="row justify-center">
          <h4>SIGN UP TO TRIP PLANNER</h4>
          <q-input bg-color="#ffeeef" filled v-model="username" label="Username" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input bg-color="#ffeeef" filled v-model="firstname" label="Firstname" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input bg-color="#ffeeef" filled v-model="lastname" label="Lastname" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input bg-color="#ffeeef" filled type="email" v-model="email" label="Email" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input bg-color="#ffeeef" filled type="password" v-model="password" label="Password" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-input bg-color="#ffeeef" filled type="password" v-model="confirmpassword" label="Confirm Password" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-input bg-color="#ffeeef" filled type="date" v-model="dob" stack-label label="Date of Birth" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="calendar_today" />
            </template>
          </q-input>
          <q-btn label="Sign Up" style="min-width:90%;max-width:90%;background:#fa928f;color:white" @click="signupClicked()"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Notify } from 'quasar'
export default{
  data() {
    return {
      openRegisterDialog: false,
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpassword: '',
      dob: '',
      gender: ''
    }
  },
  methods: {
    signupClicked() {
      console.log('eiei')
    },
  }
}
</script>

<style>
  .dialog {
    background-color: #fff9f9;
  }
</style>
