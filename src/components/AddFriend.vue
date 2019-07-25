<template>
  <div>
    <q-btn round
          color="primary"
          icon="person_add"
          unelevated
          class="shadow-5"
          @click="openRegisterDialog = true">
    </q-btn>
    <q-dialog v-model="openRegisterDialog">
      <q-card class="dialog" dense style="min-width:40%;max-width:40%;min-height:65%;,max-height:65%;">
        <q-card-section class="row justify-center">
          <p style="font-size:25px;color:#fa928f">ADD NEW MEMBER</p>
          <q-input dense bg-color="secondary" filled v-model="Firstname" label="Firstname" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input dense bg-color="secondary" filled v-model="Lastname" label="Lastname" style="min-width:90%;max-width:90%;"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input dense bg-color="secondary" filled v-model="Birthday" stack-label label="Age" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']">
            <template v-slot:prepend>
              <q-icon name="calendar_today" />
            </template>
          </q-input>
          <div class="bg-secondary" style="width:90%;border-radius:4px;margin-bottom:4%;height:40px">
            <div class="q-my-xs">
              <q-icon name="fas fa-venus-mars" style="color:#665f60;font-size:20px;margin-left:17px;"/>
              <span style="font-size:17px;color:#665f60;margin-left:12px;">Gender</span>
              <q-radio dark v-model="Gender" val="M" color="primary" label="Male" style="margin-left: 10px"/>
              <q-radio dark v-model="Gender" val="F" color="primary" label="Female" style="margin-left: 10px" />
            </div>
          </div>
          <q-btn label="Create" style="min-width:90%;max-width:90%;background:#fa928f;color:white" @click="ClickAddMember();showLoading()"></q-btn>
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
        Firstname: '',
        Lastname: '',
        Birthday: '',
        Gender: ''
    }
  },
  methods: {
    ClickAddMember () {
      setTimeout(()=>{
          console.log(this.$data)
      let value = this.$http.post('/api/v1/create_member', {firstname: this.Firstname,
      lastname: this.Lastname,dob:this.Birthday,gender:this.Gender})
          .then(request => this.registerSuccessfulwithPOST(request))
          .catch((error) => this.registerFailedwithoutPOST(error))
      this.$root.$emit('component1')  
      },2000)
      
    },
    registerSuccessfulwithPOST (req) {
      if (req.data.code === 201) {
        Notify.create({
          message: 'Member added successfully',
          color: 'positive',
          textColor: 'black',
          timeout: 3000,
          position: 'top-right',
          icon: 'check_circle'
        })
        this.openRegisterDialog = false
      } else {
        this.registerFailedwithPOST(req)
      }
    },
    registerFailedwithPOST (req) {
      Notify.create({
        message: 'Failed to add member, Reason: '+req.data.message,
        color: 'primary',
        textColor: 'white',
        timeout: 3000,
        position: 'top-right',
        icon: 'error'
      })
    },
    registerFailedwithoutPOST (err) {
      Notify.create({
        message: 'Failed to add member, '+err,
        color: 'primary',
        textColor: 'white',
        timeout: 3000,
        position: 'top-right',
        icon: 'error'
      })
    },
    showLoading () {
      this.$q.loading.show()

      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 2000)
    }
  },
  beforeDestroy () {
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  }
}
</script>

<style>
  .dialog {
    background-color: #ffffff;
  }
</style>

