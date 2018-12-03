<template>
  <div class="alert">
      <h3>This is an alert.</h3>
      <h4>{{ date }}</h4>
      <p>{{ desc }}</p>
  </div>
</template>

<script>
  export default {
      name: 'Alert',
      props: ['date', 'desc']
  }
</script>

<style scoped>
  h3 {
      color: red;
  }
</style>