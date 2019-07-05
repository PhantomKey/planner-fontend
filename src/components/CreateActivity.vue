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
                <q-input ref="input" filled v-model="name" label="Name" style="min-width:100%;max-width:100%"></q-input>
                <q-select filled v-model="stype" :options="type" label="Type" style="min-width:100%;max-width:100%"></q-select>
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
                  <p class="text-h6">Add Location: </p>
                  <q-btn round color="primary" size="sm" icon="add" @click="gmappopup=true">
                  </q-btn>
                  <q-dialog v-model="gmappopup">
                    <q-card dense style="min-width:70%;max-width:70%">
                      <google-map></google-map>
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
export default{
    components: {
      GoogleMap
    },
    data() {
        return {
            icon: false,
            gmappopup: false,
            closePopup: false,
            name: '',
            type: ['Travel','Food','Accommodation'],
            stype:'',
            location:{
                start:'',
                end:'',
            },
            description:'',
            startdate: '',
            starttime: '',
            enddate: '',
            endtime: ''
        }
    },
    methods:{
      createActivityBackEnd (){
        if(1){
          this.closePopup = true
          this.$q.notify({
            message: 'Activity created'
          })
        }
        else{
          this.$q.notify({
            message: 'Failed to create activity'
          })
        }
        console.log('Failed to create activity')
      }
    }
}
</script>
<style>
</style>
