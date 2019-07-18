<template>
<div>
  <q-card-section>
    <q-input
    debounce
    dense
    streth
    label="Search"
    type="search"
    v-model="searchf"
    @keydown="search"
    >
      <template v-slot:prepend>
        <q-icon name="search"/>
      </template>
    </q-input>
  </q-card-section>
  <q-card-section>
    <q-scroll-area style="min-height:200px;height:200px">
      <q-list>
          <q-item v-for="contact in searchlist" :key="contact.id" class="q-my-sm" clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" class="text-uppercase">{{contact.letter}}</q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-capitalize">{{ contact.name }}  {{contact.lastname}}</q-item-label>
              <q-item-label caption lines="1"><span class="text-weight-bold">Gender:</span> {{contact.gender}}  <span class="text-weight-bold">Age:</span> {{contact.age}}</q-item-label>
            </q-item-section>
          </q-item>
      </q-list>
    </q-scroll-area>
  </q-card-section>
</div>
</template>

<script>
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

        }
    },
    watch:{
      searchf : function(){
         console.log('find')
          if(this.searchf ===''){
            this.searchlist=this.friendlist
          }
          else{
            this.searchlist=[]
            for(var i = 0;i<this.friendlist.length;i++){
              var name = (this.friendlist[i].name).toString()
              var lastname = (this.friendlist[i].lastname).toString()
              if(name.search(this.searchf) != -1 || lastname.search(this.searchf) != -1){
                this.searchlist.push(this.friendlist[i])
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
        search(){
          console.log('find')
          if(this.searchf ===''){
            this.searchlist=this.friendlist
          }
          else{
            this.searchlist=[]
            for(var i = 0;i<this.friendlist.length;i++){
              var name = (this.friendlist[i].name).toString()
              var lastname = (this.friendlist[i].lastname).toString()
              if(name.search(this.searchf) != -1 || lastname.search(this.searchf) != -1){
                this.searchlist.push(this.friendlist[i])
              }
            }
          }
          console.log(this.searchlist)
          
        }
    }
}
</script>

<style scoped>

</style>
