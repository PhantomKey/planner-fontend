<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.jpg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p style="color:white;">Sorry, nothing here...<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Go back</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
