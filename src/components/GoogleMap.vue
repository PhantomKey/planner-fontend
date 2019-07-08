<template>
  <div>
    <div style="padding-top: 20px;padding-left:20px">
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
    </div>
    <br>
    <gmap-map ref="example"
      :center="center"
      :zoom=this.zoom
      style="width:100%;  height: 400px;"
      v-on:click="addMarkerByClick"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import axios from 'axios'
import { request } from 'http';
export default {
  name: 'GoogleMap',
  data () {
    return {
      center: { lat: 45.508, lng: -73.587 },
      zoom:12,
      markers: [],
      places: [],
      currentPlace: null,
      placeId:null,
      loc:{
        name:'',
        rating:'',
        tel:''
      }
    }
  },

  mounted () {
    this.geolocate()
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = place
    },
    async addMarker () {
      
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        console.log(this.currentPlace)
        this.clearAllMarkers()
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.loc.name = this.currentPlace.name
        this.loc.rating = this.currentPlace.rating
        this.loc.tel = this.currentPlace.formatted_phone_number
        this.placeId = this.currentPlace.place_id
        console.log(this.loc.name)
        this.$refs.example.$mapPromise.then((map) => {
          map.panTo(marker)
        })
        this.zoom = 16
        await this.$emit('e', this.zoom)
        this.currentPlace = null
      }
    },
    addMarkerByClick: async function (event) {
        this.currentPlace = null
        this.clearAllMarkers()
        var latlng = event.latLng;
        const marker = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
        this.clearAllMarkers()
        this.markers.push({ position: marker })
        this.request_location_name(marker,event)
        var mapObject = this.$refs.example.$mapObject.zoom
        this.zoom = mapObject
        if(mapObject !== 16){
          this.$refs.example.$mapObject.zoom = 16
          this.zoom=16
        }
    },
    request_location_name: async function(marker, event) {
      await this.$refs.example.$mapPromise.then((map) => {
          map.panTo(marker)
          if(event.placeId){
            this.placeId = null
            this.placeId = event.placeId
            var proxy = 'https://cors-anywhere.herokuapp.com/'
            var url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+event.placeId+'&fields=name,rating,formatted_phone_number&key=AIzaSyBMgDcxdxe2KBb6wFj1BlnbWhk3nCvnYhI'
            axios.get(proxy+url)
            .then(response => {
            console.log(response.data);
            this.loc.name = response.data.result.name
            this.loc.rating = response.data.result.rating
            this.loc.tel = response.data.result.formatted_phone_number
            })
            .catch(e => {
            console.log(e)
            })
          }
        })
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    placeMarker (location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
  },
    clearAllMarkers (){
      if(this.markers.length>0) {
        this.markers = []
      }
    }
  }
}
</script>
<style>
</style>
