<template>
  <div id="nov" ref="trendChart" ></div>
</template>

<script>

import * as echarts from 'echarts'
import jsonp from "jsonp";

let option = {
  title: {
    text: '全国疫情趋势图',
    link: 'https://news.sina.cn/zt_d/yiqing0121',
  },
  xAxis: {
    type: 'category',
    data: [],
    inverse: true
  },
  legend: {
    data: ['确诊','死亡','治愈'],
    top: "0%",
    right: "10%"
  },
  tooltip: {
    trigger: 'item',
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '确诊',
      data: [],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#ff0000'
      }
    },
    {
      name: '治愈',
      data: [],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#00FF00'
      }
    },
    {
      name: '死亡',
      data: [],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#000000'  
      }
    }
  ]
};

export default {
  name: "NcovTrendChart",
  
  data(){
    return{
      alist: []
    }
  },
  
  methods: {
    getData(){
      jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json', {}, (err, data) => {
        if (!err) {
          this.alist = data.data.historylist;
          option.xAxis.data = this.alist.map(item => item.date);
          option.series[0].data = this.alist.map(item => item.cn_conNum);
          option.series[1].data = this.alist.map(item => item.cn_cureNum);
          option.series[2].data = this.alist.map(item => item.cn_deathNum);
          this.mycharts.setOption(option)
        }
      })
    }
  },
  mounted() {
    this.getData();
    this.mycharts = echarts.init(this.$refs.trendChart)
    this.mycharts.setOption(option)
    
  }


}
</script>

<style scoped>
#nov {
  width: 90%;
  height: 59vh;
  border:1px solid #ccc;
  padding: 0px 0px 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #fff; /* 给 div 元素设置背景颜色 */
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2); /* 设置阴影效果 */
}
</style>