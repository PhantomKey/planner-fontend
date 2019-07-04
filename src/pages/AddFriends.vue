<template>
<div v-if="isLogin()">
<div class ="box">
  <div class="text-center">
    <br>
    <h2>Add new Member</h2>
    <br>
    <p>Firstname</p>
    <input v-model="Firstname" class="input" type="text">
    <p>Lastname</p>
    <input v-model="Lastname" class="input" type="text">
    <p>Birthday</p>
    <input v-model="Birthday" class="input" type="date">
    <p>Gender</p>
    <input v-model="Gender" type="radio" value=m> male <input v-model="Gender" type="radio" value=f> female
    <p></p>
    <q-btn color="secondary" class="button is-info" @click="ClickAddMember()">Add Member</q-btn>
    <p></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/home')"
    >Go back</q-btn>
  </div>
  </div>
  </div>
  <div v-else>
    <error-404></error-404>
  </div>
</template>

<script>
import Error404 from './Error404.vue'
export default {
    props:['showFriends'],
    data () {
    return {
        Firstname: '',
        Lastname: '',
        Birthday: '',
        Gender: ''
      }
  },
  components:{
    'error-404': Error404
  },
  methods: {
    async ClickAddMember () {
      console.log(this.$data)
      let value = await this.$http.post('/api/v1/create_member', {firstname: this.Firstname,
      lastname: this.Lastname,dob:this.Birthday,gender:this.Gender})
      this.test()
      this.check(value)
      alert('success')
    },
    check (req) {
      console.log(req.data)
    },
    isLogin () {
      console.log(localStorage.token)
      if (localStorage.token) {
        return true
      } else {
        console.log('not log in')
        return false
      }
    },
    test(){
       this.$root.$emit('component1') //like this
    }
}
}
</script>

<style>
.box{
  background-color: bisque;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  width: 50rem;
  height: 35rem;
  border-radius: 20px;
  border-style: hidden;
  box-shadow: 5px 10px 8px 10px #888888;
}
</style>