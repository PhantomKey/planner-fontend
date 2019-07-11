<template>
<div>
    <q-btn rounded
    color="primary"
    label="Create Service"
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
                    style="min-height: 432px;max-height:432px"
                >
                    An ad group contains one or more ads which target a shared set of keywords.
                </q-step>

                <q-step
                    :name="3"
                    title="Total price"
                    icon="attach_money"
                    :done="done3"
                    style="min-height: 432px;max-height:432px"
                >
                    Try out different ad text to see what brings in the most customers, and learn how to
                    enhance your ads using features like ad extensions. If you run into any problems with
                    your ads, find out how to tell if they're running and how to resolve approval issues.
                </q-step>n
                
                <template v-slot:navigation>
                     <q-card-section position="bottom-right" style="text-align:right;padding-top:8px;right:0px;bottom:0px">
                        <q-stepper-navigation style="text-align:right" v-if="step === 1">
                                <div class="q-gutter-sm">
                                    <q-btn flat v-close-popup type="reset" label="Cancel" color="negative" style="text-align:right" ></q-btn>
                                    <q-btn @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" style="text-align:right"/>
                                </div>
                        </q-stepper-navigation>
                        <q-stepper-navigation v-if="step == 2">
                            <div class="q-gutter-sm">
                                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                                <q-btn @click="() => { done2 = true; step = 3 }" color="primary" label="Continue" />
                            </div>
                        </q-stepper-navigation>
                        <q-stepper-navigation v-if="step == 3">
                            <div class="q-gutter-sm">
                                <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
                                <q-btn color="primary" v-close-popup @click="done3 = true, resetData()" label="Finish" />
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
export default{
    data: function () {
    return {
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
      }
  },
  watch:{
      'calType': function () {
          this.caltypename()
      }
  }

}
</script>

<style scoped>
</style>
