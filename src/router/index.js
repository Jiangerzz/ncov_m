import Vue from 'vue'
import VueRouter from 'vue-router'
import ECharts from '../components/ECharts_ncovmap'
import Home from '../views/NcovData'

Vue.use(VueRouter)

const routes = [
  {
    path: '/echarts',
    name: 'ECharts',
    component: ECharts
  },
  {
    path: '/ncovdt',
    name: 'NcovData',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
