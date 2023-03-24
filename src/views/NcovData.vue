<template>
  <div class="Ncovdata">
    <el-row>
      <el-col :span="24" :offset="2">
        <CaseNum :case-num-data="caseNumData"/>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="10" :offset="2">
          <NcovMap/>
        </el-col>
      <el-col :span="10">
        <NcovTrendChart/>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import jsonp from 'jsonp'
import CaseNum from "../components/CaseNum"
import NcovMap from "../components/ECharts_ncovmap"
import NcovTrendChart from "@/components/NcovTrendChart";

export default {
  name: "NcovData",
  data(){
    return{
      caseNumData:{
        modifyTime: "",
        curetotal: "", //累计治愈
        gntotal: "", //累计确诊
        deathtotal: "", //累计死亡
        econNum: "", //现存确诊
        heconNum: "", //现存重症
        jwsrNum: "", //境外输入
        asymptomNum: "",//无症状人数
        addcon: "", //新增确诊
        addjwsr: "",//新增境外
        locIncrNum: "", //本土新增
        addcon_new: "",
        addcure_new: "",
        adddeath_new: ""
      },
      trendData: []
    }
  },
  
  components: {
    NcovTrendChart,
    CaseNum,
    NcovMap
  },

  methods: {
    getData () {
      jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json', {}, (err, data) => {
        if (!err) {
          console.log(data)
          this.caseNumData.modifyTime = data.data.times
          this.caseNumData.locIncrNum = "\u5f85\u516c\u5e03"
          this.caseNumData.curetotal = data.data.curetotal
          this.caseNumData.gntotal = data.data.gntotal
          this.caseNumData.deathtotal = data.data.deathtotal
          this.caseNumData.econNum = data.data.econNum
          this.caseNumData.heconNum = data.data.heconNum
          this.caseNumData.jwsrNum = data.data.jwsrNum
          this.caseNumData.asymptomNum = data.data.asymptomNum
          this.caseNumData.addcon = "\u5f85\u516c\u5e03"
          this.caseNumData.addjwsr = "\u5f85\u516c\u5e03"
          this.caseNumData.addcon_new = data.data.add_daily.addcon_new
          this.caseNumData.addcure_new = data.data.add_daily.addcure_new
          this.caseNumData.adddeath_new = data.data.add_daily.adddeath_new
          // this.trendData = data.data.historylist;
          // console.log(this.trendData)
        }
      })
    }
  },
  
  mounted() {
    this.getData()
  }
}
</script>

<style >
.el-row {
  margin-bottom: 20px;
}
</style>

