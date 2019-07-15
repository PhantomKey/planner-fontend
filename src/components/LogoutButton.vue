<template>
<q-btn
      flat
      style="width:100px;color:#9D9A9A"
      @click="logout"
    >Logout
</q-btn>
</template>

<script>
export default {
  methods: {
    logout () {
      console.log('logout')
      delete localStorage.token
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
q-btn:hover{
  border-bottom-color: #fa928f;
}
</style>
