<template>
<div>
    <q-btn rounded
    color="primary"
    label="Create Service"
    style="right:4%;bottom:10%;position:absolute"
    icon="add"
    @click="serviceW = true"/>
    <q-dialog v-model="serviceW"> 
        <q-card flat style="width:600px;max-width:600px;height:650px;max-height:650px">
            <q-stepper
            v-model="step"
            header-nav
            ref="stepper"
            color="primary"
            animated
            >
                <q-step
                :name="1"
                title="Service setting"
                icon="all_inclusive"
                :done="done1"
                style="min-height: 485px;max-height:485px"
                >
                    <q-card-section class="row items-center" style="padding-top:0px;padding-bottom:32px">
                        <div class="text-h5" style="margin:0 auto">ADD YOUR SERVICE</div>
                    </q-card-section>
                    <q-card-section class="q-gutter-sm">
                        <q-input filled  dense label="service name" v-model="sname"/>
                        <q-list>
                            <q-item multiline tag="label" v-ripple>
                                <q-item-section>
                                    <q-item-label>Calculate price as {{calname}}</q-item-label>
                                    <q-item-label caption>{{calcaption}}</q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-toggle color="blue" 
                                    v-model="calType" 
                                    val="battery" 
                                    checked-icon="group"
                                    unchecked-icon="person"
                                    keep-color
                                    />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                    <q-card-section style="padding-left:16px;padding-bottom:0px">
                        <div class='text-h6'>Service Price</div>
                    </q-card-section>
                        <q-slide-transition style="width:100%">
                            <div v-show="!calType" style="width:100%">
                                <q-card-section dense class="q-gutter-sm" style="padding-bottom:0px;">
                                    <q-input dense filled label="Kid Price" v-model="siglePrice.kid"
                                    error-message="Require number only"
                                    :error="!numberK"
                                    style="padding-bottom:20px"/>
                                    <q-input dense filled label="Adult Price" v-model="siglePrice.adult"
                                    error-message="Require number only"
                                    :error="!numberA"/>
                                    <q-input dense filled label="Elderly Price" v-model="siglePrice.elderly" 
                                    error-message="Require number only"
                                    :error="!numberE"/>
                                </q-card-section>
                            </div>
                        </q-slide-transition>
                        <q-slide-transition>
                            <div v-show="calType" style="width:100%">
                                <q-card-section dense class="q-gutter-sm">
                                    <q-input dense filled label="Totle Price" v-model="groupPrice"/>
                                </q-card-section>
                            </div>
                        </q-slide-transition>
                            <!-- <q-btn outline type="submit" color="primary" label="Create" style="text-align:right" v-close-popup></q-btn> -->
                </q-step>
                <q-step
                    :name="2"
                    title="Select Member"
                    icon="person_add"
                    :done="done2"
                    style="min-height: 485px;max-height:485px"
                >
                    <q-card-section class="row items-center" style="padding-bottom:0px">
                      <div class="text-h5" style="margin:0 auto;color:#fa928f;padding-bottom:0px">SELECT FRIEND</div>
                  </q-card-section>
                  <friend-component :needdata="needfriendlist" @thisisdata="preparedata"></friend-component>
                </q-step>
                
                <template v-slot:navigation>
                     <q-card-section position="bottom-right" style="text-align:right;padding-top:8px;right:0px;bottom:0px">
                        <q-stepper-navigation style="text-align:right" v-if="step === 1">
                                <div class="q-gutter-sm">
                                    <q-btn flat v-close-popup type="reset" label="Cancel" color="primary" style="text-align:right" ></q-btn>
                                    <q-btn @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" style="text-align:right"/>
                                </div>
                        </q-stepper-navigation>
                        <q-stepper-navigation v-if="step == 2">
                            <div class="q-gutter-sm">
                                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                                <q-btn color="primary" v-close-popup @click="done3 = true, sentdata();showLoading()" label="Finish" />
                            </div>
                        </q-stepper-navigation>
                     </q-card-section>
                </template>

            </q-stepper>
        </q-card>
    </q-dialog>
