<template>
  <div id="app">
    <!-- 头部布局 -->
    <header>
      <img src="./assets/kouzhao.png" alt="" style="width: auto; height: auto; max-width: 60px; position: relative; left: 10px;">
      <span style="margin-left: 25px">校园疫情管理系统</span>
    </header>
    
    <!-- 侧边栏和主体 -->
    <div style="display: flex">
      <!--侧边栏-->
      <div style="width: 200px; min-height: calc(82vh - 4px); overflow: hidden; margin-right: 2px; background-color: white">
        <el-menu :default-active="$route.path" router class="el-menu-demo">
          <el-menu-item index="">
            <i class="el-icon-eleme"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>疫情数据可视化</span>
            </template>
            <el-menu-item index="/ncovdt">国内疫情地区</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-s-order"></i>
            <span>请假信息</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-date"></i>
            <span>疫情通告</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit"></i>
            <span>每日健康填报</span>
          </el-menu-item>
        </el-menu>
      </div>
      <!--主体-->
      <div style="flex: 1; background-color: white">
        <router-view/>
      </div>
      
    </div>
    
    
    
    <footer>
      <p>&copy; 2023 这是底部</p>
    </footer>
    
  </div>
</template>


<script>
export default {
  name: 'App',
  data() {
    return {
      title: '疫情管理系统'
    }
  }
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
}

header {
  display: flex;
  justify-content: normal;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  font-size: 30px;
  margin-bottom: 2px;
  height: 10vh;
}



footer {
  margin-top: 2px;
  background-color: #444;
  color: #fff;
  text-align: center;
  padding: 1rem;
  height: 8vh;
}
</style>