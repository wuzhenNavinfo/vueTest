<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <bar-poi-chart :roadData='charData.road'></bar-poi-chart>
    <bar-road-chart :roadData='charData.road'></bar-road-chart>
  </div>
</template>

<script>
import BarRoadChart from '@/components/BarRoadChart'
import BarPoiChart from '@/components/BarPoiChart'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      charData: {
        road: {
            seriesData:[],
            xAxis:[]
        }
      }
    }
  },
  components: {
    BarRoadChart,
    BarPoiChart
  },
  created () {
    var that = this;
    var index = 0;
    setInterval(function () {
        that.$http.get('/api/getChartData').then((data) => {
            var t = data.body.data.road.seriesData[0];
            if (index > 120) {
                index = 0;
            }
            index = index + 20
            data.body.data.road.seriesData[0] = data.body.data.road.seriesData[0] + index;
            data.body.data.road.seriesData[4] = data.body.data.road.seriesData[4] + index;
            data.body.data.road.seriesData[9] = data.body.data.road.seriesData[9] + index;
            that.charData = data.body.data
        })
    },1000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
