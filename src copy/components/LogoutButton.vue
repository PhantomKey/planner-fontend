<template>
<q-btn
      color="secondary"
      style="width:200px;"
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

<style>
</style>
