<template>
  <div>
    <p> Front page </p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/login')"
    >Login</q-btn>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/register')"
    >Register</q-btn>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
