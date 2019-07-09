<template>
    <div>
        <q-btn label="New"
        color="primary"
        @click="icon = true">
        </q-btn>
        <q-dialog v-model="icon">
            <q-card dense style="min-width:50%;max-width:50%">
            <q-card-section class="row items-center">
                <div class="text-h6" style="margin:0 auto;">Create New Activity</div>
            </q-card-section>
            <q-card-section class="q-gutter-sm">
                <q-input ref="input" filled v-model="name" label="Name" style="min-width:100%;max-width:100%"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"></q-input>
                <q-select filled v-model="stype" :options="type" label="Type" style="min-width:100%;max-width:100%"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please select something']"></q-select>
                <div class="etc" v-if="stype != 'Travel' &&  stype != 'Travel1' &&  stype != 'Travel2' && stype !=''" style="width:100%">
                    <q-input filled v-model="location.in.name" label="Add location" style="min-width:100%;max-width:100%">
                        <template v-slot:append>
                            <q-icon name="place"  @click="gmappopup=true, ptype=stype" class="cursor-pointer"></q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="travel" v-if="stype == 'Travel' || stype == 'Travel1'|| stype=='Travel2'" style="min-width:100%;max-width:100%">
                    <div class="row">
                        <div class="col">
                            <q-input filled v-model="location.start.name" label="Start">
                                <template v-slot:append>
                                    <q-icon name="place"  @click="gmappopup=true, ptype='Travel1'" class="cursor-pointer"></q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col" style="max-width:15px"></div>
                        <div class="col">
                            <q-input filled v-model="location.end.name" label="Stop" style="min-width:100%;max-width:100%">
                                <template v-slot:append>
                                    <q-icon name="place"  @click="gmappopup=true, ptype='Travel2'" class="cursor-pointer"></q-icon>
                                </template>
                            </q-input>
                        </div>
                    </div>
                </div>
                <!-- <div class="row q-col-gutter-sm q-gutter-sm" style="min-width:100%;max-width:100%"> -->
                  <q-input filled v-model="startdate" type="date" label="Start Date" stack-label style="width:100%">
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-input>
                  <q-input filled v-model="starttime" type="time" label="Start Time" stack-label style="width:100%">
                  </q-input>
                <!-- </div> -->
                <!-- <div class="row q-col-gutter-sm q-gutter-sm"> -->
                  <q-input filled v-model="enddate" type="date" label="End Date" stack-label style="width:100%">
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-input>
                  <q-input filled v-model="endtime" type="time" label="End Time" stack-label style="width:100%">
                  </q-input>
                <!-- </div> -->
                <q-input ref="input" filled v-model="description" label="Description" style="width:100%"></q-input>
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
            <q-card-section position="bottom-right" style="text-align:right">
              <div class="q-gutter-sm">
                <q-btn outline color="primary" label="Create" style="text-align:right" @click="createActivityBackEnd" v-close-popup="closePopup"></q-btn>
                <q-btn v-close-popup label="Cancel" outline color="negative" style="text-align:right"></q-btn>
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
export default{
    components: {
      'GoogleMap': GoogleMap
    },
    data() {
        return {
            icon: false,
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
            endtime: ''
        }
    },
    methods:{
      getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
      },
      getType(type){
        for(var i; i < type.lenght();i++){
          if(type == type[i]){
            return i
          }
        }
      },
      jsonbodyetc(type){
        let data = JSON.stringify({
          activity_name: this.name,
          start_time: this.starttime,
          start_date: this.startdate,
          end_date: this.enddate,
          end_time: this.endtime,
          type: atype,
          description: this.description,
          in: this.location.in
        })
        return data
      },
      jsonbodyt(type){
          let data = JSON.stringify({
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
        return data
      },
      createActivityBackEnd (){
        var planner_id = this.getParameterByName('plannerid')
        let headers = {'Authorization': 'JWT '+localStorage.token,
                        'Content-Type': 'application/json'}
        if(stype == 'Travel'){
          let data = this.jsonbodyt(stype)
        }else{
          let data = this.jsonbodyetc(stype)
        }
        this.$http.post('/planner/plannerid='+planner_id+'/create_activity',data,{headers})
      },
        handlelocationAdd(val) {
          console.log("val :",val)
          this.gmappopup = false
          var type = val.type
          if(type == 'Travel1'){
            this.location.start.lat = val.lat
            this.location.start.lng = val.lng
          }else if(type == 'Travel2'){
            this.location.end.lat = val.lat
            this.location.end.lng = val.lng
          }else{
            this.location.in.lat = val.lat
            this.location.in.lng = val.lng
          }
          this.request_location_name(val.placeid,type)
        },

        request_location_name: async function(placeId,type) {
          console.log(placeId)
          var proxy = 'https://cors-anywhere.herokuapp.com/'
          var url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+placeId+'&fields=name&key=AIzaSyBMgDcxdxe2KBb6wFj1BlnbWhk3nCvnYhI'
          axios.get(proxy+url)
          .then(response => {
            if(type == 'Travel1'){
              this.location.start.name = response.data.result.name
            }else if(type == 'Travel2'){
              this.location.end.name = response.data.result.name
            }else{
              this.location.in.name = response.data.result.name
            }
          })
          .catch(e => {
          console.log(e)
          })
        }
    }
}
</script>
<style>
.pac-container.pac-logo.hdpi{
    z-index: 9999 !important;
}
.pac-container{
    z-index: 9999 !important;
}
</style>
