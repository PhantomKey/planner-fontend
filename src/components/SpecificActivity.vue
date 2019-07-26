<template>
  <q-scroll-area v-if="">
      <div class="q-pa-md  items-start q-gutter-md">
      <q-card flat style="width:60%;max-width:60%;height:auto">
          <q-item style="padding-top:0px">
              <q-item-section>
                  <q-item-label>
                      <div class="text-h4" >
                      <span style="text-color:#161413" class="text-uppercase text-weight-bold">{{activityname}}</span>
                      </div>
                  </q-item-label>
              </q-item-section>
          </q-item>
      </q-card>
      <q-card flat>
          <q-card-section>
              <q-item style="padding-left:0px">
                  <q-item-section style="padding-left:0px">
                      <div class="text-h4 text-uppercase">Services in this activity</div>
                  </q-item-section>
              </q-item>
              <q-separator/>
          </q-card-section>
          <q-card-section>
              <div class="q-pa-md row items-start q-gutter-md">
                  <div v-for="service in servicelist" :key="service[0]" style="width:100%;padding:0px">
                      <q-card v-if="service.length == 4">
                          <q-item>
                              <q-item-section avatar>
                                  <q-avatar color="primary" text-color="white" class="text-uppercase">{{service[1][0]}}</q-avatar>
                              </q-item-section>
                              <q-item-section>
                                  <q-item-label class="text-capitalize">{{ service[1] }}</q-item-label>
                              </q-item-section>
                          </q-item>
                          <q-item-label class="text-capitalize" style="padding-left:20px">Members in this service:</q-item-label>
                          <br>
                          <div v-for="member in service[2]" :key="member[0]" style="width:30%;padding:0px">
                            <q-card v-if="member.length == 5">
                              <q-item>
                                <q-item-section avatar>
                                    <q-avatar color="primary" text-color="white" class="text-uppercase">{{member[1][0]}}</q-avatar>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label class="text-capitalize">{{member[1]}} {{member[2]}}</q-item-label>
                                    <q-item-label caption lines="1"><span class="text-weight-bold">Price: </span>{{member[4]}}</q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card>
                          </div>
                      </q-card>
                  </div>
              </div>
          </q-card-section>
      </q-card>
      </div>
  </q-scroll-area>
</template>

<script>
export default{
  data: function () {
    return {
            servicelist:[],
            memberlist:[],
            activityname: null
          }
  },
  props:{
    activityID: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.initialrun();
  },
  methods:{
    async initialrun(){
      let headers = {'Authorization': 'JWT '+localStorage.token}
      await this.$http.get ('/service/'+this.activityID+'/service', {headers})
      .then(value => this.runServiceActivityFunctionwithvalue(value))
    },
    async updateServiceList(){

    },
    runServiceActivityFunctionwithvalue(value){
      console.log(value)
      this.setActivityName(value);
      this.updateServiceList(value);
    },
    setActivityName(value){
      this.activityname = value['data']['activityname']
    },
    updateServiceList(value){
      this.servicelist = value['data']['data']
      delete this.servicelist[999999]
    }
  }
}

</script>

<style>

</style>
