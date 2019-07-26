<template>
      <div class="q-pa-md center" style="margin:auto;" >
        <div style="text-align:center">
          <div class="text-h4 center" style="margin:auto;display:inline-block">FRIEND LIST</div>
        </div>
        <div class="q-pa-md center">
          <div style="display:absolute;right:250px;bottom:100px" class="fixed-bottom-right">
            <add-friend style="display:inline-block;margin-left:1rem" ></add-friend>
          </div>
        </div>
      <div class="q-pa-md center" style="max-width:900px;width:900px;margin:auto">
        <q-scroll-area style="min-height:500px;height:500px;margin:auto;">
          <q-list padding>
            <div v-for="contact in friendlist" :key="contact.id" >
              <q-item multiline tag="label" class="q-my-sm" v-ripple>
                <q-item-section avatar top v-if="contact.owner == '0'">
                  <q-avatar color="primary" text-color="white" class="text-uppercase">{{contact.letter}}</q-avatar>
                </q-item-section>
                <q-item-section avatar top v-if="contact.owner == '1'">
                  <q-avatar icon="person" color="grey-4"></q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-capitalize">{{ contact.name }}  {{contact.lastname}}</q-item-label>
                  <q-item-label caption lines="1"><span class="text-weight-bold">Gender:</span> {{contact.gender}}  <span class="text-weight-bold">Age:</span> {{contact.age}}</q-item-label>
                </q-item-section>
                <q-item-section avatar v-if="contact.owner != 1">
                  <q-btn unelevated round class="centered3" icon='delete' @click="deleteMember(contact.id)"></q-btn>
                </q-item-section>
              </q-item>
              <q-separator spaced inset="item" />
            </div>
          </q-list>
        </q-scroll-area>
      </div>
      </div>
</template>

<script>
import { openURL, colors } from 'quasar'
import AddFriend from '../components/AddFriend.vue'
import LogoutButton from '../components/LogoutButton.vue'
import VueJwtDecode from 'vue-jwt-decode'
import Profile from '../components/Profile.vue'
import Friend from '../components/Friendbutton.vue'
export default {
  name: 'MyLayout',
  created: function () {
    this.showAllFriends()
  },
  mounted() {
        this.$root.$on('component1', () => {
            // your code goes here
            this.showAllFriends()
        })
        this.showUserName()
  },
  data () {
    return {
      friendlist:[],
      leftDrawerOpen: this.$q.platform.is.desktop,
      status: false,
      token:false,
      username:''
    }
  },

  components: {
    'add-friend': AddFriend,
    'logout-button': LogoutButton,
    'profile': Profile,
    'friend':Friend
  },
  methods: {
    openURL,
    home () {
      if (localStorage.token){
        this.$router.push('/Home')
      }else{
        this.$router.push('/')
      }
    },
    checktoken () {
      this.token = localStorage.token ? true: false
  },
  created :function() {
    this.checktoken()
    this.showUserName()
  },
  updated :function() {
    this.checktoken()
  },
  async showAllFriends () {
    this.friendlist=[]
    let headers = {'Authorization': 'JWT '+localStorage.token}
    let value = await this.$http.get('/api/v1/member',{headers})
    this.renderFriends(value)
    // console.log('very good')
  },
  renderFriends (value) {
   for(var i = 0;i < value['data']['id'].length;i++){
              let str = value['data']['members'][i]
              let letter = str.toString().substring(0,1)

              if(value['data']['gender'][i] == 'M'){
                var gender = 'Male'
              }else{
                var gender = 'Female'
              }

              if(value['data']['id'][i] == '1'){
                this.friendlist.push({id:value['data']['id'][i],name:value['data']['members'][i],
                lastname:value['data']['lastname'][i],gender:gender,letter:letter,age:value['data']['age'][i],
                owner:value['data']['owner'][i]})
              }else{
                this.friendlist.push({id:value['data']['id'][i],name:value['data']['members'][i],
                lastname:value['data']['lastname'][i],gender:gender,letter:letter,age:value['data']['age'][i],
                owner:value['data']['owner'][i]})
              }
            }
  },
  async deleteMember (x) {
    await this.$http.delete('/api/v1/delete_member/'+x)
    this.showAllFriends()
  },
  async showUserName(){
    let user_id= VueJwtDecode.decode(localStorage.token).user_id
    // console.log('mounted')
    // console.log(user_id)
    let response = await this.$http.get('/api/v1/user/'+user_id)
    let username = response.data.user.name
    this.username = username
  }
}
}
</script>

<style scoped>
.centered {
  position:relative;
  margin-top:40px;
  left:43%;
}
.centered2 {
  position:relative;
  left:17%;
}
.centered3 {
  position:relative;
  right:25%;
}
friend:hover{
  border-bottom: 5px solid #fa928f
}
</style>