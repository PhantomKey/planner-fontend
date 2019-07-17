<template>
<div>
  <div style="height:80vh">
    <div v-if="loadingfinish" style="height:100%;margin-left:33.59px">
      <div v-if="checkplanner&&isLogin" style="height:100%">
        <div class="row" style="height:100%">
          <div class="col-sm-4" style="background-color: white;;border-right:5px solid #ddd">
            <schedule :scheduleData="refreshToken"></schedule>
          </div>
          <div class="col-sm-8" style="background-color: white">
 <!--           <createactivity @refreshSchedule="refreshPage"></createactivity>
            <create-service></create-service> -->
          </div>
        </div>
      </div>
      <div v-else>
        <error-404></error-404>
      </div>
    </div>
    <div v-else>
    </div>
  </div>
  <div>
    <createactivity @refreshSchedule="refreshPage"></createactivity>
    <create-service></create-service>
  </div>
</div>
</template>

<script>
import Error404 from './Error404.vue'
import Schedule from '../components/Schedule.vue'
import CreateActivity from '../components/CreateActivity.vue'
import CreateService from '../components/CreateService.vue'

export default {
  name: 'Planner',
  components: {
    'error-404': Error404,
    'schedule': Schedule,
    'createactivity':CreateActivity,
    'create-service':CreateService
  },
  checkplannerbeforecreate: false,
  loadingfinishbeforecreate: false,
  data: function () {
    return {
            activities: [
            ],
            checkplanner: this.$options.checkplannerbeforecreate,
            loadingfinish: this.$options.loadingfinishbeforecreate,
            refreshToken: 1
          }
  },
  beforeMount(){
    this.getAllActivitiesinPlanner()
    this.authenfunction()
  },
  async beforeCreate(){
    var url = window.location.href
    var name = 'plannerid'
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    var results = regex.exec(url)
    var returnvalue = null
    if (!results) returnvalue = null;
    if (!results[2]) returnvalue = '';
    returnvalue = decodeURIComponent(results[2].replace(/\+/g, ' '))
    var res = false
    let headers = {'Authorization': 'JWT '+localStorage.token}
    var promise = await this.$http.get('/planner/checkplannerbelonging/planner_id='+returnvalue, {headers})
    .then(function(value){
      if(value['data']['result'] == true){
          res = true
        }
    })
    this.$options.loadingfinishbeforecreate = true
    console.log(this.$options.loadingfinishbeforecreate)
    if(res) {
      this.$options.checkplannerbeforecreate = true
    }
    console.log(this.$options.checkplannerbeforecreate)
  },
  created(){
    this.authenfunction()
  },
  methods: {
    async authenfunction() {
      this.isYourPlanner()
    },
    refreshPage () {
      this.refreshToken = this.refreshToken+1
    },
    isLogin() {
      if (localStorage.token) {
        return true
      } else {
        return false
      }
    },
    async isYourPlanner() {
      var res = false
      var planner_id = this.getParameterByName('plannerid')
      let headers = {'Authorization': 'JWT '+localStorage.token}
      var promise = await this.$http.get('/planner/checkplannerbelonging/planner_id='+planner_id, {headers})
      .then(function(value){
        if(value['data']['result'] == true){
            res = true
          }
      })
      this.loadingfinish = true
      if(res) {
        this.checkplanner = true
      }
      return this.checkplanner
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
