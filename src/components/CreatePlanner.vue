<template>
    <div>
        <q-btn round
        color="primary"
        icon="add"
        style="right:-95%;"
        size="18.5px"
        @click="openCreatePlanner = true">
        </q-btn>
        <q-dialog v-model="openCreatePlanner" @keyup.enter="clickAddPlanner()">
            <q-card dense style="min-width:50%;max-width:50%">
            <q-card-section class="row items-center">
              <div class="text-h6" style="margin:0 auto;">Create New Planner</div>
            </q-card-section>
            <q-card-section class="q-gutter-sm">
              <q-input ref="input" filled v-model="name" label="Name" style="min-width:100%;max-width:100%"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"></q-input>
              <q-input filled v-model="startdate" type="date" label="Start Date" stack-label style="width:100%">
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
              <q-input filled v-model="enddate" type="date" label="Start Date" stack-label style="width:100%">
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
              <q-input ref="input" filled v-model="description" label="Description" style="width:100%"></q-input>
            </q-card-section>
            <q-card-section position="bottom-right" style="text-align:right">
              <div class="q-gutter-sm">
                <q-btn color="primary" class="no-shadow" label="Create" style="text-align:right" @click="clickAddPlanner()"></q-btn>
                <q-btn v-close-popup label="Cancel" outline color="negative" style="text-align:right" @click="resetData()"></q-btn>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
    </div>
</template>
<script>
import { Notify } from 'quasar'
export default{
  data() {
    return {
      openCreatePlanner: false,
      name: '',
      startdate: '',
      enddate: '',
      description: ''
    }
  },
  methods:{
    resetData() {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    emitToHome(){
      this.$emit('refreshPlanner')
    },
    async clickAddPlanner() {
      let headers = {'Authorization': 'JWT '+localStorage.token}
      await this.$http.post('/planner/create_planner', { planner_name: this.name,
        first_date: this.startdate, last_date: this.enddate,
        description: this.description}, {headers})
        .then(request => this.AddPlannerSuccessfulwithPOST(request))
        .catch((err) => this.AddPlannerFailedwithoutPOST(err))
    },
    AddPlannerSuccessfulwithPOST (req) {
      if (req.data.code === 201) {
        Notify.create({
          message: 'Planner created successfully',
          color: 'primary',
          textColor: 'white',
          timeout: 3000,
          position: 'top-right',
          icon: 'check_circle_outline'
        })
        this.openCreatePlanner = false
        this.emitToHome()
        Object.assign(this.$data, this.$options.data.apply(this))
      } else {
        this.AddPlannerFailedwithPOST(req)
      }
    },
    AddPlannerFailedwithPOST (req) {
      console.log(req)
      Notify.create({
        message: 'Failed to create planner, Reason: '+req.data.message,
        color: 'primary',
        textColor: 'white',
        timeout: 3000,
        position: 'top-right',
        icon: 'error'
      })
    },
    AddPlannerFailedwithoutPOST(err) {
      Notify.create({
        message: 'Failed to create planner, '+err,
        color: 'primary',
        textColor: 'white',
        timeout: 3000,
        position: 'top-right',
        icon: 'error'
      })
    }
  }
}
</script>
