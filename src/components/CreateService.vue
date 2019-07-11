<template>
<div>
    <q-btn rounded 
    color="primary" 
    label="Create Service"
    @click="serviceW = true"/>

    <q-dialog v-model="serviceW"> 
        <q-card flat style="width:600px;max-width:600px;">
            <q-card-section class="row items-center" style="padding-top:32px;padding-bottom:32px">
                <div class="text-h5" style="margin:0 auto">ADD YOUR SERVICE</div>
            </q-card-section>
            <q-card-section class="q-gutter-sm">
                <q-input filled  dense label="service name" v-model="name"/>
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
                        <q-card-section dense class="q-gutter-sm">
                            <q-input dense filled label="Kid Price" v-model="siglePrice.kid"
                            />
                            <q-input dense filled label="Adult Price" v-model="siglePrice.adult"/>
                            <q-input dense filled label="Elderly Price" v-model="siglePrice.elderly" /> 
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
                
            
            <q-card-section position="bottom-right" style="text-align:right">
                <div class="q-gutter-sm">
                    <q-btn outline type="submit" color="primary" label="Create" style="text-align:right" v-close-popup></q-btn>
                    <q-btn v-close-popup type="reset" label="Cancel" outline color="negative" style="text-align:right" ></q-btn>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</div>
</template>

<script>
export default{
    data: function () {
    return {
        serviceW: false,
        name:'',
        PriceType:'Single',
        calType: false,
        calname:'person',
        calcaption:'Calculation price as a person spilt by age',
        siglePrice:{
            kid:'',
            adult:'',
            elderly:''
        },
        groupPrice:'',
    }
  },
  methods:{
      caltypename(){
          if(this.calType){
              this.calname = 'group'
              this.calcaption = "Calculation price as a total price and spilt to person that use service"
          }else{
              this.calname = 'person'
              this.calcaption = 'Calculation price as a person spilt by age'  
          }
      }
  },
  watch:{
      'calType': function () {
          this.caltypename()
      }
  }

}
</script>

<style>
</style>
