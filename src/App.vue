<template>
  <div id="app">
    <section>
      <h2>Single Alert</h2>
      <Alert v-if="alerts" :desc="alerts[0].title" :date="alerts[0].created" />
    </section>
    <section>
      <h2>Ten Most Recent Alerts</h2>
      <Alert v-for="alert in alerts" :desc="alert.title" :date="alert.created"/>
    </section>
    <section>
      <h2>Alert by Keyword</h2>
      <form v-on:submit="submitThis">
      <input v-model="input"/>
      <button type="submit">Search</button>
      </form>
      <Alert v-if="searchResults" v-for="alert in searchResults" :desc="alert.title" :date="alert.created" />
    </section>
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
      searchResults: null
    }
  },
  mounted: function() {
    fetch('http://data.food.gov.uk/food-alerts/id?_limit=10&_sort=-created')
      .then(response => response.json())
      .then(data => this.alerts = data.items)
  },
  methods: {
    submitThis(e) {
      e.preventDefault()
      fetch('https://data.food.gov.uk/food-alerts/id?search=' + this.input)
        .then(response => response.json())
        .then(data => this.searchResults = data.items)
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #252525;
  margin-top: 60px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: column;
}

section {
  border-bottom: 2px grey solid;
  padding: 1em;
  grid-column: auto;
}
</style>
