<template>
<div class="main-content">
  <div v-if="isLogin()">
    <div id="calendar">
  		<calendar-view
  			:show-date="showDate"
  			class="theme-default"
        :events='events'
        :height="'7em'">
  			<calendar-view-header
  				slot="header"
  				slot-scope="t"
  				:header-props="t.headerProps"
  				@input="setShowDate" />
  		</calendar-view>
    </div>
    <div class="box">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="newPlannerName" class="input" type="text">
        </div>
      </div>
      <div class="field">
        <label class="label">Start date</label>
        <div class="control">
          <input v-model="newPlannerStartDate" class="input" type="date">
        </div>
      </div>
      <div class="field">
        <label class="label">End date</label>
        <div class="control">
          <input v-model="newPlannerEndDate" class="input" type="date">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <input v-model="newPlannerDescription" class="input" type="text">
        </div>
      </div>
      <button class="button is-info" @click="clickAddPlanner">Add Planner</button>
    </div>
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
import CalendarView from "../components/CalendarView.vue"
import CalendarViewHeader from "../components/CalendarViewHeader.vue"
// import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
// 	require("vue-simple-calendar/static/css/default.css")
// 	require("vue-simple-calendar/static/css/holidays-us.css")
export default {
  name: 'Planner',
  components: {
    'logout-button': LogoutButton,
    'error-404': Error404,
    'calendar-view': CalendarView,
    'calendar-view-header': CalendarViewHeader
  },
  data: function () {
    return {
            showDate: new Date() ,
            events: [
            ]
          }
  },
  methods: {
    isLogin () {
      console.log(localStorage.token)
      if (localStorage.token) {
        console.log('woohoo')
        return true
      } else {
        console.log('nooo')
        return false
      }
    },
    setShowDate (d) {
      this.showDate = d
    },
    clickAddPlanner () {
      this.$http.post('/planner/create_planner', { planner_name: this.newPlannerName,
        first_date: this.newPlannerStartDate, last_date: this.newPlannerEndDate,
        description: this.newPlannerDescription, jwttoken: localStorage.token})
        .then(this.showAllPlanner())
    },
    showAllPlanner () {
      this.$http.post('/planner/view_all_planner', { jwttoken: localStorage.token})
      .then(value => this.showAllPlannerOnCalendar(value))
    },
    showAllPlannerOnCalendar (value) {
      for (var i in value['data']['name']){
        console.log(value['data']['startdate'][i])
        this.events.push({
          title: value['data']['name'][i],
          startDate: '2019-06-26',
          endDate: '2019-06-28'
          // startDate: value['data']['startdate'][i],
          // endDate: value['data']['enddate'][i]
        })
      }
    }
  }
}
</script>

<style>
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
		width: 90vw;
		margin-left: auto;
		margin-right: auto;
  }
</style>
