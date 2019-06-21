<template>
  <!-- Default form login -->
  <div class=box>
    <div class=row>
      <div class="column pic">
      </div>
      <div class="column log">
        <form>
          <br>
          <h3>Sign in</h3>
          <p for="defaultFormLoginEmailEx" class="grey-text">Your email/ Username </p>
          <input type="email" id="defaultFormLoginEmailEx"/>
          <br>
          <br>
          <p for="defaultFormLoginPasswordEx" class="grey-text">Your password </p>
          <input type="password" id="defaultFormLoginPasswordEx"/>
          <br>
          <p></p>
          <div class="text-center">
            <button class="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
</div>
  <!-- Default form login -->
</template>
<style scoped>

#defaultFormLoginEmailEx #defaultFormLoginPasswordEx{
  text-align: left;
}
p{
  text-align: left;
  font-size: 1rem;
  margin-left: 2rem;
}
h3{
  margin-top:-5%;
  text-decoration: underline cornflowerblue;
}
.box{
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
.log{
  width: 50%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align:center;
}
.form{
  width: 50%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  /* text-align:center; */
  clear: both;
}
.row{
  height: 100%;
}
.pic{
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 50%;
  background-color: bisque;
}
</style>
