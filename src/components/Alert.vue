<template>
  <div class="alert">
      <h4>{{ date.split('-').reverse().join('/') }}</h4>
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
  .alert {
      background: #fffbfb;
      border-top: 2px red solid;
      box-shadow: 2px 1px 5px 1px #f4f4f4;
      padding: 10px;
      margin: 1em 0;
      max-width: 500px;
  }
</style>