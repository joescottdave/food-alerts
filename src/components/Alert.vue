<template>
  <div class="alert">
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
  .alert {
      background: #f4f4f4;
      border-top: 2px red solid;
      padding: 4px;
      margin: 1em 0;
  }
  h3 {
      color: red;
  }
</style>