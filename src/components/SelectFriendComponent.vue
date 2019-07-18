<template>
  <q-list bordered padding>
      <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ contact.letter }}
          </q-avatar>
        </q-item-section>
      </q-item>
  </q-list>
</template>

<script>
export default {
    mounted(){

    },
    data(){
        return{
            friendlist:[],
        }
    },
    methods: {
        async showAllFriends () {
            this.friendlist=[]
            let headers = {'Authorization': 'JWT '+localStorage.token}
            let value = await this.$http.get('/api/v1/member',{headers})
            this.renderFriends(value)
            console.log('very good')
        },
        renderFriends (value) {
            for(var i = 0;i < value['data']['id'].length;i++)
            this.friendlist.push({id:value['data']['id'][i],name:value['data']['members'][i]})
            console.log(this.friendlist)
        },
    }
}
</script>

<style scoped>

</style>
