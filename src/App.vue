<template>
  <div id="q-app">
    <router-view />
    <google-map />
  </div>
</template>

<script>
import GoogleMap from './components/GoogleMap.vue'
export default {
  name: 'App',
  components: {
    GoogleMap
  }
}
</script>

<style>
</style>
