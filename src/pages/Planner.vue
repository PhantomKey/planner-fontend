<template>
<div class="main-content">
  <div v-if="isLogin()">
    <calendar></calendar>
    <logout-button></logout-button>
  </div>
  <div v-else>
    <error-404></error-404>
  </div>
</div>

</template>

<script>
import Calendar from '../components/Calendar.vue'
import LogoutButton from '../components/LogoutButton.vue'
import Error404 from './Error404.vue'
export default {
  name: 'Planner',
  components: {
    'calendar': Calendar,
    'logout-button': LogoutButton,
    'error-404': Error404
  },
  methods: {
    isLogin () {
      console.log(localStorage.token)
      if (localStorage.token) {
        console.log('woohoo')
        return true
      } else {
        console.log('nooo')
        return false
      }
    }
  }
}
</script>
