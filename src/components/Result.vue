<template>
    <q-scroll-area>
        <div>
            <div class="text-h4" style="text-align:center;">RESULT</div>
           
        </div>
        <div class="q-pa-md row items-start q-gutter-md">
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

        }
    },
    mounted() {
        this.getResult()
    },
    methods:{
        async getResult(){
            let headers = {'Authorization': 'JWT '+localStorage.token,
                        'Content-Type': 'application/json'}
            var planner_id = this.getParameterByName('plannerid')
            await this.$http.get('/service/planner_id='+planner_id+'/member',{headers})
            .then((request) => console.log(request))
            .catch((err) => console.log(err))
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
