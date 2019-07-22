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
            <q-item-section avatar top v-if="contact.owner == '0'">
              <q-avatar color="primary" text-color="white" class="text-uppercase">{{contact.letter}}</q-avatar>
            </q-item-section>
            <q-item-section avatar top v-if="contact.owner == '1'">
              <q-avatar icon="person" color="grey-4"></q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-capitalize">{{ contact.name }}  {{contact.lastname}}</q-item-label>
              <q-item-label caption lines="1"><span class="text-weight-bold">Gender:</span> {{contact.gender}}  <span class="text-weight-bold">Age:</span> {{contact.age}}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
               <q-checkbox 
               v-model="contact.selected"
               @input="editFriend(contact.id,contact)"
               color="accent"/>
            </q-item-section>
          </q-item>
      </q-list>
    </q-scroll-area>

    <q-scroll-area style="min-height:100px;height:100px">
      <div>
        <div v-for="contact in selectedlist" :key="contact.id" style="display:contents;" class="q-gutter-md">
        <q-chip dense removable v-model="contact.selected">
          <q-avatar  v-if="contact.owner == '0'" color="primary" text-color="white" class="text-uppercase">{{contact.letter}}</q-avatar> <span v-if="contact.owner == '0'" class="text-capitalize">{{contact.name}}</span>
          <q-avatar  v-if="contact.owner == '1'" color="grey-4" icon="person" ></q-avatar> <span  v-if="contact.owner == '1'" class="text-capitalize">{{contact.name}}</span>
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
  props:['needdata'],
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
            count:0,
            update:0
        }
    },
    watch:{
      'needdata':function(){
        console.log('this is seleted list')
        console.log(this.selectedlist)
        if(this.selectedlist.length != 0) this.$emit('thisisdata',this.selectedlist)
        else this.$emit('thisisdata',false)
      },
      selectedlist:{
        deep:true,
        handler(){
          if(this.count === this.update){
            for(var i = 0;i<this.selectedlist.length;i++){
                if(!this.selectedlist[i].selected){
                  this.select = true
                  this.selected = false
                  for(var j = 0;j<this.friendlist.length;j++){
                    if(this.friendlist[j].id == this.selectedlist[i].id){
                      this.searchlist[j].selected = false
                      this.friendlist[j].selected = false
                      break
                    }
                  }
                  this.selectedlist.splice(i,1)
                  break
                }
            }
          }else{
            this.update = JSON.parse(JSON.stringify(this.count))
          }
        }
      },
      select : function(){
        if(!this.select){
          console.log('this is select function')
          for(var i = 0;i<this.friendlist.length;i++){
              this.friendlist[i].selected = true
          }
          this.selectedlist = JSON.parse(JSON.stringify(this.friendlist))
          this.searchlist = JSON.parse(JSON.stringify(this.friendlist))
        }
      },
      selected: function(){
        if((!this.selected && this.selectedlist.length == 0) || (!this.selected && this.selectedlist.length == this.friendlist.length)){
          console.log('this is selected watcher')
           for(var i = 0;i<this.friendlist.length;i++){
              this.friendlist[i].selected = false
            }
            this.searchlist = JSON.parse(JSON.stringify(this.friendlist))
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
              this.searchlist=JSON.parse(JSON.stringify(this.friendlist))
            }
            else{
              console.log('search')
              this.searchlist=[]
              console.log(this.searchlist)
              for(var i = 0;i<this.friendlist.length;i++){
                var name = (this.friendlist[i].name).toString().toLowerCase()
                var lastname = (this.friendlist[i].lastname).toString().toLowerCase()
                if(name.search(this.searchf.toLowerCase()) != -1 || lastname.search(this.searchf.toLowerCase()) != -1){
                  console.log(this.friendlist[i])
                  this.searchlist.push(this.friendlist[i])
                  console.log(this.searchlist)
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
            this.searchlist= JSON.parse(JSON.stringify(this.friendlist))
        },
        renderFriends (value) {
            for(var i = 0;i < value['data']['id'].length;i++){
              let str = value['data']['members'][i]
              let letter = str.toString().substring(0,1)

              if(value['data']['gender'][i] == 'M'){
                var gender = 'Male'
              }else{
                var gender = 'Female'
              }

              if(value['data']['id'][i] == '1'){
                this.friendlist.push({id:value['data']['id'][i],name:value['data']['members'][i],
                lastname:value['data']['lastname'][i],gender:gender,letter:letter,age:value['data']['age'][i],
                selected:true,owner:value['data']['owner'][i]})

                this.selectedlist.push({id:value['data']['id'][i],name:value['data']['members'][i],
                lastname:value['data']['lastname'][i],gender:gender,letter:letter,age:value['data']['age'][i],
                selected:true,owner:value['data']['owner'][i]})

              }else{
                this.friendlist.push({id:value['data']['id'][i],name:value['data']['members'][i],
                lastname:value['data']['lastname'][i],gender:gender,letter:letter,age:value['data']['age'][i],
                selected:false,owner:value['data']['owner'][i]})
              }
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
        },
        editFriend(id,c){
          this.count++
          for(var i = 0;i<this.searchlist.length;i++){
            if(this.searchlist[i].id === id){
              console.log('found searchlist.id = id')
              console.log(this.searchlist[i])
              console.log(this.searchlist[i].selected)
              console.log(this.friendlist[1])
              if(this.searchlist[i].selected == true){
                console.log('this stage is true')
                this.searchlist[i].selected = false
              }else if(this.searchlist[i].selected == false){ 
                console.log('change stage to True')
                this.searchlist[i].selected = true
              }
              console.log('after change state: ' +this.searchlist[i].name+' have stage '+this.searchlist[i].selected)
            }
          }
          for(var i = 0;i<this.friendlist.length;i++){
            console.log('name: '+ this.friendlist[i].name+' status: '+this.friendlist[i].selected)
            if(this.friendlist[i].id === id){
              console.log('friend:')
              console.log(this.friendlist[i].selected)
              if(this.friendlist[i].selected){
                console.log('set false')
                for(var j = 0; j < this.selectedlist.length; j++){
                  if(this.searchlist[j].id == id){
                    this.searchlist[j].selected = false
                    break
                  }
                }
                this.friendlist[i].selected = false
                for(var j = 0;j<this.selectedlist.length;j++){
                  if(this.selectedlist[j].id === id){
                    this.selectedlist.splice(j,1)
                    break
                  }
                }
                break
              }else{
                console.log('set friend true')
                this.searchlist[i].selected = true
                this.friendlist[i].selected = true
                var check = true
                for(var j = 0;j<this.selectedlist.length;j++){
                  if(this.selectedlist[j].id === id){
                    check = false
                    console.log('duplicate')
                    break
                  }
                }
                if(check){
                  console.log('push')
                  this.selectedlist.push(this.friendlist[i])
                  console.log(this.selectedlist)
                  break
                } 
              }
            }
          }
          if(this.selectedlist.length != this.friendlist.length){
            console.log('not selected all')
            this.select = true
            this.selected = false
          }
        }
    }
}
</script>

<style scoped>

</style>
