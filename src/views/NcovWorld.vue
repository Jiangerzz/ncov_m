<template>
  
  <div class="page">
    <div class="button" style="margin-left: 500px; margin-top: 2px;margin-bottom: 1px">
      <el-button type="primary" @click="show(1)" >地图</el-button>
      <el-button type="primary" @click="show(2)" >数据</el-button>
    </div>
  <div class="one" v-show="index===1 && isShow">
    <el-row class="map">
      <el-col>
        <div id="chart" style="height:550px;"></div>
      </el-col>
    </el-row>
  </div>
    <div class="two" v-show="index===2 && isShow">
      <el-row>
        <el-col :span="20" :offset="2">
          <el-table :data="tableData" style="width: 100%" 
                    height="550"
                    border>
            <el-table-column prop="country" label="国家"></el-table-column>
            <el-table-column prop="confirmed" label="确诊人数"></el-table-column>
            <el-table-column prop="dead" label="死亡人数"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import * as echarts from 'echarts'


export default {
  name: "NcovWorld",
  data() {
    return {
      tableData: [],
      // 控制切换按钮后按钮改变样式
      index: 1,
      // 控制点击按钮后子组件显示，再次点击隐藏
      isShow: true
    }
  },
  methods: {

    show (value) {
      this.index === value ? this.isShow = !this.isShow : this.isShow = true
      this.index = value
    },
    
    async fetchData() {
      const response = await fetch('https://api.covid19api.com/summary')
      const data = await response.json()
      // console.log(data)
      const seriesData = []
      for (const country of data.Countries) {
        seriesData.push({
          name: country.Country,
          value: country.TotalConfirmed,
        })
        this.tableData.push({
          country: country.Country,
          confirmed: country.TotalConfirmed,
          dead: country.TotalDeaths,
        })
      }
      this.drawChart(seriesData)
    },
    drawChart(data) {
      const chart = echarts.init(document.getElementById('chart'))
      const option = {
        title: {
          text: '世界疫情数据可视化',
        },
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          min: 0,
          max: 1000000,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true,
        },
        series: [
          {
            name: '确诊人数',
            type: 'map',
            map: 'world',
            roam: true,
            label: {
              show: true,
            },
            data: data,
          },
        ],
      }
      chart.setOption(option)
    },
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
.map {
  border:1px solid #ccc;
  padding: 0px 0px 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #fff; /* 给 div 元素设置背景颜色 */
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2); /* 设置阴影效果 */
}


.el-button{
  font-size:20px;
}

</style>