<template>
  <div>
    <q-btn outline
          color="white"
          style="width:150px;"
          label="Login"
          @click="openLoginDialog = true">
    </q-btn>
    <q-dialog v-model="openLoginDialog">
      <q-card dense style="min-width:40%;max-width:40%">
        <q-card-section class="row justify-center">
          <q-input filled v-model="username" label="Username" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Username is required']"></q-input>
          <q-input filled type="password" v-model="password" label="Password" style="min-width:90%;max-width:90%"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Password is required']"></q-input>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default{
  data() {
    return {
      openLoginDialog: false
    }
  }
}
</script>

<style>
</style>
