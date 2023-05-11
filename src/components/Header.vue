<template>
  <div style="line-height: 60px;display: flex">
    <div style="flex: 1; font-size: 20px">
      <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item> {{ currentPathName }} </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width: 100px; cursor: pointer">
      <div style="display: inline-block">
        <span>{{ user.name }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0" v-if="user.roleId != 1">
          <router-link :to="pathType" style="text-decoration: none">个人信息</router-link>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <span style="text-decoration: none" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse: Function,
    }, 
  data() {
    return{
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    }
  },
  computed: {
    currentPathName() {
      return this.$store.state.currentPathName;
    },
    pathType() {
      return this.user.roleId === '2'? '/stuInfo':'/tcInfo'
    }
  },
 
  
  watch: { //监听路由变化
    currentPathName(newVal,oldVal) {
      // console.log(newVal)
    }
  },
  methods: {
    logout(){
      this.$router.push("/login")
      this.$store.commit("logout")
      this.$message.success("退出成功!")
    },
  },


}
</script>

<style scoped>
.router-link-active {
  text-decoration: none;
  color: #FFD04B;
}
a{
  text-decoration: none;
  color: #606266;
}
</style>