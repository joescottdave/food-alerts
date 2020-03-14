<template>
  <div>
    <div class="fullAlert">
      <ul v-if="alert">
        <li>
          <h4>
            {{
              alert.created
                .split("-")
                .reverse()
                .join("/")
            }}
          </h4>
        </li>
        <li>
          <h3>{{ alert.reportingBusiness.commonName }}</h3>
        </li>
        <li>
          <strong>Products:</strong>
          <ul>
            <li v-for="(product, index) in alert.productDetails" :key="index">
              {{ product.productName }}
            </li>
          </ul>
        </li>
        <li v-if="alert.problem[0].allergen">
          <strong>Allergens:</strong>
          <ul>
            <li
              class="allergens-item"
              v-for="(allergen, index) in alert.problem[0].allergen"
              :key="index"
            >
              {{ allergen.label }}
            </li>
          </ul>
        </li>
        <li>
          <strong>Details:</strong>
          <p>{{ alert.actionTaken }}</p>
        </li>
        <li>
          <strong>Advice:</strong>
          <p>{{ alert.consumerAdvice }}</p>
        </li>
      </ul>
    </div>
    <nav>
      <router-link to="/">Go Back</router-link>
    </nav>
  </div>
</template>

<script>
import AlertService from "@/services/AlertService.js";

export default {
  name: "FullAlert",
  data: function() {
    return {
      id: this.$route.params.id,
      alert: null
    };
  },
  mounted: function() {
    AlertService.getAlert(this.id)
      .then(response => (this.alert = response.data.items[0]))
      .catch(error => console.log("There was an error: " + error));
  }
};
</script>

<style scoped>
.fullAlert {
  border-top: #ff0000 2px solid;
  background: #fffbfb;
  box-shadow: 2px 1px 5px 1px #f4f4f4;
  padding: 10px;
  margin: 1em 0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0.4em 0;
}

li {
  margin: 0.6em 0;
}

li p {
  margin-top: 0;
}

li.allergens-item {
  display: inline;
  margin-right: 0.4em;
  padding: 0.1em 0.4em;
  border: 1px solid #ff2424;
  border-radius: 4px;
  background: #fff0f0;
  color: #ff0000;
}

nav {
  display: flex;
  justify-content: center;
}

nav a {
  text-decoration: underline;
}
</style>
