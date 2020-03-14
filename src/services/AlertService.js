import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://data.food.gov.uk/food-alerts'
})

export default {
  getAlert(id) {
    return apiClient.get('/id/' + id)
  },

  getAlertsList(num) {
    return apiClient.get('/id?_limit='+num+'&_sort=-created')
  },

  getAlertsSearchTerm(term) {
    return apiClient.get('/id?search=' + term)
  }
}