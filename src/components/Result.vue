<template>
    <q-scroll-area v-if="result">
        <div class="q-pa-md  items-start q-gutter-md">
        <q-card flat style="width:60%;max-width:60%;height:auto;">
            <q-item style="padding-top:0px">
                <q-item-section>
                    <q-item-label>
                        <div class="text-h4" >
                        <span style="text-color:#161413" class="text-uppercase text-weight-bold">{{this.planner_name}} TRIP___</span>
                        </div>
                    </q-item-label>
                    <q-item-label caption style="width:100%"><div style="width:100%;word-break:break-word">{{this.result[0].desc}}asdiiuadgaksdhkjashdkjhaskjdhjaskkdfkf;kals;dkl;askd;lask;ldk;laskd;lkas;ldk;laskd;lkas;ldk;laskdk;laskl;dkasl;ddjas
                        hkjdashjasdasdhjkasd</div>
                    </q-item-label>
                </q-item-section>

                <q-item-section avatar top style="margin-left:-55%;margin-top:-10px">
                     <q-icon name="fas fa-plane" size="2.5rem" color="primary"/>
                </q-item-section>
            </q-item>
        </q-card>
        <q-card flat style="background: linear-gradient(90deg, rgba(255,230,230,1) 0%, rgba(255,255,255,1) 100%);width:70%">
            <q-card-section style="padding-left:6px">
            <q-item style="padding-left:0px;">
                <q-item-section>
                     <div class="text-h4" style="display:inline-block;padding-left:8px">TOTAL PRICE IN TRIP :</div>
                </q-item-section>
                <q-item-section avatar style="padding-left:0px">
                    <q-avatar size="4rem">฿</q-avatar>
                </q-item-section>
                <q-item-section style="max-width:100px">
                     <div class="text-h4" style="display:inline-block">{{this.result[0].allprice}}</div>
                </q-item-section>
            </q-item>
            </q-card-section>
        </q-card>
        <q-card flat>
            <q-card-section>
                <q-item style="padding-left:0px">
                    <q-item-section style="padding-left:0px">
                        <div class="text-h4 text-uppercase">member in trip</div>
                    </q-item-section>
                </q-item>
                <q-separator/>
            </q-card-section>
            <q-card-section>
                <div class="q-pa-md row items-start q-gutter-md">
                    <div v-for="member in memberlist" :key="member[0]" style="width:45%;padding:0px">
                        <q-card v-if="member.length == 7">
                            <q-item style="background: linear-gradient(140deg, rgba(255,230,230,1) 0%, rgba(255,194,192,1) 100%);">
                                <q-item-section avatar>
                                    <q-avatar color="grey-4" text-color="black-2" class="text-uppercase" v-if="member[4] == true">{{member[1][0]}}</q-avatar>
                                    <q-avatar color="primary" text-color="white" class="text-uppercase" v-if="member[4] == false">{{member[1][0]}}</q-avatar>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label class="text-capitalize">{{ member[1] }}  {{ member[2] }}</q-item-label>
                                    <q-item-label caption lines="1" v-if="member[3] == 'M'"><span class="text-weight-bold">Gender:</span> Male  </q-item-label>
                                    <q-item-label caption lines="1" v-if="member[3] == 'F'"><span class="text-weight-bold">Gender:</span> Female  </q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <div class="text-body2">Total price in trip: {{member[5]}} ฿</div>
                                </q-item-section>
                            </q-item>
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
    data(){
        return{
            result:null,
            planner_name:null,
            memberlist:null
        }
    },
    created:function(){
        this.getResult().then(data=>{
            this.result = data
            this.planner_name = this.result[0].planner_name
            this.memberlist = JSON.parse(JSON.stringify(this.result))
            delete this.memberlist[0]
        })

    },
    methods:{
        async getResult(){
            let data
            let headers = {'Authorization': 'JWT '+localStorage.token,
                        'Content-Type': 'application/json'}
            var planner_id = this.getParameterByName('plannerid')
            await this.$http.get('/service/planner_id='+planner_id+'/member',{headers})
            .then((request) => data = request['data']['data'])
            .catch((err) => console.log(err))
            console.log(data)
            console.log(data[1])
            return data
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
    },

}
</script>

<style>
</style>
