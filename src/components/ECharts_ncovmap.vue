<template>
    <div id="nov" ref="echarts_box" ></div>
</template>

<script>

import * as echarts from 'echarts'
import jsonp from 'jsonp'

const option = {
  title: {
    text: "中国疫情地图",
    link: 'https://www.baidu.com',
    subtext: "Jiang",
    sublink: "https://jiangerzz-github-io.pages.dev/"
  },
  series: [{
    name: '确诊人数',
    type: 'map',
    map: 'china',
    label: {
      show: true,
      color: '#ffffff',
      fontSize: 8
    },
    itemStyle: {
      areaColor: '#eee'
    },
    roam: true,
    zoom: 1.2,
    emphasis: {
      label: {
        color: '#fff',
        fontSize: 12,
      },
      itemStyle: {
        areaColor: '#83b5e7'
      }
    },
    data: []
  }],
  visualMap: [{
    type: 'piecewise',
    show: true,
    pieces: [
      { min: 10000 },
      { min: 1000, max: 9999 },
      { min: 100, max: 999},
      { min: 10, max: 99 },
      { min: 1, max: 9 }
    ],

    inRange: {
      symbol: 'rect',
      color: [
        '#ffc0b1',
        '#9c0505',
      ]
    },
    itemWidth: 20
  }],
  tooltip: {
    trigger: 'item'
  }
}

export default {
  name: "ECharts_ncovmap",
  methods: {
    getData () {
      jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json', {}, (err, data) => {
        if (!err) {
          // console.log(data)
          let list = data.data.list.map(item => (

              {
                name: item.name,
                value: item.value,
                // susNum: item.susNum
              }))
          option.series[0].data = list
          this.mycharts.setOption(option)
        }
      })
    }
  },
  mounted() {
    this.getData()
    this.mycharts = echarts.init(this.$refs.echarts_box)
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

