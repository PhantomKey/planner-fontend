Vue.use(VueGoogleMaps, {
	load: {
  	key: 'AIzaSyBMgDcxdxe2KBb6wFj1BlnbWhk3nCvnYhI',
    libraries: 'directions',
  }
})

let {MapElementFactory} = VueGoogleMaps

let directionsRenderer = MapElementFactory({
  name: 'directionsRenderer',
  ctr: () => google.maps.DirectionsRenderer,
  //// The following is optional, but necessary if the constructor takes multiple arguments
  //// e.g. for GroundOverlay
  // ctrArgs: (options, otherProps) => [options],
  events: ['directions_changed'],

  // Mapped Props will automatically set up
  //   this.$watch('propertyName', (v) => instance.setPropertyName(v))
  //
  // If you specify `twoWay`, then it also sets up:
  //   google.maps.event.addListener(instance, 'propertyName_changed', () => {
  //     this.$emit('propertyName_changed', instance.getPropertyName())
  //   })
  //
  // If you specify `noBind`, then neither will be set up. You should manually
  // create your watchers in `afterCreate()`.
  mappedProps: {
    routeIndex: { type: Number },
    options: { type: Object },
    panel: { },
    directions: { type: Object },
    //// If you have a property that comes with a `_changed` event,
    //// you can specify `twoWay` to automatically bind the event, e.g. Map's `zoom`:
    // zoom: {type: Number, twoWay: true}
  },
  // Any other properties you want to bind. Note: Must be in Object notation
  props: {},
  // Actions you want to perform before creating the object instance using the
  // provided constructor (for example, you can modify the `options` object).
  // If you return a promise, execution will suspend until the promise resolves
  beforeCreate (options) {},
  // Actions to perform after creating the object instance.
  afterCreate (directionsRendererInstance) {},
})

Vue.component('directionsRenderer', directionsRenderer)

new Vue({
  el: "#map",
  
  data () {
  	return {
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
              travelMode: 'DRIVING',
            }, resolve)
        })
      })
      .then((result) => {
      	this.$directionsResult = result
        this.hasDirectionsResult = true
      })
  }
  
})