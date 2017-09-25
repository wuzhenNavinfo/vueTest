<template>
  <div class="chart-content">
    <h1 style='text-align:center'>{{ msg }}</h1>
    <!-- {{roadData}} -->
    <div id='myBarPoiChart'>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/dark');

export default {
  name: 'test',
  props: ['roadData'],
  data () {
    return {
      msg: 'this is a bar Chart',
      chart: null,
      // seriesData: [27.0, 4.9, 70.0, 23.2, 25.5, 76.7, 135.6, 162.2, 32.6, 20.0, 65.4, 30.3],
      // xAxis: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    }
  },
  methods: {
    // 获取背景柱状图数组
    shadowMax(seriesData) {
      var max = 0;
      var maxArr = [];
      for (let i = 0; i < seriesData.length; i++) {
        if (max < seriesData[i]) {
          max = seriesData[i]
        }
      }
      max = Math.ceil(max) + 10;
      seriesData.forEach(function (item, index, arr) {
        maxArr[index] = max;
      });
      return maxArr;
    },
    // 绘制表格
    drawGraph() {
        let seriesDataTemp = this.roadData.seriesData
        let xAxis = this.roadData.xAxis
        if (!this.chart) {
            this.chart = echarts.init(document.getElementById('myBarPoiChart'), 'dark')
        }
        let dataShadow = this.shadowMax(seriesDataTemp);
        this.chart.showLoading()
        this.chart.setOption({
            grid: {
              left: 20,
              right: 20,
              top: 0,
              bottom:30
            },
            xAxis: {
                data: xAxis,
                boundaryGap: false, // 坐标轴两边不留空白
                axisLine: {
                  show:false
                },
                axisTick: {
                  show: false
                }
            },
            yAxis: {
                show: false
            },
            calculable: true,
            series: [{    // For shadow
                 type: 'bar',
                 itemStyle: {
                     normal: {
                        color: 'rgba(255,255,255,0.15)',
                        barBorderRadius:[5, 5, 0, 0]
                     }
                 },
                 barGap:'-100%', // 两个柱子重叠
                 barCategoryGap:'80%', // 柱子之间的间距
                 data: dataShadow,
                 animation: false
             },{
                // name: '蒸发量',
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient( // 0,0,0,1表示从上到下渐变 0,0,1,0// 从左到右渐变
                        0, 0, 0, 1,
                        [
                          {offset: 0.9, color: '#188df0'},
                          {offset: 0, color: '#83baf3'}
                        ]
                    ),
                    barBorderRadius:[5, 5, 0, 0]
                  }
                },
                data: seriesDataTemp
            }]
        })
        this.chart.hideLoading()
    }
  },
  updated() {
  },
  watch: {
    roadData: function () {
          this.$nextTick(function() {
              this.drawGraph()
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart-content{
    float: left;
    background-color: #000;
    color: #FFF;
    width: 500px;
    display: inline-block;
}
#myBarPoiChart {
    width: 500px;
    height: 300px;
}
</style>
