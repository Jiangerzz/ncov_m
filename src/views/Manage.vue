<template>
  <el-container style="min-height: 100vh">
    <el-aside :width="sideWidth+'px'" style="background-color: rgb(238,241,246); box-shadow: 2px 0 6px rgb(0 21 41 / 35%)">
      <Aside :is-collapse="isCollapse" :logo-text-show="logoTextShow"/>
    </el-aside>
    <el-container>
      
      <el-header style="border-bottom: 1px solid #ccc; line-height: 60px;" >
        <Header :collapse-btn-class="collapseBtnClass" :collapse="collapse"/>
      </el-header>

      <el-main>
        
        
        <router-view/>
        
      </el-main>
      
    </el-container>
    
  </el-container>
</template>

<script>

import Aside from "@/components/Aside";
import NcovData from "@/views/NcovData";
import Header from "@/components/Header";
import request from "@/utils/request";

export default {
  name: "Manage",
  data() {
    return {
      title: '疫情管理系统',
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
    }
  },
  components: {
    Header,
    Aside,
    NcovData
},
  methods: {
    collapse(){
      this.isCollapse = !this.isCollapse
      if(this.isCollapse){ //收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      }else { //展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    },
  },
}
</script>

<style scoped>






</style>