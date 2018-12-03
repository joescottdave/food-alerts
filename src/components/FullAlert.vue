<template>
  <div>
    <ul>
      <li>{{alert.created}}</li>
      <li>{{alert.reportingBusiness.commonName}}</li>
      <li v-for="product in alert.productDetails">{{product.productName}}</li>
      <li class="allergens-item" v-for="allergen in alert.problem[0].allergen">{{allergen.label}}</li>
      <li>{{alert.actionTaken}}</li>
      <li>{{alert.consumerAdvice}}</li>
    </ul>
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