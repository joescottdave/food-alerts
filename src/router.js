import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import FullAlert from './components/FullAlert.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path:'/',
            name: 'home',
            component: Home
        },
        {
            path:'/alert/:id',
            name: 'full-alert',
            component: FullAlert,
            props: true
        }
    ]
})