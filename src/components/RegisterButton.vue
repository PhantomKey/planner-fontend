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
          <q-input bg-color="secondary" filled v-model="user.username" label="Username" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input bg-color="secondary" filled v-model="user.firstname" label="Firstname" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input bg-color="secondary" filled v-model="user.lastname" label="Lastname" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input bg-color="secondary" filled type="email" v-model="user.email" label="Email" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input bg-color="secondary" filled type="password" v-model="user.password" label="Password" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-input bg-color="secondary" filled type="password" v-model="user.confirmpassword" label="Confirm Password" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-input bg-color="secondary" filled type="date" v-model="user.dob" stack-label label="Date of Birth" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="calendar_today" />
            </template>
          </q-input>
          <div class="q-gutter-sm">
            <q-radio v-model="user.gender" val="Male" label="Male" />
            <q-radio v-model="user.gender" val="Female" label="Female" />
          </div>
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
      user: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
        dob: '',
        gender: ''
      }
    }
  },
  methods: {
    signupClicked() {
      console.log(this.user)
      if (this.checkpassword()) {
        this.$http.post('/register/', { username: this.user.username, firstname: this.user.firstname, lastname: this.user.lastname, password: this.user.password, email: this.user.email, dob: this.user.dob, gender: this.user.gender })
          .then(request => this.registersucess(request))
          .catch(() => this.registerFailed())
      }
      console.log(this.user)
    },
    registersucess (req) {
      console.log('woohoo')
      console.log(req.data)
      if (req.data.code === 201) {
        console.log('success')
        alert('success')
        this.$router.replace(this.$route.query.redirect || '/')
      } else {
        console.log('wtf')
        this.registerFailed()
      }
    },
    registerFailed () {
      console.log('Register Fail')
    },
    checkpassword () {
      console.log('haha')
      if (this.user.password !== this.user.confirmpassword) {
        alert('password not match')
        return false
      }
      return true
    }
  }
}
</script>

<style>
  .dialog {
    background-color: #fff9f9;
  }
</style>
