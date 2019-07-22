<template>
  <GmapMap :zoom="13" :center="center">
    <DirectionsRenderer />
  </GmapMap>
</template>
<script>
import DirectionsRenderer from './DirectionsRenderer.js'
export default {
  components: {DirectionsRenderer},
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 }
    }
  }
}
</script>
