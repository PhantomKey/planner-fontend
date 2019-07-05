<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
         <q-btn
          flat
          dense
          round
          @click="status = !status; showAllFriends();"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title @click="home" style="cursor:pointer;">
          Trip Planner
        </q-toolbar-title>
        <div v-if="isLogin()"><add-friend :showFriends="showAllFriends"></add-friend></div>
      </q-toolbar>
    </q-header>
     <q-drawer
      v-if='status'
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-item-label header>Your Friend</q-item-label>
      <div v-if="isLogin()">
      <q-list v-model="friendlist" v-for="i in friendlist" :key="i.id">
        <q-item>
          <q-item-section avatar>
            <q-icon name="school"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{i.name}}-{{i.id}}</q-item-label>
            <q-item-label caption>Your mom</q-item-label>
          </q-item-section>
          <q-btn @click="deleteMember(i.id)">
            remove
          </q-btn>
        </q-item>
      </q-list>
      </div>
      <div v-else>
        You must log in to use this feature.
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL, colors } from 'quasar'
import AddFriend from '../components/AddFriend.vue'
export default {
  name: 'MyLayout',
  mounted() {
        this.$root.$on('component1', () => {
            // your code goes here
            this.showAllFriends()
        })
  },
  data () {
    return {
      friendlist:[],
      leftDrawerOpen: this.$q.platform.is.desktop,
      status: false,
      token:false
    }
  },
  
  components: {
    'add-friend': AddFriend
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
  },
  updated :function() {
    this.checktoken()
  },
  async showAllFriends () {
    this.friendlist=[]
    let value = await this.$http.get('/api/v1/member')
    this.renderFriends(value)
    console.log('very good')
  },
  renderFriends (value) {
    for(var i = 0;i < value['data']['id'].length;i++)
      this.friendlist.push({id:value['data']['id'][i],name:value['data']['members'][i]})
    console.log(this.friendlist)
  },
  isLogin () {
    console.log(localStorage.token)
    if (localStorage.token) {
      console.log('woohoo')
      return true
    } else {
      console.log('nooo')
      return false
    }
  },
  async deleteMember (x) {
    await this.$http.delete('/api/v1/delete_member/'+x)
    this.showAllFriends()
  }
}
}
</script>

<style>
  body { 
       background-image : url("/assets/sunset.jpg");
  }
</style>
