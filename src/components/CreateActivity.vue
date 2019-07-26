<template>
    <div class="centered">
        <q-btn rounded label="New Activity"
        color="primary"
        icon="add"
        style="left:22%;bottom:13%;position:absolute"
        @click="createActivityPopup = true">
        </q-btn>
        <q-dialog v-model="createActivityPopup">
            <q-card dense flat style="width:45%;max-width:45%;height:80%;max-height:80%">
              <q-card-section class="row justify-center">
                  <div class="text-h5" style="margin:0 auto;font-size:25px;">CREATE NEW ACTIVITY</div>
              </q-card-section>
              <q-card-section class="q-gutter-sm" style="padding-bottom:0px;width:95%;margin-left: 8px;margin-right: auto;">
                  <q-input bg-color="secondary" dense ref="input" filled v-model="name" label="Name" style="min-width:100%;max-width:100%"></q-input>
                  <q-select bg-color="secondary" dense filled v-model="stype" :options="type" label="Type" style="min-width:100%;max-width:100%"></q-select>
                  <div class="etc" v-if="stype != 'Travel' &&  stype != 'Travel1' &&  stype != 'Travel2' && stype !=''" style="width:100%">
                      <q-input bg-color="secondary" dense filled v-model="location.in.name" label="Add location" style="min-width:100%;max-width:100%">
                          <template v-slot:append>
                              <q-icon name="place"  @click="gmappopup=true, ptype=stype" class="cursor-pointer"></q-icon>
                          </template>
                      </q-input>
                  </div>
                  <div class="travel" v-if="stype == 'Travel' || stype == 'Travel1'|| stype=='Travel2'" style="min-width:100%;max-width:100%">
                      <div class="row">
                          <div class="col">
                              <q-input bg-color="secondary" dense filled v-model="location.start.name" label="Start">
                                  <template v-slot:append>
                                      <q-icon name="place"  @click="gmappopup=true, ptype='Travel1'" class="cursor-pointer"></q-icon>
                                  </template>
                              </q-input>
                          </div>
                          <div class="col" style="max-width:15px"></div>
                          <div class="col">
                              <q-input bg-color="secondary" dense filled v-model="location.end.name" label="Stop" style="min-width:100%;max-width:100%">
                                  <template v-slot:append>
                                      <q-icon name="place"  @click="gmappopup=true, ptype='Travel2'" class="cursor-pointer"></q-icon>
                                  </template>
                              </q-input>
                          </div>
                      </div>
                  </div>
                  <!-- <div class="row q-col-gutter-sm q-gutter-sm" style="min-width:100%;max-width:100%"> -->
                    <q-input bg-color="secondary" dense filled v-model="startdate" type="date" label="Start Date" stack-label style="width:100%">
                      <template v-slot:prepend>
                        <q-icon name="event" />
                      </template>
                    </q-input>
                    <q-input bg-color="secondary" dense filled v-model="starttime" type="time" label="Start Time" stack-label style="width:100%">
                    </q-input>
                  <!-- </div> -->
                  <!-- <div class="row q-col-gutter-sm q-gutter-sm"> -->
                    <q-input bg-color="secondary" dense filled v-model="enddate" type="date" label="End Date" stack-label style="width:100%">
                      <template v-slot:prepend>
                        <q-icon name="event" />
                      </template>
                    </q-input>
                    <q-input bg-color="secondary" dense filled v-model="endtime" type="time" label="End Time" stack-label style="width:100%">
                    </q-input>
                  <!-- </div> -->
                  <q-input bg-color="secondary" dense ref="input" filled v-model="description" label="Description" style="width:100%"></q-input>
                  <div class="row q-gutter-sm">
                    <q-dialog v-model="gmappopup">
                      <q-card dense style="min-width:70%;max-width:70%">
                          <q-btn icon="close" flat round dense v-close-popup style="top:10px;right:5px;position:absolute;"></q-btn>
                          <google-map  :smtype="ptype" @onAdd="handlelocationAdd"/>
                          <!-- <google-map @onAdd="handlelocalotion2Add" /> -->
                      </q-card>
                    </q-dialog>
                  </div>
                </q-card-section>
                <q-card-section style="text-align:right;padding-top:50px;right:0px;bottom:0px;margin-right:15px;position:absolute">
                  <div class="q-gutter-sm">
                    <q-btn v-close-popup label="Cancel" flat color="primary" style="text-align:right;" @click="resetData()"></q-btn>
                    <q-btn color="primary" label="Create" style="text-align:right" @click="clickAddActivity();showLoading()"></q-btn>
                  </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import GoogleMap from '../components/GoogleMap.vue'
