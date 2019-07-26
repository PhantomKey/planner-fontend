<template>
    <q-scroll-area v-if="result">
        <div class="q-pa-md  items-start q-gutter-md">
        <q-card flat style="width:60%;max-width:60%;height:auto">
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
        <q-card flat style="width:60%">
            <q-card-section style="padding-left:6px">
            <q-item style="padding-left:0px">
                <q-item-section avatar>
                    <q-icon name="attach_money" size="3rem"></q-icon>
                </q-item-section>
                <q-item-section>
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
                    <div v-for="member in result" :key="member[0]">
                        <q-card v-if="member.length == 6" >
                            <q-item>
                                <q-item-section avatar>
                                    <q-avatar color="primary" text-color="white" class="text-uppercase">{{member[1][1]}}</q-avatar>
                                </q-item-section>
                            </q-item>
                        </q-card>
                    </div>
                </div>
            </q-card-section>
        </q-card>
        <q-card class="my-card">
            <q-item>
                <q-item-section avatar>
                <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                </q-avatar>
                </q-item-section>

                <q-item-section>
                <q-item-label>Title</q-item-label>
                <q-item-label caption>Subhead</q-item-label>
                </q-item-section>
            </q-item>

            <img src="https://cdn.quasar.dev/img/parallax2.jpg">
        </q-card>
        </div>
    </q-scroll-area>
</template>

<script>
export default{
    data(){
        return{
            result:null,
            planner_name:null
        }
    },
    created:function(){
        this.getResult().then(data=>{
            this.result = data
            this.planner_name = this.result[0].planner_name
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
