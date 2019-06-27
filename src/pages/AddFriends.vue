<template>
<div class ="box">
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.jpg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Sorry, nothing here...<strong>(404)</strong></p>
    <h2>New Member</h2>
    <br>
    <p>Firstname</p>
    <input type="text" name="firstname" id="firstname">
    <p>lastname</p>
    <input type="text" name="lastname" id="lastname">
    <p>Age</p>
    <input type="text" name="age" id="age">
    <p>Gender</p>
    <input type="radio" name="Gender" id="Gender" value=m> male <input type="radio" name="Gender" id="gender" value=f> female
    <p></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Go back</q-btn>
  </div>
  </div>
</template>

<style>
.box{
  background-color: bisque;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  width: 50rem;
  height: 35rem;
  border-radius: 20px;
  border-style: hidden;
  box-shadow: 5px 10px 8px 10px #888888;
}
</style>
