<template>
  <div class="login-container">
   <div class="form">
     <div class="left">
       <img src="../assets/login.jpg" height="270px" width="270px" style="margin-right: 10px;border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
     </div>
     <div class="right">
       <div style="margin: 20px 0; text-align: center; font-size: 24px;"><b>校园疫情防控管理系统</b></div>
       <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>
      </el-form>
       <div style="margin: 5px 0; text-align: center">
        <el-button type="primary" size="medium" autofocus="autofocus" @click="login">登录</el-button>
      </div>
     </div>
    </div>
  </div>
  
</template>
<script>
import {setRoutes} from "@/router";
import localCache from '@/utils/LocalCache'

export default {
  name: "Login",
  data() {
    return {
      user: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    login() {
      
      this.$refs['userForm'].validate((valid) => {
        if(valid){
          this.request.post("/user/login",this.user).then(res => {
            // console.log(res)
            if(res.code === '200') {
              localStorage.setItem("user",JSON.stringify(res.data))
              // localStorage.setItem("menus", JSON.stringify(res.data.menus))
              localCache.set("menus",res.data.menus)
              setRoutes()
              this.$message.success("登录成功!")
              this.$router.push("/")
            }else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }

};
</script>
<style scoped>
.login-container {
  height: 100vh;
  background-image: linear-gradient(to bottom right,#FC4668,#3F5EFB);
  overflow: hidden;
}

.form {
  margin: 200px auto;
  background-color: #fff;
  width: 600px;
  height: 270px;
  /*padding: 20px;*/
  border-radius: 10px;
}

.left {
  /* width: 330px; */
  float: left;
  height: 270px;
  padding: 0;
}
.right {
  overflow: hidden;
  height: 270px;
  width: 300px;
}
</style>