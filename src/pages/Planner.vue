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
        <label class="label">Title</label>
        <div class="control">
          <input v-model="newActivityTitle" class="input" type="text">
        </div>
      </div>
      <div class="field">
        <label class="label">Start date</label>
        <div class="control">
          <input v-model="newActivityStartDate" class="input" type="date">
        </div>
      </div>
      <div class="field">
        <label class="label">Start time</label>
        <div class="control">
          <input v-model="newActivityStartTime" class="input" type="time">
        </div>
      </div>
      <div class="field">
        <label class="label">End date</label>
        <div class="control">
          <input v-model="newActivityEndDate" class="input" type="date">
        </div>
      </div>
      <div class="field">
        <label class="label">End time</label>
        <div class="control">
          <input v-model="newActivityEndTime" class="input" type="time">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <input v-model="newActivityDescription" class="input" type="text">
        </div>
      </div>
      <button class="button is-info" @click="clickAddActivity">Add Activity</button>
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
    showAllActivity () {
      this.$http.get('/activity/view_all_activity/1', { jwttoken: localStorage.token})
      this.events.push({
				startDate: this.newActivityStartDate,
        startTime: this.newActivityStartTime,
				endDate: this.newActivityEndDate,
        endTime: this.newActivityEndTime,
				title: this.newActivityTitle,
        description: this.newActivityDescription
			})
    },
    clickAddActivity () {
      console.log(this.newActivityStartDate)
      this.$http.post('/activity/createactivity/1', { activity_name: this.newActivityTitle,
        start_date: this.newActivityStartDate, start_time: this.newActivityStartTime,
        end_date: this.newActivityEndDate, end_time: this.newActivityEndTime,
        description: this.newActivityDescription, jwttoken: localStorage.token})
        .then(request => this.addactivitySuccess(request))
        .catch(() => this.addactivityFailed())
      showAllActivity()
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
