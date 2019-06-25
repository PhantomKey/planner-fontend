<template>
<div class="main-content">
  <div v-if="isLogin()">
    <div id="calendar">
    <calendar-view
      :show-date="showDate"
      class="theme-default holiday-us-traditional holiday-us-official"
    >
      <calendar-view-header
        slot="header"
        slot-scope="{ headerProps }"
        :header-props="headerProps"
        @input="setShowDate"
      />
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
import CalendarView from '../components/CalendarView.vue'
import CalendarViewHeader from '../components/CalendarViewHeader.vue'
export default {
  name: 'Planner',
  components: {
    'logout-button': LogoutButton,
    'error-404': Error404,
    'calendar-view': CalendarView,
    'calendar-view-header': CalendarViewHeader
  },
  data: function () {
    return { showDate: new Date() }
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

<style lang="scss">
div#calendar {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #2c3e50;
	display: flex;
	height: 87vh;
	width: 87vw;
	margin-left: 6vw;
	margin-left: auto;
	margin-right: auto;
}
</style>
