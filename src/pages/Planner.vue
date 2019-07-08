<template>
<div class="main-content">
  <div v-if="authenfunction()">
    <schedule></schedule>
      <createactivity></createactivity>
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
import Schedule from '../components/Schedule.vue'
import CreateActivity from '../components/CreateActivity.vue'
export default {
  name: 'Planner',
  components: {
    'logout-button': LogoutButton,
    'error-404': Error404,
    'schedule': Schedule,
    'createactivity':CreateActivity
  },
  data: function () {
    return {
            activities: [

            ],
          }
  },
  beforeMount(){
    this.getAllActivitiesinPlanner()
  },
  methods: {
    authenfunction() {
      console.log(this.isYourPlanner())
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
      var checkplanner = false
      let headers = {'Authorization': 'JWT '+localStorage.token}
      var response = this.$http.get ('/planner/checkplannerbelongging/planner_id='+planner_id)
      // .then ((response) =>{
      //   if(response.data.result){
      //     checkplanner= true
      //   }
      // })
      if (response.data.result){
        checkplanner = true
      }
      // console.log(response)
      // console.log(checkplanner)
      return checkplanner
    },
    getAllActivitiesinPlanner(){
      var planner_id = this.getParameterByName('plannerid')
      let headers = {'Authorization': 'JWT '+localStorage.token}
      this.$http.get ('/planner/plannerid='+planner_id+'/view_all_activity', {headers})
      .then(value => this.showAllActivitiesonScreen(value))
    },
    showAllActivitiesonScreen(value){
      this.clearAllActivityData()
      for (var i in value['data']['id']){
        this.activities.push({
          name: value['data']['name'][i],
          startDateTime: new Date(value['data']['startdatetime'][i]),
          endDateTime: new Date(value['data']['enddatetime'][i]),
          id: value['data']['id'][i],
          servicetypeID: value['data']['servicetypeID'][i],
          locationID: value['data']['locationID'][i]
        })
      }
    },
    clearAllActivityData (){
      this.activities.splice(0,this.activities.length)
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
