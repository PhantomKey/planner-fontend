<template>
  <div style="height:100%">
    <q-btn-toggle
        v-model="slide"
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          { label: 'Details', value: 'details' },
          { label: 'Route', value: 'route' },
        ]"
        style="position:absolute;z-index:1;margin-left:25.5%;margin-top:37%;border: 1px solid #fa928f"
      />
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders"
      height="100%"
    >
      <q-carousel-slide name="details" class="column no-wrap flex-center">
        <div class="q-mt-md" style="height:100%;width:100%">
          <result style="height:100%"/>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="route" class="no-wrap flex-center">
        <Directions :listoflocation="listoflocation" style="height:100%"/>
        <q-select bg-color="white" v-model="model" :options="options" :dense="dense" :options-dense="denseOpts"
        label="Date" style="position:absolute;top:4.1%;right:8%;z-index:11;width:150px"
         @input="val => { onValueChange(val) }">
           <template v-slot:prepend>
             <q-icon name="event" style="margin-left:7px"/>
           </template>
         </q-select>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import Directions from "../components/Directions.vue"
import Result from '../components/Result.vue'
export default {
  beforeMount() {
    this.changeOptions()
  },
  components: {
    Directions,
    Result
  },
  props:['uniqDate'],
  watch: {
    'uniqDate': function() {
      this.changeOptions()
    }
  },
  data () {
    return {
      model: null,
      options: [

      ],
      dense: true,
      denseOpts: true,
      slide: 'details',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',
      listoflocation: [

      ]
    }
  },
  methods: {
    async onValueChange(val) {
      console.log(val)
      var planner_id = this.getParameterByName('plannerid')
      let headers = {'Authorization': 'JWT '+localStorage.token}
      const data = await this.$http.post('/planner/plannerid='+planner_id+'/view_location_in_specific_date', {headers, request_date: val})
      .then(value => this.sendDataToDirectionComponent(value.data.locationdetailslist))
    },
    sendDataToDirectionComponent(datatobesent){
      this.listoflocation = datatobesent;
    },
    changeOptions(){
      this.options = this.uniqDate
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
<style lang="stylus" scoped>
.my-custom-toggle
  border 1px solid #027be3
</style>
