<template>
<div>
  <q-card-section class="row item-center">
    <q-input
    debounce
    dense
    streth
    label="Search"
    type="search"
    v-model="searchf"
    class="col-9">
      <template v-slot:prepend>
        <q-icon name="search"/>
      </template>
    </q-input>
    
    <q-btn class="col"  unelevated style="color:#ffc7cb"  v-if="select" @click="selectedall">SELECT ALL</q-btn>
     <q-btn class="col"  unelevated color="primary" v-if="selected" @click="selectedall">SELECT ALL</q-btn>
  </q-card-section>
  <q-card-section>
    <q-scroll-area style="min-height:200px;height:200px">
      <q-list>
          <q-item multiline tag="label" v-for="contact in searchlist" :key="contact.id" class="q-my-sm" clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar color="primary" text-color="white" class="text-uppercase">{{contact.letter}}</q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-capitalize">{{ contact.name }}  {{contact.lastname}}</q-item-label>
              <q-item-label caption lines="1"><span class="text-weight-bold">Gender:</span> {{contact.gender}}  <span class="text-weight-bold">Age:</span> {{contact.age}}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
               <q-checkbox 
               v-model="contact.selected"
               color="accent"/>
            </q-item-section>
          </q-item>
      </q-list>
    </q-scroll-area>

    <q-scroll-area style="min-height:100px;height:100px">
      <div>
        <div v-for="contact in selectedlist" :key="contact.id" style="display:contents;" class="q-gutter-md">
        <q-chip dense removable v-model="contact.selected">
          <q-avatar color="primary" text-color="white" class="text-uppercase">{{contact.letter}}</q-avatar> <span class="text-capitalize">{{contact.name}}</span>
       </q-chip>
        </div>
      </div>
    </q-scroll-area>
    

  </q-card-section>
</div>
</template>

<script>
import { Notify } from 'quasar'
import { timeout } from 'q';
export default {
    mounted(){
      this.showAllFriends()
    },
    data(){
        return{
            friendlist:[],
            searchf:'',
            searchlist:[],
            selectedlist:[],
            val:false,
            select:true,
            selected:false,
            count:0
        }
    },
    watch:{
      selectedlist:{
        deep:true,
        handler(){
        for(var i = 0;i<this.selectedlist.length;i++){
              if(!this.selectedlist[i].selected){
                this.select = true
                this.selected = false
                this.selectedlist.splice(i,1)
                break
              }
          }
        }
      },
      select : function(){
        if(!this.select){
          for(var i = 0;i<this.friendlist.length;i++){
              this.friendlist[i].selected = true
          }
          this.selectedlist = JSON.parse(JSON.stringify(this.friendlist))
        }
      },
      selected: function(){
        if((!this.selected && this.selectedlist.length == 0) || (!this.selected && this.selectedlist.length == this.friendlist.length)){
           for(var i = 0;i<this.friendlist.length;i++){
              this.friendlist[i].selected = false
            }
            this.selectedlist = []
        }
      },
      searchf : function(){
          var special = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/        
          if(special.test(this.searchf)){
            Notify.create({
            message: "Don't use special charactor",
            color: 'primary',
            textColor: 'white',
            timeout: 3000,
            position: 'top-right',
            icon: 'error'
          })
          }else{
            if(this.searchf ===''){
              this.searchlist=this.friendlist
            }
            else{
              this.searchlist=[]
              for(var i = 0;i<this.friendlist.length;i++){
                var name = (this.friendlist[i].name).toString().toLowerCase()
                var lastname = (this.friendlist[i].lastname).toString().toLowerCase()
                if(name.search(this.searchf.toLowerCase()) != -1 || lastname.search(this.searchf.toLowerCase()) != -1){
                  this.searchlist.push(this.friendlist[i])
                }
              }
            }
          }
      }
    },
    methods: {
        async showAllFriends () {
            this.friendlist=[]
            let headers = {'Authorization': 'JWT '+localStorage.token}
            let value = await this.$http.get('/api/v1/member',{headers})
            this.renderFriends(value)
            this.searchlist=this.friendlist
        },
        renderFriends (value) {
            for(var i = 0;i < value['data']['id'].length;i++){
              let str = value['data']['members'][i]
              let letter = str.toString().substring(0,1)
              if(value['data']['gender'][i] == 'm'){
                var gender = 'Male'
              }else{
                var gender = 'Female'
              }
              this.friendlist.push({id:value['data']['id'][i],name:value['data']['members'][i],
              lastname:value['data']['lastname'][i],gender:gender,letter:letter,age:value['data']['age'][i],
              selected:false})
            }
        },
        selectedall(){
          console.log('select')
          if(this.select){
            this.select = false
            this.selected = true
          }else{
            this.selected = false
            this.select = true
          }
        }
    }
}
</script>

<style scoped>

</style>
