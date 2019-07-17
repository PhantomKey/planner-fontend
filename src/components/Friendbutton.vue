<template>
<div>
  <q-btn
        flat
        :style="style"
        color="#9D9A9A"
        @click="logout"
        @mouseover="changeStage"
        @mouseout="clear"
      >Friend
  </q-btn>
</div>
</template>

<script>
export default {
  data(){
    return{
      style:"width80px;color:#9D9A9A"
    }
  },
  methods: {
    logout () {
      console.log('logout')
      delete localStorage.token
      this.$router.push('/')
    },
    changeStage(){
      this.style="width80px;color:#fa928f"
    },
    clear(){
      this.style="width80px;color:#9D9A9A"
    }
  }
}
</script>

<style scoped>
div{
  display: inline-block;
  position:absolute;
  right:180px;
}
div:hover{
  border-bottom: 3px solid  #fa928f
}
</style>
