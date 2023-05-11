import Vue from 'vue'
import Vuex from 'vuex'
import router, {resetRouter} from "@/router";

import localCache from '@/utils/LocalCache'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        currentPathName: ''
    },
    
    mutations: {
        setPath(state) {
            state.currentPathName = localStorage.getItem("currentPathName")
        },
        logout() {
            // 清空缓存
            localStorage.removeItem("user")
            // localStorage.removeItem("menus")
            // localCache.remove("user")
            localCache.remove("menus")

            // 重置路由
            resetRouter()
        }
    }
})

export default store