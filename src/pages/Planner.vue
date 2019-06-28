<template>
<div class="main-content">
  <div v-if="authenfunction()">
    <logout-button></logout-button>
  </div>
  <div v-else>
    <error-404></error-404>
  </div>
</div>
</template>

<script>
import LogoutButton from '../components/LogoutButton.vue'
import Error404 from './Error404.vue'
export default {
  name: 'Planner',
  components: {
    'logout-button': LogoutButton,
    'error-404': Error404
  },
  // data: function () {
  //   return {
  //
  //         }
  // },
  methods: {
    authenfunction() {
      this.isLogin()
      this.isYourPlanner()
      return this.isLogin() || this.isYourPlanner()
    },
    isLogin() {
      if (localStorage.token) {
        return true
      } else {
        return false
      }
    },
    isYourPlanner() {
      var planner_id = this.getPlannerIDfromURL()
      console.log(planner_id)
      this.$http.get ('/planner/view_planner/planner_id='+planner_id).then(value => console.log(value))
      // var returnactivitylist = this.$http.get('/planner/planner_id='+planner_id+
      // '/view_all_activity', {jwttoken: localStorage.token})
    },
    getPlannerIDfromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      console.log(window.location.search)
      const myParam = urlParams.get("planner_id");
      console.log(myParam)
      return myParam
    }
  }
}
</script>
