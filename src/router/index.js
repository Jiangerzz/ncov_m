import Vue from 'vue'
import VueRouter from 'vue-router'
import ECharts from '../views/ECharts_ncov'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ECharts',
    component: ECharts
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
