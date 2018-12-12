<template>
  <div id="app">

    <h1>Food Alerts from FSA API</h1>
    <router-view/>
    
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #252525;
  margin: 60px auto 40px auto;
  max-width: 500px;

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

a, a:visited {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
