<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model.number="number" type="number" step="20">
    <p>{{ animatedNumber }}</p>
    <bar-poi-chart :roadData='charData.road'></bar-poi-chart>
    <bar-road-chart :roadData='charData.road'></bar-road-chart>
  </div>
</template>

<script>
import BarRoadChart from '@/components/BarRoadChart'
import BarPoiChart from '@/components/BarPoiChart'

var TWEEN = require('@tweenjs/tween.js');

export default {
  name: 'hello',
  data () {
    return {
      number: 0,
      animatedNumber: 0,
      msg: {},
      charData: {
        road: {
            seriesData:[],
            xAxis:[]
        }
      }
    }
  },
  watch: {
    number: function(newValue, oldValue) {
      var vm = this
      console.info('vm', vm);
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
          vm.animatedNumber = this.tweeningNumber.toFixed(0)
        })
        .start()
      animate()
    }
  },
  components: {
    BarRoadChart,
    BarPoiChart
  },
  methods:{
    getData: function () {
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
          // that.msg = index;
        })
      },2000);
    }
  },
  created () {
    // this.getData()
    let that = this;
    let index = 0;
    setInterval(function () {
      index = index + 10;
      that.msg = index;
      console.info(that.msg);
      that.number = index;
    },3000);
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
