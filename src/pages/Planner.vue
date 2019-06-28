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
      console.log('hahah')
      return this.isLogin() || this.isYourPlanner()
    },
    isLogin() {
      console.log(localStorage.token)
      if (localStorage.token) {
        console.log('woohoo')
        return true
      } else {
        console.log('nooo')
        return false
      }
    },
    isYourPlanner() {
      var planner_id = this.getUrlVars()["planner_id"]
      this.$http.post ('/planner/view_planner/'+planner_id, {jwttoken: localStorage.token})
      .then(value => console.log(value))
      // var returnactivitylist = this.$http.get('/planner/planner_id='+planner_id+
      // '/view_all_activity', {jwttoken: localStorage.token})
    },
    getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
        });
        return vars;
    }
  }
}
</script>
