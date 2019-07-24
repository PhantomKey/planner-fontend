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
        style="position:absolute;z-index:1;margin-left:25.5%;margin-top:36%;border: 1px solid #fa928f"
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
        <q-icon name="style" color="primary" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="route" class="no-wrap flex-center">
        <Directions style="height:100%"/>
        <q-select bg-color="white" v-model="model" :options="options" :dense="dense" :options-dense="denseOpts"
        style="position:absolute;top:4.5%;right:8%;z-index:11;width:150px">
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
export default {
  components: {
    Directions
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
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  },
  methods: {
    changeOptions(){
      this.option = this.uniqDate
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-custom-toggle
  border 1px solid #027be3
</style>
