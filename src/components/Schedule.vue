<template>
<div style="background-color: #92a8d1;left:50%" class="centered" >
  <div class="q-px-lg q-pb-md" v-for="date in uniqDate">
    <q-timeline :layout="layout" color="secondary">
      <q-timeline-entry heading>
        {{date}}
      </q-timeline-entry>
      <div v-for="(activity,index) in activities">
        <div v-if="activity.startDate==date">
          <q-timeline-entry
            :title="activity.name"
            :subtitle="activity.startTime.concat(' - ',activity.endTime)"
            :side="'right'"
          >
            <div>
              {{activity.description}}
              <br>
              <br>
            </div>
          </q-timeline-entry>
        </div>
    </div>
    </q-timeline>
  </div>
</div>
</template>

<script>
import uniq from 'lodash/uniq'

export default {
  data: function () {
    return {
            activities:[]
          }
  },
  computed: {
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    },
    uniqDate () {
      return uniq(this.activities.map(p => p.startDate))
   }
  },
  beforeMount() {
    this.showAllActivity()
  },
  watch: {
    'message': function () {
      this.showAllActivity()
    }
  },
  methods: {
    async showAllActivity (){
      var planner_id = this.getParameterByName('plannerid')
      let headers = {'Authorization': 'JWT '+localStorage.token}
      const data = await this.$http.get('/planner/plannerid='+planner_id+'/view_all_activity', {headers})
      console.log(data.data)
      this.showAllActivitiesonScreen(data)
    },
    showAllActivitiesonScreen(value){
      this.clearAllActivityData()
      for (var i in value['data']['id']){
        var returnstartdatetime = new Date(value['data']['startdatetime'][i])
        var returnenddatetime =  new Date(value['data']['enddatetime'][i])
        var startDate = returnstartdatetime.getUTCDate().toString()
        var startMonth = (returnstartdatetime.getUTCMonth()+1).toString()
        var startYear = returnstartdatetime.getUTCFullYear().toString()
        var startHour = returnstartdatetime.getUTCHours().toString()
        startHour = ("0" + startHour).slice(-2)
        var startMinute = returnstartdatetime.getUTCMinutes().toString()
        startMinute = ("0" + startMinute).slice(-2)
        var endDate = returnenddatetime.getUTCDate().toString()
        var endMonth = (returnenddatetime.getUTCMonth()+1).toString()
        var endYear = returnenddatetime.getUTCFullYear().toString()
        var endHour = returnenddatetime.getUTCHours().toString()
        endHour = ("0" + endHour).slice(-2)
        var endMinute = returnenddatetime.getUTCMinutes().toString()
        endMinute = ("0" + endMinute).slice(-2)
        this.activities.push({
          name: value['data']['name'][i],
          startDate: startDate.concat('/',startMonth,'/',startYear),
          startTime: startHour.concat(':',startMinute),
          endDate: endDate.concat('/',endMonth,'/',endYear),
          endTime: endHour.concat(':',endMinute),
          id: value['data']['id'][i],
          servicetypeID: value['data']['servicetypeID'][i],
          locationID: value['data']['locationID'][i],
          description: value['data']['description'][i]
        })
      }
      console.log(this.activities)
    },
    getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    clearAllActivityData (){
      this.activities.splice(0,this.activities.length)
    }
  },
}
</script>

<style>
.centered {
  position: absolute;
  top: 54%;
  left: 50%;
  width: 40%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
