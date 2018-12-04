<template>
  <div>
    <div class="fullAlert">
      <ul v-if="alert">
        <li><h4>{{alert.created}}</h4></li>
        <li><h3>{{alert.reportingBusiness.commonName}}</h3></li>
        <li>
          <strong>Products:</strong>
          <ul>
            <li v-for="product in alert.productDetails">{{product.productName}}</li>
          </ul>
        </li>
        <li v-if="alert.problem[0].allergen">
          <strong>Allergens:</strong>
          <ul>
            <li class="allergens-item" v-for="allergen in alert.problem[0].allergen">{{allergen.label}}</li>
          </ul>
        </li>
        <li>
          <strong>Details:</strong>
          <p>{{alert.actionTaken}}</p>
        </li>
        <li>
          <strong>Advice:</strong>
          <p>{{alert.consumerAdvice}}</p>  
        </li>
      </ul>
    </div>
    <router-link to="/">Go Back</router-link>
  </div>
</template>

<script>
  export default {
      name: 'FullAlert',
      data: function() {
          return {
          id: this.$route.params.id,
          alert: null
          }
      },
      mounted: function() {
          fetch("http://data.food.gov.uk/food-alerts/id/" + this.id)
            .then(response => response.json())
            .then(data => this.alert = data.items[0])
      }
  }
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
    margin: 0.5em 0;
  }

  li.allergens-item {
    display: inline;
    margin-right: 0.4em;
    padding: 0.4em;
    background: #fff0f0;
    color: #ff0000;
  }
</style>