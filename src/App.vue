<template>
  <div id="app">

    <h1>Food Alerts from FSA API</h1>

    <!-- Search Functionality -->
    <section>
      <form v-on:submit="submitThis">
        <input v-model="input"/>
        <button type="submit">Search</button>
      </form>
      <p v-if="searchTerm && alerts.length > 1">Your search for "{{searchTerm}}" returned {{alerts.length}} results</p>
      <p v-else-if="searchTerm && alerts.length == 1">Your search for "{{searchTerm}}" returned 1 result.</p>
      <p v-else-if="searchTerm && alerts.length == 0">Your search for "{{searchTerm}}" returned no results.</p>
    </section>

    <section>
      <h2 v-if="searchTerm">Search Results</h2>
      <h2 v-else-if="alerts.length > 1">Latest Alerts</h2>
      <h2 v-else>Latest Alert</h2>
    </section>

    <!-- Alerts Display -->
    <section>
      <Alert v-for="alert in alerts" :desc="alert.title" :date="alert.created" />
    </section>
    
    <a v-if="alerts.length > 1 || searchTerm" @click="getAlerts(1)" href="#">Reset</a>
    <a v-else @click="getAlerts(10)" href="#">Show ten latest alerts...</a>

  </div>
</template>

<script>
import Alert from './components/Alert.vue'

export default {
  name: 'app',
  components: {
    Alert
  },
  data: function() {
    return {
      alerts: null,
      input: null,
      searchTerm: null,
      // searchResults: null,
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

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #252525;
  margin-top: 60px;

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
