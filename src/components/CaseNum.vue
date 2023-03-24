<template>
  <div class="case-num">
    <div class="container">
      <div class="title">
        <b style="font-size: 19px;color: #4d79f3">全国(含港澳台)</b>
        <span style="color: #777777; font-size: 16px">{{ caseNumData.modifyTime }}全国数据统计</span>
        <span style="color: #856363; font-size: 12px;margin-left: 10px" class="warm"> 数据仅供参考 </span>
      </div>
    </div>
    <div class="num">
      <el-row class="count">
        <el-col :span="3" class="col" :offset="2">
          <span style="font-size: 10px;color: #444444">新增本地确诊</span><br>
          <strong style="color: #A48256;font-size: 30px;">{{caseNumData.locIncrNum}}</strong>
        </el-col>
        <el-col :span="3" class="col" :offset="1">
          <span style="font-size: 10px;color: #444444">新增确诊</span><br>
          <strong style="color: #C96161;font-size: 30px;">{{ caseNumData.addcon }}</strong>
        </el-col>
        <el-col :span="3" class="col" :offset="1">
          <span style="font-size: 10px;color: #444444">新增境外</span><br>
          <strong style="color: #FFA200;font-size: 30px;">{{ caseNumData.addjwsr }}</strong>
        </el-col>
        <el-col :span="3" class="col" :offset="1">
          <span style="font-size: 10px;color: #444444">现存确诊</span><br>
          <strong style="color: #FF3535;font-size: 30px;">{{ caseNumData.econNum }}</strong>
        </el-col>
        <el-col :span="3" :offset="1" class="col">
          <span style="font-size: 10px;color: #444444">现存重症</span><br>
          <strong style="color: #8A101C;font-size: 30px;">{{ caseNumData.heconNum }}</strong>
        </el-col>
      </el-row>
      <el-row class="count">
        <el-col :span="3" class="col" :offset="3">
          <span style="font-size: 10px;color: #444444">累计确诊</span><br>
          <strong style="color: #B10000;font-size: 30px;">{{caseNumData.gntotal}}</strong><br>
          <span style="font-size: 10px;color: #999999">较昨日 {{caseNumData.addcon_new}}</span>
        </el-col>
        <el-col :span="3" class="col" :offset="1">
          <span style="font-size: 10px;color: #444444">累计治愈</span><br>
          <strong style="color: #13B593;font-size: 30px;">{{ caseNumData.curetotal }}</strong><br>
          <span style="font-size: 10px;color: #999999">较昨日 {{caseNumData.addcure_new}}</span>
        </el-col>
        <el-col :span="3" class="col" :offset="1">
          <span style="font-size: 10px;color: #444444">累计死亡</span><br>
          <strong style="color: #666666;font-size: 30px;">{{ caseNumData.deathtotal }}</strong><br>
          <span style="font-size: 10px;color: #999999">较昨日 {{caseNumData.adddeath_new}}</span>
        </el-col>
        <el-col :span="3" class="col" :offset="1">
          <span style="font-size: 10px;color: #444444">累计境外输入</span><br>
          <strong style="color: #FE6B22;font-size: 30px;">{{ caseNumData.jwsrNum }}</strong>
        </el-col>
        <el-col :span="3" :offset="1" class="col">
          <span style="font-size: 10px;color: #444444">无症状人数</span><br>
          <strong style="color: #B8540E;font-size: 30px;">{{ caseNumData.asymptomNum }}</strong>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
export default {
  
  props:{
    caseNumData:{
      type: Object,
      default: ""
      }
    }
}
</script>

<style scoped>

.case-num{
  padding: 0px 30px 0px;
}

.title::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  border: 0.5em solid transparent;
  border-left-color: red;
}
.warm::before {
  content: 'tips:';
  color: red;
}

.title {
  padding: 12px 0px 12px;
}
.count {
  text-align: center;
  line-height: 30px; /* 垂直居中 */
  padding: 15px 0px 0px;
  /*background-color: red;*/
}
 .col {
   border-top-left-radius: 20px;
   border-top-right-radius: 20px;
   border-bottom-right-radius: 20px;
   border-bottom-left-radius: 20px;
}
 
 .num {
   border:1px solid #ccc;
   padding: 0px 0px 10px;
   border-top-left-radius: 20px;
   border-top-right-radius: 20px;
   border-bottom-right-radius: 20px;
   border-bottom-left-radius: 20px;
   width: 1000px;
   background-color: #fff; /* 给 div 元素设置背景颜色 */
   box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2); /* 设置阴影效果 */
 }

</style>