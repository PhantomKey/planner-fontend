<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
         <q-btn
          flat
          dense
          round
          @click="status = !status"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title @click="home" style="cursor:pointer;">
          Trip Planner
        </q-toolbar-title>
        <button class="button is-info" @click="showAllFriends()">Genfriend(test)</button>
        <button class="button is-info" @click="deleteMember()">Killhead</button>
        <div v-if="isLogin()"><add-friend></add-friend></div>
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
      <q-list v-for="i in friendlist">
        <q-item clickable tag="a" target="_blank" @click="deleteMember(i.id)">
          <q-item-section avatar>
            <q-icon name="school"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{i.name}}</q-item-label>
            <q-item-label caption>Your mom</q-item-label>
          </q-item-section>
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
  showAllFriends () {
      this.$http.get('/api/v1/member')
      .then(value=>this.alertval(value))
  },
  alertval (value) {
    this.friendlist=[]
    console.log(value)
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
  deleteMember (x) {
    this.$http.delete('/api/v1/delete_member/'+x)
    alert(x)
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
