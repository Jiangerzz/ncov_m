import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
import localCache from '@/utils/LocalCache'

Vue.use(VueRouter)

const routes = [
  
  {
    path: "/login",
    name: "登录页面",
    component: () => import("../views/Login")
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },

    
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 提供一个重置路由的方法
export const resetRouter = () => {
  router.matcher = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}

//注意：刷新页面会导致页面路由重置
export const setRoutes = () => {
  const storeMenus = JSON.stringify(localCache.get("menus"))
  if (storeMenus) {

    // 获取当前的路由对象名称数组
    const currentRouteNames = router.getRoutes().map(v => v.name)
    if (!currentRouteNames.includes('Manage')) {
      // 拼装动态路由
      const manageRoute = { path: '/', name: 'Manage', component: () => import('../views/Manage.vue'), redirect: "/home", children: [
          { path: '/stuInfo', name: '学生个人信息', component: () => import('../views/StuInfo.vue')},
          { path: '/tcInfo', name: '教职工个人信息', component: () => import('../views/TcInfo.vue')}
        ] }
      const menus = JSON.parse(storeMenus)
      if(menus != null) {
        menus.forEach(item => {
          if (item.path) {  // 当且仅当path不为空的时候才去设置路由
            let itemMenu = {
              path: item.path.replace("/", ""),
              name: item.name,
              component: () => import('../views/' + item.pagePath + '.vue')
            }
            manageRoute.children.push(itemMenu)
          } else if (item.children.length) {
            item.children.forEach(item => {
              if (item.path) {
                let itemMenu = {
                  path: item.path.replace("/", ""),
                  name: item.name,
                  component: () => import('../views/' + item.pagePath + '.vue')
                }
                manageRoute.children.push(itemMenu)
              }
            })
          }
        })
      }
      // 动态添加到现在的路由对象中去
      router.addRoute(manageRoute)
    }

  }
}

// 重置我就再set一次路由
setRoutes()



router.beforeEach((to,from,next) => {
  localStorage.setItem("currentPathName",to.name)
  store.commit("setPath")
  
  
  if(!to.matched.length) { //未找到路由
    const storeMenus = JSON.stringify(localCache.get("menus"))
    if(!storeMenus == 'null') {
      next("/404")
    } else {
      next("/login")
    }
  }
  next()
})

export default router
