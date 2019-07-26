<template>
  <q-scroll-area v-if="">
    <div class="q-pa-md  items-start q-gutter-md">
      {{activityname}}
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
      .then(value => this.setActivityName(value))
    },
    async updateServiceList(){

    },
    setActivityName(value){
      this.activityname = value['data']['activityname']
    }
  }
}

</script>

<style>

</style>
