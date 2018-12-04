<template>
  <div>

    <!-- Search Functionality -->
    <section>
      <form v-on:submit="submitThis">
        <input v-model="input"/>
        <button type="submit">Search</button>
      </form>
    </section>

    <section>
      <h2 v-if="searchTerm">Search Results</h2>
      <h2 v-else-if="alerts.length > 1">Latest Alerts</h2>
      <h2 v-else>Latest Alert</h2>
      <p v-if="searchTerm && alerts.length > 1">Your search for "{{searchTerm}}" returned {{alerts.length}} results</p>
      <p v-else-if="searchTerm && alerts.length == 1">Your search for "{{searchTerm}}" returned 1 result.</p>
      <p v-else-if="searchTerm && alerts.length == 0">Your search for "{{searchTerm}}" returned no results.</p>
    </section>

    <!-- Alerts Display -->
    <section v-if="alerts">
      <router-link v-for="alert in alerts" :to="'/alert/' + alert.notation">
        <Alert :desc="alert.title" :date="alert.created" />
      </router-link>
    </section>
    
    <a v-if="alerts.length > 1 || searchTerm" @click="getAlerts(1)" href="#">Reset</a>
    <a v-else @click="getAlerts(10)" href="#">Show ten latest alerts...</a>

  </div>
</template>

<script>
  import Alert from './Alert.vue'

  export default {
    name: 'Home',
    components: {Alert},
    data: function() {
      return {
        alerts: null,
        input: null,
        searchTerm: null
      }
    },
    mounted: function() {
      this.getAlerts(1)
    },
    methods: {
      getAlerts(number) {
        fetch('http://data.food.gov.uk/food-alerts/id?_limit='+number+'&_sort=-created')
          .then(response => response.json())
          .then(data => this.alerts = data.items)
        this.input = null
        this.searchTerm = null
      },
      submitThis(e) {
        e.preventDefault()
        this.searchTerm = this.input
        fetch('https://data.food.gov.uk/food-alerts/id?search=' + this.input)
          .then(response => response.json())
          .then(data => this.alerts = data.items)
      }
    }
  }
</script>