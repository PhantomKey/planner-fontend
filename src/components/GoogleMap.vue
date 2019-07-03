<template>
  <div>
    <div>
      <h2 style="color:white">Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>

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
export default {
  name: 'GoogleMap',
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      zoom:12,
      markers: [],
      places: [],
      currentPlace: null,
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
        this.$refs.example.$mapPromise.then((map) => {
          map.panTo(marker)
        })
        this.zoom = 16
        await this.$emit('e', this.zoom)
        this.currentPlace = null
      }
    },
    addMarkerByClick: async function (event) {
        this.clearAllMarkers()
        var latlng = event.latLng;
        const marker = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
        this.clearAllMarkers()
        this.markers.push({ position: marker })
        await this.$refs.example.$mapPromise.then((map) => {
          map.panTo(marker)
          if(event.placeId){
            axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number&key=AIzaSyBMgDcxdxe2KBb6wFj1BlnbWhk3nCvnYhI',
            {headers: {
            'Access-Control-Allow-Origin': '*',
            'crossDomain': true
          }})
            // axios.post('https://maps.googleapis.com/maps/api/place/details/json?placeid='+event.placeId+'&fields=name&key=AIzaSyBMgDcxdxe2KBb6wFj1BlnbWhk3nCvnYhI')
            .then(response => {
            console.log(response.data);

            })
            .catch(e => {
            console.log(e)
            })
          }
        })
        var mapObject = this.$refs.example.$mapObject.zoom
        console.log(this.$refs.example)
        console.log('before if:'+mapObject)
        console.log(this.$refs.example.$parent.$el.textContent)
        this.zoom = mapObject
        if(mapObject !== 16){
          this.$refs.example.$mapObject.zoom = 16
          this.zoom=16
          console.log('in if:'+mapObject)
        }
        console.log('out of if:'+mapObject)
        console.log(event)
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
