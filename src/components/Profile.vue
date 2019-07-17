<template>
    <q-chip text-color="black" style="color:black;margin-right:18px;padding-right:100px" @click="open=true" clickable>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar5.jpg">
        </q-avatar>
        {{name}}
        <q-btn-dropdown :icon-right="null" fab-mini flat :ripple="false" unelevated v-model="open" :label="null" style="position:absolute;right:0px">
            <q-list dense style="min-width:120px">
                <q-item clickable v-close-popup @click="logout()">
                <q-item-section>
                    <q-item-label>logout</q-item-label>
                </q-item-section>
                </q-item>
            </q-list>
        </q-btn-dropdown>

    </q-chip>
</template>

<script>
import { type } from 'os';
export default{
    props:{
        name:{
            type: String,
            default: 'None'
        }
    },
    data(){
        return{
            account:'',
            open:false
        }
    },
    methods:{
        logout () {
            console.log('logout')
            delete localStorage.token
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
body.desktop .q-focusable:focus .q-focus-helper,
body.desktop .q-hoverable:hover .q-focus-helper {
background: none !important;
opacity: 0 !important;
}
body.ios .q-hoverable:active .q-focus-helper {
background: none !important;
opacity: 0 !important;
}
.q-focus-helper {
opacity: 0 !important;
transition: unset !important;
}
</style>
