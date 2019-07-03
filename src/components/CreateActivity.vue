<template>
    <div>
        <q-btn label="New"
        color="primary" 
        @click="icon = true">
        </q-btn>

        <q-dialog v-model="icon">
            <q-card dense style="min-width:600px;max-width:600px">
            <q-card-section class="row items-center">
                <div class="text-h6" style="margin:0 auto;">New Activity</div>
                <q-space ></q-space>
               
            </q-card-section>
            <q-card-section>
                <q-input 
                    ref="input"
                    filled
                    v-model="name"
                    label="Activity Name"
                    :rules="[val => !!val || 'Field is required']"
                ></q-input>
                <div style="max-width: 300px">
                    <div class="q-gutter-md">
                        <q-select filled v-model="model" :options="type" label="Standard" ></q-select>
                    </div>
                </div>
            </q-card-section>
            <q-card-section position="bottom-right" style="text-align:right">
                 <q-btn flat dense v-close-popup label="Close" color="negative" style="text-align:right"></q-btn>
            </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default{
    data() {
        return {
            icon: false,
            name: '',
            type: ['Travel','Eat','Sleep'],
            stype:'',
            location:{
                start:'',
                end:'',
            },
            description:''
        }
       

    },

}
</script>

<style>
</style>
