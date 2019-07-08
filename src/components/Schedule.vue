<template>
<div style="background-color: #92a8d1;left:50%" class="centered margin-hunsa" >
  <div class="q-px-lg q-pb-md" >
    <q-timeline :layout="layout" color="secondary">
      <q-timeline-entry heading>
        Timeline heading
        <br>
        <!-- ({{$q.screen.lt.sm ? 'Dense' : ($q.screen.lt.md ? 'Comfortable' : 'Loose')}} layout)-->
      </q-timeline-entry>


      <!-- <div v-for="(activity,index) in activities"> -->
      <q-timeline-entry v-for="(activity,index) in activities"
        :title="activity.name"
        :subtitle="activity.startDateTime.toString()"
        :side="index%2==1 ? 'left' : 'right' "
      >
        <div>
          {{activity.description}}
        </div>
      </q-timeline-entry>
      <!-- </div> -->

      <!--
      <q-timeline-entry
        title="Event Title"
        subtitle="February 21, 1986"
        side="right"
        icon="delete"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>
      -->
      <q-timeline-entry heading>November, 2017</q-timeline-entry>

      <q-timeline-entry
        title="Event Title"
        subtitle="February 22, 1986"
        side="left"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Event Title"
        subtitle="February 22, 1986"
        side="right"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Event Title"
        subtitle="February 22, 1986"
        side="left"
        color="orange"
        icon="done_all"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Event Title"
        subtitle="February 22, 1986"
        side="right"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Event Title"
        subtitle="February 22, 1986"
        side="left"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
  <h5>{{activities}}</h5>
</div>
</template>

<script>
export default {
  data: function () {
    return {
            activities:[]
          }
  },
  computed: {
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    }
  },
  beforeMount() {
    this.showAllActivity()
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
        this.activities.push({
          name: value['data']['name'][i],
          startDateTime: new Date(value['data']['startdatetime'][i]),
          endDateTime: new Date(value['data']['enddatetime'][i]),
          id: value['data']['id'][i],
          servicetypeID: value['data']['servicetypeID'][i],
          locationID: value['data']['locationID'][i],
          description: value['data']['description'][i]
        })
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
.centered {
  position: absolute;
  top: 60%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
.margin-hunsa{
  margin-top:50%
}
</style>
