<template>
  <div id="app">
  <!--  <router-link :to="{ name: 'groupset' }">/groupset</router-link>
     <router-link :to="{ name: 'admin' }">/admin</router-link>
      <router-link :to="{ name: 'home' }">/home</router-link>
 -->

    <router-view ></router-view>
  
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  
}
</style>
