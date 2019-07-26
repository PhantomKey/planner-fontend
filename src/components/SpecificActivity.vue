<template>
  <div style="height:100%">
    <h1>eiei</h1>
  </div>
</template>

<script>
export default{
  props:{
    activityID: {
      type: Number,
      default: 0
    }
  },
  watch:{
    'activityID': function(){
      console.log(this.activityID)
    }
  },
}

</script>

<style>

</style>
