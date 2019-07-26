<template>
  <GmapMap :zoom="13" :center="center">
    <directions-renderer v-if="hasDirectionsResult"
       :directions="directionsResult2">
    </directions-renderer>
  </GmapMap>
</template>
<script>
import DirectionsRenderer from './DirectionsRenderer.js'
import axios from 'axios'
import { request } from 'http';
import { stat } from 'fs';
import { constants } from 'crypto';
import { arch, type } from 'os';
import { Notify } from 'quasar'

export default {
  name: 'GoogleMapDirect',
  components: {DirectionsRenderer},
  props:['listoflocation', 'updateGMAPData'],
  watch: {
    'listoflocation': function() {
      this.updateRoute()
    }
  },
  data() {
    return {
      center: { lat: 13.7563, lng:100.5018 },
      direction:{},
      bound:null,
      hasDirectionsResult: false,
      directionsResult2: null
    }
  },
  computed: {
  	directionsResult () {
    	return this.hasDirectionsResult && this.$directionsResult
    }
  },
  methods:{
    updateRoute(){
      var destination = '';
      var origin = '';
      var waypoints = [];
      if(this.listoflocation.length==1){
        origin = this.listoflocation[0][2].toString().concat(", ", this.listoflocation[0][3].toString())
        destination = this.listoflocation[0][2].toString().concat(", ", this.listoflocation[0][3].toString())
      }
      else if(this.listoflocation.length==2){
        origin = this.listoflocation[0][2].toString().concat(", ", this.listoflocation[0][3].toString())
        destination = this.listoflocation[1][2].toString().concat(", ", this.listoflocation[1][3].toString())
      }
      else{
        origin = this.listoflocation[0][2].toString().concat(", ", this.listoflocation[0][3].toString())
        destination = this.listoflocation[this.listoflocation.length-1][2].toString()
        .concat(", ", this.listoflocation[this.listoflocation.length-1][3].toString())
        for (var i in this.listoflocation){
          if(i!=0 && i!=this.listoflocation.length-1){
            waypoints.push({
              location: this.listoflocation[i][2].toString().concat(", ", this.listoflocation[i][3].toString()),
              stopover: true
            })
          }
        }
      }
      this.$gmapApiPromiseLazy()
        .then((gmap) => {
          this.$directionsService = new gmap.maps.DirectionsService()
          return new Promise((resolve) => {
            this.$directionsService.route(
              {
                destination: destination,
                origin: origin,
                waypoints: waypoints,
                travelMode: 'DRIVING',
              }, resolve)
          })
        })
        .then((result) => {
          this.$directionsResult = result
          this.directionsResult2 = result
          if(result.status=="ZERO_RESULTS"){
            Notify.create({
              message: 'Sorry, we could not calculate routing directions',
              color: 'primary',
              textColor: 'white',
              timeout: 3000,
              position: 'top-right',
              icon: 'check_circle_outline',
              actions: [{label:'Dismiss',color:'white'}]
            })
          }
          else {
            this.hasDirectionsResult = true
          }
        })
    }
  }
}
</script>
