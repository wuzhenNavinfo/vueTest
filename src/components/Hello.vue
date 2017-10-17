<template>
  <div class="hello">

    <h1>{{ msg }}</h1>
    {{numValue | splitSymbol}}
    <input v-model.number="number" type="number" step="20">
    <p>{{ animatedNumber }}</p>
    <button v-on:click="showData">
      Toggle
    </button>
    <transition name="fade" v-on:before-enter="beforeEnter">
      <p v-if="show">{{numValue}}</p>
      <p v-if="!show">{{numValue}}</p>
    </transition>
    <div style='border:solid red 1px;'>
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
      <transition-group name="list" tag="p">
        <span v-for="item in items" v-bind:key="item" class="list-item">
          {{ item }}
        </span>
      </transition-group>
    </div>
    <button v-on:click='addNumber'>addNumber</button>
    <split-number :numValue='numValue'></split-number>
    <div style=''>
      <roll :numVal='numVal'></roll>
      <bar-poi-chart :roadData='charData.road'></bar-poi-chart>
      <bar-road-chart :roadData='charData.road'></bar-road-chart>
    </div>
  </div>
</template>

<script>
import BarRoadChart from '@/components/BarRoadChart'
import BarPoiChart from '@/components/BarPoiChart'
import Roll from '@/components/Roll'
import SplitNumber from '@/components/SplitNumber'

var TWEEN = require('@tweenjs/tween.js');

export default {
  name: 'hello',
  data () {
    return {
      numValue:2000.123,
      numVal:3,
      show:true,
      items: [1,2,3,4,5,6,7,8,9],
      nextNum: 10,
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
  filters: {
    splitSymbol: function (value){ // 将数字三位隔开
      // console.info(value, parseFloat(value).toLocaleString());
      let temp = parseFloat(value).toLocaleString();
      return temp;
    }
  },
  watch: {
    number: function(newValue, oldValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
          let temp = this.tweeningNumber.toFixed(0);
          if (temp != vm.animatedNumber) {
            vm.animatedNumber = temp;
          }
        })
        .start()
      animate()
    }
  },
  components: {
    BarRoadChart,
    BarPoiChart,
    Roll,
    SplitNumber
  },
  methods:{
    beforeEnter: function (el) {
       alert(el);
    },
    showData: function () {
      this.show = !this.show;
      console.info(this.numValue);
      this.numValue = this.numValue + 1;
    },
    addNumber: function (event) {
      this.numValue++;
    },
    getData: function () {
      var that = this;
      var index = 24689135;
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
          that.msg = index;
        })
      },2000);
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      // this.items.splice(this.randomIndex(), 0, this.nextNum++)
      this.items[2] = this.items[2] + 2;
    },
    remove: function () {
      let t = this.randomIndex();
      this.items.splice(t, 1)
      let that = this;
      setTimeout(function () {
        that.items.splice(t, 0,that.nextNum++)
      })
    }
  },
  created () {
    // this.getData()
    let that = this;
    let index = 20;
    setInterval(function () {
      index = index + 10;
      that.msg = index;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active{
  transition: all .0s;
}
.list-leave-active {
  transition: all 0.0s;
}
.list-enter {
  opacity: 0.8;
  transform: translateY(20px);
}
.list-leave-to {
  opacity: 0.8;
  transform: translateY(-20px);
}
</style>
