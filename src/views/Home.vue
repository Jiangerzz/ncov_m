<template>
<div class="home">
  <el-row style="margin-top: 20px">
    <el-col :span="8" style="margin-left: 10px">
      <el-card style="height: 70px">
        <i class="el-icon-chat-round"></i>
        <span style="color: #606266">   欢迎用户 {{user.username}}</span>
      </el-card>
      
        <img src="../assets/shouye.jpg" style=" width: 100%;height: 100%;object-fit: fill;">
      
      <el-card style="text-align: center; height: 130px">
        <span style="font-size: 29px; text-align: center" >温馨提示<br></span>
        <br>
        <span style="font-size: 14px;color: #909399;text-align: center;">在使用中若遇到问题，请联系管理员</span>
      </el-card>
      
    </el-col>
  <el-col :span="14" style="margin-left: 30px;margin-top: 40px">
      <NcovMap/>
  </el-col>
 
  
  </el-row>
</div>
</template>

<script>
import NcovMap from "../components/ECharts_ncovmap"
export default {
  name: "Home",
  components: {
    NcovMap
  },
  data(){
    return{
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-bottom: 20px; /*模块之前有间隔*/
}
</style>