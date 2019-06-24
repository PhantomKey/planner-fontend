<template>
<div class="main-content">
  <div @click="isLogin">
    <calendar></calendar>
  </div>
  <div>
    <logout-button></logout-button>
  </div>
</div>

</template>

<script>
import Calendar from '../components/Calendar.vue'
import LogoutButton from '../components/LogoutButton.vue'
export default {
  name: 'Planner',
  components: {
    'calendar': Calendar,
    'logout-button': LogoutButton
  },
  methods: {
    isLogin () {
      // if (localStorage.token) {
      //   console.log('woohoo')
      //   return true
      // } else {
      //   console.log('nooo')
      //   return false
      // }
      console.log(localStorage.token)
    }
  }
}
</script>