import axios from 'axios'
import { request } from 'http';
import { stat } from 'fs';
import { constants } from 'crypto';
import { arch, type } from 'os';
import { Notify } from 'quasar'
export default{
    components: {
      'GoogleMap': GoogleMap
    },
    computed:{
      checketc(){
        if(this.location.in.name || this.field.in) return true
        else return false
      },
      checks(){
        if(this.location.start.name || this.field.start) return true
        else return false
      },
      checke(){
        if(this.location.end.name || this.field.stop) return true
        else return false
      }
    },
    data() {
        return {
            createActivityPopup: false,
            gmappopup: false,
            closePopup: false,
            name: '',
            type: ['Travel','Food','Accommodation'],
            stype:'',
            ptype:'',
            indextype:['Travel1','Travel2','Food','Accommodation'],
            location:{
                start:{
                    name:'',
                    lat:'',
                    lng:''
                },
                end:{
                    name:'',
                    lat:'',
                    lng:''
                },
                in:{
                    name:'',
                    lat:'',
                    lng:''
                }
            },
            description:'',
            startdate: '',
            starttime: '',
            enddate: '',
            endtime: '',
            field:{
              in:true,
              start:true,
              stop:true,
            },
            step:1,
            done1:false,
            done2:false,
            done3:false,
        }
    },
    methods:{
      resetData() {
        Object.assign(this.$data, this.$options.data.apply(this))
      },
      emitToPlanner(){
        this.$emit('refreshSchedule')
      },
      getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
      },
      getType(stype) {
        for(var i = 0; i < this.type.length ;i++){
          if(stype == this.type[i]){
            return i+1
          }
        }
      },
      jsonbodyetc(atype) {
        var datas = JSON.stringify({
          activity_name: this.name,
          start_time: this.starttime,
          start_date: this.startdate,
          end_date: this.enddate,
          end_time: this.endtime,
          type: atype,
          description: this.description,
          in: this.location.in
        })
        return datas
      },
      jsonbodyt(atype) {
          var datas = JSON.stringify({
          activity_name: this.name,
          start_time: this.starttime,
          start_date: this.startdate,
          end_date: this.enddate,
          end_time: this.endtime,
          type: atype,
          description: this.description,
          start: this.location.start,
          stop: this.location.end
        })
        return datas
      },
       clickAddActivity (){
        setTimeout(()=>{
          var planner_id = this.getParameterByName('plannerid')
        let headers = {'Authorization': 'JWT '+localStorage.token,
                        'Content-Type': 'application/json'}
        var dtype = this.stype
        var type = this.getType(dtype)
        if(type == 1){
          var datas = this.jsonbodyt(type)
        }
        else{
          var datas = this.jsonbodyetc(type)
        }
        this.$http.post('/planner/plannerid='+planner_id+'/create_activity',datas,{headers})
        .then((request) => this.AddActivitySuccessfulwithPOST(request))
        .catch((err) => this.AddActivityFailedwithoutPOST(err))
        },2000)

      },
      AddActivitySuccessfulwithPOST(req){
        if (req.data.code === 201) {
          Notify.create({
            message: 'Activity created successfully',
            color: 'positive',
            textColor: 'black',
            timeout: 3000,
            position: 'top-right',
            icon: 'check_circle'
          })
          this.createActivityPopup = false
          this.emitToPlanner()
          Object.assign(this.$data, this.$options.data.apply(this))
        } else {
          this.AddActivityFailedwithPOST(req)
        }
      },
      AddActivityFailedwithPOST(req){
        Notify.create({
          message: 'Failed to create activity, Reason: '+req.data.message,
          color: 'primary',
          textColor: 'white',
          timeout: 3000,
          position: 'top-right',
          icon: 'error'
        })
      },
      AddActivityFailedwithoutPOST(err){
        Notify.create({
          message: 'Failed to create activity, '+err,
          color: 'primary',
          textColor: 'white',
          timeout: 3000,
          position: 'top-right',
          icon: 'error'
        })
      },
      handlelocationAdd(val) {
        this.gmappopup = false
        var type = val.type
        this.field = {
            in:true,
            start:true,
            stop:true,
          }
        if(type == 'Travel1'){
          this.location.start.name = null
          this.location.start.lat = val.lat
          this.location.start.lng = val.lng
        }else if(type == 'Travel2'){
          this.location.end.name = null
          this.location.end.lat = val.lat
          this.location.end.lng = val.lng
        }else{
          this.location.in.name = null
          this.location.in.lat = val.lat
          this.location.in.lng = val.lng
        }
        if(val.placeid){
          this.request_location_name(val.placeid,type)
        }else{
          if(type == 'Travel1'){
            this.location.start.name = null
            this.field.start = false
          }else if(type == 'Travel2'){
            this.location.end.name = null
            this.field.stop = false
          }else{
            this.location.in.name = null
            this.field.in = false
          }
        }
      },

      request_location_name: async function(placeId,type) {
        var proxy = 'https://cors-anywhere.herokuapp.com/'
        var url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+placeId+'&fields=name&key=AIzaSyBMgDcxdxe2KBb6wFj1BlnbWhk3nCvnYhI'
        axios.get(proxy+url)
        .then(response => {
          if(type == 'Travel1'){
            this.location.start.name = response.data.result.name
          }
          else if(type == 'Travel2'){
            this.location.end.name = response.data.result.name
          }
          else{
            this.location.in.name = response.data.result.name
          }
        })
        .catch(e => {
          // console.log(e)
        })
      },
      showLoading () {
      this.$q.loading.show()

      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 2000)
    }
  },
  beforeDestroy () {
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  }
}
</script>
<style scoped>
.centered {
  /* position:relative;
  margin-top:53px;
  left:66%; */
}
.pac-container.pac-logo.hdpi{
    z-index: 9999 !important;
}
.pac-container{
    z-index: 9999 !important;
}
</style>
