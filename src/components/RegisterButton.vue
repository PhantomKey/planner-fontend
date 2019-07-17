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
          <p style="font-size:25px;color:#fa928f">SIGN UP TO TRIP PLANNER</p>
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
           <!-- <p class="caption">Gender</p>
          <div class="q-gutter-sm">
            <q-radio v-model="user.gender" val="Male" label="Male" />
            <q-radio v-model="user.gender" val="Female" label="Female" />
          </div> -->
          <div class="bg-secondary" style="width:90%;border-radius:4px;margin-bottom:4%">
            <div class="q-my-xs">
              <q-icon name="fas fa-venus-mars" style="color:#665f60;font-size:20px;margin-left:17px;"/>
              <span style="font-size:17px;color:#665f60;margin-left:12px;">Gender</span>
              <q-radio dark v-model="user.gender" val="M" color="primary" label="Male" style="margin-left: 10px"/>
              <q-radio dark v-model="user.gender" val="F" color="primary" label="Female" style="margin-left: 10px" />
            </div>
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
          .then(request => this.registerSuccessfulwithPOST(request))
          .catch((error) => this.registerFailedwithoutPOST(error))
      }
      console.log(this.user)
    },
    registerSuccessfulwithPOST (req) {
      if (req.data.code === 201) {
        Notify.create({
          message: 'Account created successfully',
          color: 'primary',
          textColor: 'white',
          timeout: 3000,
          position: 'top-right',
          icon: 'check_circle_outline'
        })
        this.openRegisterDialog = false
      } else {
        this.registerFailedwithPOST(req)
      }
    },
    registerFailedwithPOST (req) {
      Notify.create({
        message: 'Failed to create account, Reason: '+req.data.message,
        color: 'primary',
        textColor: 'white',
        timeout: 3000,
        position: 'top-right',
        icon: 'error'
      })
    },
    registerFailedwithoutPOST (err) {
      console.log(err)
      Notify.create({
        message: 'Failed to create account, '+err,
        color: 'primary',
        textColor: 'white',
        timeout: 3000,
        position: 'top-right',
        icon: 'error'
      })
    },
    checkpassword () {
      if (this.user.password !== this.user.confirmpassword) {
        Notify.create({
          message: 'Password does not matched',
          color: 'primary',
          textColor: 'white',
          timeout: 3000,
          position: 'top-right',
          icon: 'error'
        })
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
