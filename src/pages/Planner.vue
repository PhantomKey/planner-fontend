<template>
<div class="main-content">
  <div v-if="isLogin()">
    <div id="calendar">
  		<calendar-view
  			:show-date="showDate"
  			class="theme-default holiday-us-traditional holiday-us-official"
        :events='events'
        :height="'7em'">
  			<calendar-view-header
  				slot="header"
  				slot-scope="t"
  				:header-props="t.headerProps"
  				@input="setShowDate" />
  		</calendar-view>
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
              {
                id: 'e1',
                startDate: '2019-06-25',
                endDate: '2019-06-26',
                title: 'eiei'
              }
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
