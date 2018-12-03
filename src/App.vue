<template>
  <div id="app">

    <h1>Food Alerts from FSA API</h1>
    <router-view/>
    
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #252525;
  margin-top: 60px;
  margin-bottom: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

input, button {
  font-size: 16px;
}

form {
  display:inline;
}
</style>
