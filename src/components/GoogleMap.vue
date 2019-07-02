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
      geocoder :new google.maps.Geocoder,
      inforwindow : new google.maps.InfoWindow
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
        var latlng = event.latLng;
        const marker = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }



        this.clearAllMarkers()
        this.markers.push({ position: marker })
        this.zoom = 16
        await this.$refs.example.$mapPromise.then((map) => {
          map.panTo(marker)
          map.zoom = 16
          this.$emit('e', map.zoom)
          if(event.placeId){
            console.log(map)
          }
        })
        this.$emit('e', this.zoom)
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
