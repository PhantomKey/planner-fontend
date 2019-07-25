<template>
  <GmapMap :zoom="13" :center="center">
    <directions-renderer v-if="hasDirectionsResult"
       :directions="directionsResult">
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
  data() {
    return {
      center: { lat: 13.7563, lng:100.5018 },
      direction:{},
      bound:null,
      hasDirectionsResult: false
    }
  },
  computed: {
  	directionsResult () {
    	return this.hasDirectionsResult && this.$directionsResult
    }
  },
  created () {
  	this.$gmapApiPromiseLazy()
    	.then((gmap) => {
      	this.$directionsService = new gmap.maps.DirectionsService()

        return new Promise((resolve) => {
        	this.$directionsService.route(
          	{
            	destination: 'Bedok, Singapore',
              origin: 'Clementi, Singapore',
              waypoints: [
                {
                  location: 'Joplin, MO',
                  stopover: true
                },{
                  location: 'Oklahoma City, OK',
                  stopover: true
                }],
              travelMode: 'DRIVING',
            }, resolve)
        })
      })
      .then((result) => {
      	this.$directionsResult = result
        if(result.status=="ZERO_RESULTS"){
          Notify.create({
            message: 'Sorry, we could not calculate routing directions',
            color: 'primary',
            textColor: 'white',
            timeout: 3000,
            position: 'top-right',
            icon: 'error'
          })
        }
        else {
          this.hasDirectionsResult = true
        }
      })
  },
  methods:{
  }
}
</script>
