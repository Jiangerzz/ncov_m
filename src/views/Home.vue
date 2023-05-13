<template>
<div class="home">
  <el-row  :gutter="20">
    <el-col :span="10" style="margin-left: 80px" offset="2">
      
      <el-card style="height: 140px;position: relative;text-align: center">
        <i class="el-icon-chat-round"></i>
        <span style="color: #606266;font-size: 20px">   欢迎{{ this.user.roleId == '1' ? '管理员':'用户' }} {{user.name}}</span>
        <div style="margin-top: 20px"><el-avatar :style="`background:${extractColorByName(user.name)}`" :shape="'circle'" :size="60">{{user.name}}</el-avatar> </div>
      </el-card>
    </el-col>
   
    <el-col :span="10" offset="2" style="margin-left: 10px">
        <el-card style="height: 140px">
          <TimePick/>
        </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in imgList" :key="item.name">
        <img :src="item.src" style="height:200px;width:500px; align-content: center" />
      </el-carousel-item>
    </el-carousel>
  </el-row>
  <el-row :gutter="20">
    <el-card style="text-align: center; height: 190px; margin-top: 5px;padding-bottom: 0">
      <span style="font-size: 29px; text-align: center" >温馨提示<br></span>
      <br>
      <span style="font-size: 14px;color: #909399;text-align: center;">在使用中若遇到问题，请联系管理员</span>
      <p style="color: #909399">你可以通过以下方式联系我：</p>
      <div style="align-content: center">
        <el-link><a :href="`mailto:${email}`"><i class="el-icon-message" style="font-size: 20px;padding-top: inherit"></i></a></el-link>
        <el-link type="primary" :href="githubUrl" class="iconfont el-icon-aligithub-fill" style="margin-left: 10px" target="_blank"></el-link>
      </div>
    </el-card>
  </el-row>
</div>
</template>

<script>

import NcovMap from "../components/ECharts_ncovmap"
import TimePick from "@/components/FlipClock";

export default {
  name: "Home",
  components: {
    NcovMap,
    TimePick
  },
  data(){
    return{
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      email: '1347477532@qq.com',
      githubUrl: 'https://github.com/Jiangerzz',
      imgList: [
        {
          name: "1",
          src: require("@/assets/1.jpg")
        },
        {
          name: "2",
          src: require("@/assets/2.jpg")
        },
        {
          name: "3",
          src: require("@/assets/3.jpg")
        },
        {
          name: "4",
          src: require("@/assets/4.jpg")
        },
        {
          name: "5",
          src: require("@/assets/5.jpg")
        },
      ]
    }
  },
  methods: {
    extractColorByName(name) {
      var temp = [];
      temp.push("#");
      for (let index = 0; index < name.length; index++) {
        temp.push(parseInt(name[index].charCodeAt(0), 10).toString(16));
      }
      return temp.slice(0, 5).join('').slice(0, 4);
    },
  }
}
</script>

<style scoped>
.home {
  position: relative;
  height: auto;
}
.el-card {
  margin-bottom: 20px; /*模块之前有间隔*/
}
.image {
  width: 100%;
  display: block;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

</style>