import Vue from 'vue'
import VueRouter from 'vue-router'
import ECharts from '../views/ECharts_ncov'
import Home from '../views/HomeView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/echarts',
    name: 'ECharts',
    component: ECharts
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
