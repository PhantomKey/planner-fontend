<template>
    <q-scroll-area v-if="result">
        <div class="q-pa-md row items-start q-gutter-md">
        <q-card flat>
            <q-item>
                <q-item-section>
                    <div class="text-h4">
                      {{this.planner_name}}
                    </div>
                </q-item-section>
            </q-item>
        </q-card>
        <q-card flat bordered>
            <q-card-section>
            <q-item>
                <q-item-section avatar>
                    <q-avatar icon="fas fa-coins" color="primary" size="4rem"/>
                </q-item-section>

                <q-item-section>
                     <div class="text-h4" style="display:inline-block">Your: money</div>
                </q-item-section>
            </q-item>
            </q-card-section>
            <q-card-section>
                <div>member in planner</div>
                <q-separator/>
                <!-- <div v-for="contact in selectedlist" :key="contact.id" style="display:contents;" class="q-gutter-md">
                    <q-chip dense removable v-model="contact.selected">
                        <q-avatar  v-if="contact.owner == '0'" color="primary" text-color="white" class="text-uppercase">{{contact.letter}}</q-avatar> <span v-if="contact.owner == '0'" class="text-capitalize">{{contact.name}}</span>
                        <q-avatar  v-if="contact.owner == '1'" color="grey-4" icon="person" ></q-avatar> <span  v-if="contact.owner == '1'" class="text-capitalize">{{contact.name}}</span>
                    </q-chip>
                </div> -->
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
