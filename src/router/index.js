import Vue from 'vue'
import VueRouter from 'vue-router'
import * as VueGoogleMaps from 'vue2-google-maps'
import routes from './routes'
import VueAxios from 'vue-axios'
import axios from './axios'

Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC__7lgBJUMUlN5OJElttwdsTr9_nc8t5w',
    libraries: 'places' // necessary for places input
  }
})

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  }
  )

  return Router
}
