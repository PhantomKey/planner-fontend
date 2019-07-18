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
      @sType="setType"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
    <q-btn color="primary" class="shadow-16"
    style="position:absolute;right:80px;bottom:23.5px;z-index:9999"
    @click="onAddClick">Add location</q-btn>
  </div>
</template>

<script>

export default {
  name: 'GoogleMap',
  props:{
      smtype: String
  },
  data () {
    return {
      center: { lat: 45.508, lng: -73.587 },
      zoom:12,
      markers: [],
      places: [],
      type:null,
      currentPlace: null,
      placeId:null,
    }
  },

  mounted () {
    this.geolocate()
  },

  methods: {
    // receives a place object via the autocomplete component
    setType (val) {
      this.type = val
      console.log('type: '+val)
    },
    onAddClick() {
      var val = {
        lat: this.markers[0].position.lat,
        lng: this.markers[0].position.lng,
        placeid: this.placeId,
        type:this.smtype
      }
      this.$emit('onAdd',val)
    },
    setPlace (place) {
      this.currentPlace = place
    },
    async addMarker () {
      this.placeId = null
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.clearAllMarkers()
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.placeId = this.currentPlace.place_id
        this.$refs.example.$mapPromise.then((map) => {
          map.panTo(marker)
        })
        this.zoom = 16
        await this.$emit('e', this.zoom)
        this.currentPlace = null
      }
    },
    addMarkerByClick: async function (event) {
        this.placeId = null
        this.currentPlace = null
        if(event.placeId){
          this.placeId = event.placeId
        }
        this.clearAllMarkers()
        var latlng = event.latLng;
        const marker = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
        this.clearAllMarkers()
        this.markers.push({ position: marker })
        this.$refs.example.$mapPromise.then((map) => {
          map.panTo(marker)
        })
        // await this.request_location_name(marker,event)
        var mapObject = this.$refs.example.$mapObject.zoom
        this.zoom = mapObject
        if(mapObject !== 16){
          this.$refs.example.$mapObject.zoom = 16
          this.zoom=16
        }
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
