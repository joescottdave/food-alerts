<template>
  <div>
    <!-- Search Functionality -->
    <section>
      <form v-on:submit="submitThis">
        <input v-model="input" />
        <button type="submit">Search</button>
      </form>
    </section>

    <section v-if="alerts">
      <h2 v-if="searchTerm">Search Results</h2>
      <h2 v-else-if="alerts.length > 1">Latest Alerts</h2>
      <h2 v-else>Latest Alert</h2>
      <p v-if="searchTerm && alerts.length > 1">
        Your search for "{{ searchTerm }}" returned {{ alerts.length }} results
      </p>
      <p v-else-if="searchTerm && alerts.length == 1">
        Your search for "{{ searchTerm }}" returned 1 result.
      </p>
      <p v-else-if="searchTerm && alerts.length == 0">
        Your search for "{{ searchTerm }}" returned no results.
      </p>
    </section>

    <!-- Alerts Display -->
    <section v-if="alerts">
      <router-link
        v-for="(alert, index) in alerts"
        :key="index"
        :to="'/alert/' + alert.notation"
      >
        <Alert :desc="alert.title" :date="alert.created" />
      </router-link>
    </section>

    <nav v-if="alerts">
      <a
        v-if="alerts.length > 1 || searchTerm"
        @click="handleNavClick(1)"
        href="#"
        >Reset</a
      >
      <a v-else @click="handleNavClick(10)" href="#"
        >Show ten latest alerts...</a
      >
    </nav>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import AlertService from "@/services/AlertService.js";

export default {
  name: "Home",
  components: { Alert },
  data: function() {
    return {
      alerts: null,
      input: null,
      searchTerm: null
    };
  },
  mounted: function() {
    this.getAlertsList(1);
  },
  methods: {
    handleNavClick(num) {
      this.getAlertsList(num);
    },
    getAlertsList(number) {
      AlertService.getAlertsList(number)
        .then(response => (this.alerts = response.data.items))
        .catch(error => console.log("There was an error: " + error));
      this.input = null;
      this.searchTerm = null;
    },
    submitThis(e) {
      e.preventDefault();
      this.searchTerm = this.input;
      AlertService.getAlertsSearchTerm(this.searchTerm)
        .then(response => (this.alerts = response.data.items))
        .catch(error => console.log("There was an error: " + error));
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
}

form,
nav {
  display: flex;
  justify-content: center;
}

nav a {
  text-decoration: underline;
}
</style>
