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

        <div v-if='token'><add-friend></add-friend></div>
      </q-toolbar>
    </q-header>
     <q-drawer
      v-if='status'
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/PhantomKey/planner-frontend/">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github (frontend)</q-item-label>
            <q-item-label caption>github.com</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/juinut/planner-backend">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github (backend)</q-item-label>
            <q-item-label caption>github.com</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
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
    }
  },
  created :function() {
    this.checktoken()
  },
  updated :function() {
    this.checktoken()
  }
}
</script>

<style>
  body { 
       background-image : url("/assets/sunset.jpg");
  }
</style>
