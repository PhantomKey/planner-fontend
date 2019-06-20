<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Trip Planner
        </q-toolbar-title>

        <div><home-button></home-button></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import HomeButton from '../components/HomeButton.vue'
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  components: {
    'home-button': HomeButton
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