</div>
</template>

<script>
import FriendComponent from './SelectFriendsInService.vue'
import { Notify } from 'quasar'
export default{
    components:{
    'friend-component':FriendComponent
    },
    props:['activityID'],
    data: function () {
    return {
        id:'',
        serviceW: false,
        sname:'',
        PriceType:'Single',
        calType: false,
        calname:'person',
        calcaption:'Calculation price as a person spilt by age',
        siglePrice:{
            kid:null,
            adult:null,
            elderly:null
        },
        groupPrice:'',
        step:1,
        done1:false,    
        done2:false,
        done3:false,
        needfriendlist:false,
        selected:[]
    }
  },
  computed:{
    numberK(){
        return this.checknumber(this.siglePrice.kid)
    },
    numberA(){
        return this.checknumber(this.siglePrice.adult)
    },
    numberE(){
        return this.checknumber(this.siglePrice.elderly)
    }
  },
  methods:{
    clickAddService() {  
        setTimeout(()=>{
            let headers = {'Authorization': 'JWT '+localStorage.token}
            let planner_id = this.getParameterByName('plannerid')
            console.log('planner_id: '+planner_id+' activity_id: '+this.activityID)
            console.log(this.selected)
            if(this.selected.length !=0 && this.activityID != null){
            console.log('sent to backend')
            this.$http.post('/service/'+planner_id+'/'+this.activityID+'/'+'createservice', {name: this.sname,
            calType:this.calType,kidPrice:this.siglePrice.kid,adutePrice:this.siglePrice.adult
            ,elderlyPrice:this.siglePrice.elderly,price:this.groupPrice,user:this.selected}, {headers})
            .then(request => this.AddServiceSuccessfulwithPOST(request))
            .catch((err) => this.AddServiceFailedwithoutPOST(err))
        }
        },2000)
      
     
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
    checknumber(item){
        if(item){
            var checkNumber = Number(item)
            if(checkNumber) return true
            return false
        }
        return true
    },
    resetData() {
        Object.assign(this.$data, this.$options.data.apply(this))
      },
      caltypename(){
          if(this.calType){
              this.calname = 'group'
              this.calcaption = "Calculation price as a total price and spilt to person that use service"
          }else{
              this.calname = 'person'
              this.calcaption = 'Calculation price as a person spilt by age'
          }
      },
      sentdata(){
        this.needfriendlist = !this.needfriendlist
    },
      preparedata(value){
      console.log('preparedata')
      console.log(value)
      if(!value){
        console.log('no data')
      }else{
        this.selected = value
        console.log('change selected')
        console.log(this.selected)
      }
    },
    checkid(){
        console.log(this.activityID)

    },
    showLoading () {
      this.$q.loading.show()

      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 2000)
    },
    AddServiceSuccessfulwithPOST(req){
        if (req.data.code === 200) {
          Notify.create({
            message: 'Service created successfully',
            color: 'positive',
            textColor: 'black',
            timeout: 3000,
            position: 'top-right',
            icon: 'check_circle'
          })
          this.createActivityPopup = false
          Object.assign(this.$data, this.$options.data.apply(this))
        } else {
          this.AddServiceFailedwithPOST(req)
        }
      },
      AddServiceFailedwithPOST(req){
        Notify.create({
          message: 'Failed to create Service, Reason: '+req.data.message,
          color: 'primary',
          textColor: 'white',
          timeout: 3000,
          position: 'top-right',
          icon: 'error'
        })
      },
      AddServiceFailedwithoutPOST(err){
        Notify.create({
          message: 'Failed to create Service, '+err,
          color: 'primary',
          textColor: 'white',
          timeout: 3000,
          position: 'top-right',
          icon: 'error'
        })
      }
  },
  
  watch:{
      'calType': function () {
          this.caltypename()
      },
      selected:function(){
        console.log('change')
        this.clickAddService()
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
</style>
