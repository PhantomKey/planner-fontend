<template>
<div class="main-content">
  <div v-if="authenfunction()">
    <h1>authorised</h1>
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
      return this.isLogin()&&this.isYourPlanner()
    },
    isLogin() {
      if (localStorage.token) {
        return true
      } else {
        return false
      }
    },
    isYourPlanner() {
      var planner_id = this.getParameterByName('plannerid')
      this.$http.get ('/planner/checkplannerbelongging/planner_id='+planner_id)
      .then(function(data,status,headers,config) {
        console.log(data['data']['result'])
        if(data['data']['result'] = true){
          return true;
        }
        else {
          return false;
        }
      })

      // var returnactivitylist = this.$http.get('/planner/planner_id='+planner_id+
      // '/view_all_activity', {jwttoken: localStorage.token})
    },
    getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  }
}
</script>
