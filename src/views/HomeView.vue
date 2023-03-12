<template>
  <div id="echarts_box" style="width: 600px;height:400px;"></div>
</template>


<script>

import * as echarts from 'echarts'

export default {
  name: 'HomeView',

  created() {},
  // DOM 渲染完成触发
  mounted() {
    // 1. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echarts_box'))
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  }
}
</script>
