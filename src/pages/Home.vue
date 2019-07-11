<template>
<div>
  <div v-if="isLogin()">
    <div id="calendar" class="bg-planner">
  		<calendar-view
  			:show-date="showDate"
  			class="theme-default"
        :events='planners' @click-event="onClickEvent"
        :height="'7em'">
  			<calendar-view-header
  				slot="header"
  				slot-scope="t"
  				:header-props="t.headerProps"
  				@input="setShowDate" />
  		</calendar-view>
    </div>
    <div class="createplannerbuttondiv">
      <create-planner @refreshPlanner="refreshPlanner"></create-planner>
    </div>
  </div>
  <div v-else>
    <error-404></error-404>
  </div>
</div>
</template>

<script>
import Error404 from './Error404.vue'
import CalendarView from "../components/CalendarView.vue"
import CalendarViewHeader from "../components/CalendarViewHeader.vue"
import CreatePlanner from "../components/CreatePlanner"

export default {
  name: 'Home',
  components: {
    'error-404': Error404,
    'calendar-view': CalendarView,
    'calendar-view-header': CalendarViewHeader,
    'create-planner': CreatePlanner
  },
  data: function () {
    return {
            showDate: new Date() ,
            planners: [
            ]
          }
  },
  mounted(){
    this.showAllPlanner()
  },
  methods: {
    refreshPlanner() {
      this.showAllPlanner()
    },
    isLogin () {
      if (localStorage.token) {
        return true
      } else {
        return false
      }
    },
    setShowDate (d) {
      this.showDate = d
    },
    showAllPlanner (){
      let headers = {'Authorization': 'JWT '+localStorage.token}
      this.$http.get('/planner/view_all_planner', {headers})
      .then(value => this.showAllPlannerOnCalendar(value))
    },
    showAllPlannerOnCalendar (value) {
      this.clearAllPlanner()
      for (var i in value['data']['id']){
        this.planners.push({
          title: value['data']['name'][i],
          startDate: new Date(value['data']['startdate'][i]),
          endDate: new Date(value['data']['enddate'][i]),
          id: value['data']['id'][i]
        })
        this.$forceUpdate()
      }
    },
    clearAllPlanner () {
      this.planners.splice(0,this.planners.length)
    },
    onClickEvent(e) {
			this.$router.replace(this.$route.query.redirect || '/planner/view_all_activity?plannerid='+e.id)
		}
  }
}
</script>

<style scoped>
@import "../../static/css/default.css";
@import "../../static/css/holidays-us.css";
.calendar-view .day .today {
		height: 7em !important;
		background-color: #ffe;
	}

	.calendar-view .day .past {
		height: 7em !important;
		background-color: yellow !important;
		border: 2px solid red !important;
	}

	.calendar-view .day .outsideOfMonth {
		height: 7em !important;
		background-color: yellow !important;
		border: 2px solid red !important;
	}
div#calendar {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #2c3e50;
		height: 67vh;
		width: 98%;
		margin-left: auto;
		margin-right: auto;
    margin-top: 1%
  }
.bg-planner {
  background-color: white;
}
.createplannerbuttondiv {
  margin-top: 1%
}
</style>
