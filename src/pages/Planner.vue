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
      return this.isLogin()&&this.isYourPlanner()
    },
    isLogin() {
      if (localStorage.token) {
        return true
      } else {
        return false
      }
    },
    async isYourPlanner() {
      var planner_id = this.getParameterByName('plannerid')
      var check = false
      await this.$http.get ('/planner/checkplannerbelongging/planner_id='+planner_id)
      .then(function(data,status,headers,config) {
        if(data['data']['result'] == true){
          check = true
        }
      })
      return check
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
