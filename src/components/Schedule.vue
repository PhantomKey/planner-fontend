<template>
<q-scroll-area style="height:100%">
  <div style="background-color: white;position: relative;margin:auto">
    <div class="q-px-lg q-pb-md" v-for="date in uniqDate" >
      <q-timeline :layout="'dense'" color="secondary">
        <q-timeline-entry heading style="color: rgb(22, 20, 19)">
          <span style="font-size:40px">{{convertToMonthString(date)}}</span>
        </q-timeline-entry>
        <div v-for="(activity,index) in activities">
          <div v-if="activity.startDate==date">
            <q-timeline-entry
              :title="activity.name"
              :subtitle="activity.startTime.concat(' - ',activity.endTime)"
              :side="'right'"
              style="cursor: pointer"
              color="warning"
              @click="openspecificactivity(activity.id)"
            >
              <div>
                {{activity.description}}
                <br>
              </div>
            </q-timeline-entry>
            <div></div>
          </div>
      </div>
      </q-timeline>
    </div>
    <div>
      <specific-activity v-if="icon" :activity="openactivity" :doesntmatterkey="doesntmatterkey"></specific-activity>
    </div>
  </div>
</q-scroll-area>
</template>

<script>
import uniq from 'lodash/uniq'
import SpecificActivity from './SpecificActivity'

export default {
  components:{
    'specific-activity':SpecificActivity
  },
  props: ['scheduleData'],
  watch: {
    'scheduleData': function() {
      this.showAllActivity()
    }
  },
  data: function () {
    return {
            activities:[],
            icon: false,
            activityarray:[],
            show: true,
            openactivity: {},
            doesntmatterkey: 1,
          }
  },
  computed: {
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    },
    uniqDate () {
      var uniqDate = uniq(this.activities.map(p => p.startDate))
      return uniqDate
    },
  },
  beforeMount() {
    this.showAllActivity()
  },
  methods: {
    openspecificactivity(activityid) {
      this.$emit('openSpeficActivity', activityid)
    },
    convertToMonthString(inputdate) {
      var splittedDateString = inputdate.split("/")
      var DateString = splittedDateString[0]
      var MonthString
      var YearString = splittedDateString[2]
      switch(splittedDateString[1]) {
        case '1':
          MonthString = 'January';
          break;
        case '2':
          MonthString = 'February';
          break;
        case '3':
          MonthString = 'March';
          break;
        case '4':
          MonthString = 'April';
          break;
        case '5':
          MonthString = 'May';
          break;
        case '6':
          MonthString = 'June';
          break;
        case '7':
          MonthString = 'July';
          break;
        case '8':
          MonthString = 'August';
          break;
        case '9':
          MonthString = 'September';
          break;
        case '10':
          MonthString = 'October';
          break;
        case '11':
          MonthString = 'November';
          break;
        case '12':
          MonthString = 'December';
        break;
      }
      var returnString = MonthString.concat(' ',DateString,', ',YearString)
      return returnString
    },
    async showAllActivity (){
      var planner_id = this.getParameterByName('plannerid')
      let headers = {'Authorization': 'JWT '+localStorage.token}
      const data = await this.$http.get('/planner/plannerid='+planner_id+'/view_all_activity', {headers})
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
        var dateDiff = (returnenddatetime.getUTCDate()-returnstartdatetime.getUTCDate())
        if(dateDiff == 0) {
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
        else {
          this.activities.push({
            name: value['data']['name'][i],
            startDate: startDate.concat('/',startMonth,'/',startYear),
            startTime: startHour.concat(':',startMinute),
            endDate: startDate.concat('/',startMonth,'/',startYear),
            endTime: "00:00",
            id: value['data']['id'][i],
            servicetypeID: value['data']['servicetypeID'][i],
            locationID: value['data']['locationID'][i],
            description: value['data']['description'][i]
          })
          for(var j=1;j<dateDiff;j++){
            var today = new Date(returnstartdatetime)
            var tmr = new Date(today.setDate(today.getDate()+j))
            var returnDate = tmr.getUTCDate().toString()
            var returnMonth = (tmr.getUTCMonth()+1).toString()
            var returnYear = tmr.getUTCFullYear().toString()
            var returnValue = returnDate.concat('/',returnMonth,'/',returnYear)
            this.activities.push({
              name: value['data']['name'][i],
              startDate: returnValue,
              startTime: "00:00",
              endDate: returnValue,
              endTime: "00:00",
              id: value['data']['id'][i],
              servicetypeID: value['data']['servicetypeID'][i],
              locationID: value['data']['locationID'][i],
              description: value['data']['description'][i]
            })
          }
          this.activities.push({
            name: value['data']['name'][i],
            startDate: endDate.concat('/',endMonth,'/',endYear),
            startTime: "00:00",
            endDate: endDate.concat('/',endMonth,'/',endYear),
            endTime: endHour.concat(':',endMinute),
            id: value['data']['id'][i],
            servicetypeID: value['data']['servicetypeID'][i],
            locationID: value['data']['locationID'][i],
            description: value['data']['description'][i]
          })
        }
      }
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
</style>
