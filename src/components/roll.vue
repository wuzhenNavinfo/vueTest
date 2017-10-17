<template>
  <div class="container">
      <div class="flip">
          <div class="price-icon">￥</div>
          <div class="price-div">
              <div class="h-k number">
                <div class='numbers-view'>
                  <div v-for="(item, index) in data.numbers" :class='item'>{{index}}</div>
                </div>
              </div>
              <div class="t-k number">
                <div class='numbers-view'>
                  <div v-for="(item, index) in data.numbers" :class='item'>{{index}}</div>
                </div>
              </div>
              <div class="k number">
                <div class='numbers-view'>
                  <div v-for="(item, index) in data.numbers" :class='item'>{{index}}</div>
                </div>
              </div>
              <div class="comma sign">,</div>
              <div class="h number">
                <div class='numbers-view'>
                  <div v-for="(item, index) in data.numbers" :class='item'>{{index}}</div>
                </div>
              </div>
              <div class="t number">
                <div class='numbers-view'>
                  <div v-for="(item, index) in data.numbers" :class='item'>{{index}}</div>
                </div>
              </div>
              <div class="single number">
                <div class='numbers-view'>
                  <div v-for="(item, index) in data.numbers" :class='item'>{{index}}</div>
                </div>
              </div>
              <div class="sign dot">.</div>
              <div class="t-d number">
                <div class='numbers-view'>
                  <div v-for="(item, index) in data.numbers" :class='item'>{{index}}</div>
                </div>
              </div>
              <div class="h-d number">
                <div class='numbers-view'>
                  <div v-for="(item, index) in data.numbers" :class='item'>{{index}}</div>
                </div>
              </div>
          </div>
      </div>
      <button class="animate-btn" v-on:click='start'>模拟滚动</button>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'test',
  props: ['numVal'],
  data () {
    return {
      value:0,
      data:{
         numbers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
         zero: {
             hk: 0,
             tk: 0,
             k: 0,
             h: 0,
             t: 0,
             single: 0,
             td: 0,
             hd: 0
         },
         numbersTmp: "<div class='zero'>0</div><div class='one'>1</div><div class='two'>2</div><div class='three'>3</div><div class='four'>4</div><div class='five'>5</div><div class='six'>6</div><div class='seven'>7</div><div class='eight'>8</div><div class='nine'>9</div>"
     }
    }
  },
  methods: {
    mul: function(arg1, arg2) {
      let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
      try {
          m += s1.split(".")[1].length;
      }
      catch (e) {
      }
      try {
          m += s2.split(".")[1].length;
      }
      catch (e) {
      }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    div: function (arg1, arg2) {
      let t1 = 0, t2 = 0, r1, r2;
      try {
          t1 = arg1.toString().split(".")[1].length;
      }
      catch (e) {
      }
      try {
          t2 = arg2.toString().split(".")[1].length;
      }
      catch (e) {
      }
      r1 = Number(arg1.toString().replace(".", ""));
      r2 = Number(arg2.toString().replace(".", ""));
      return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    add: function (arg1, arg2) {
      let r1, r2, m;
      try {
          r1 = arg1.toString().split(".")[1].length;
      }
      catch (e) {
          r1 = 0;
      }
      try {
          r2 = arg2.toString().split(".")[1].length;
      }
      catch (e) {
          r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (arg1.mul(m) + arg2.mul(m)).div(m);
    },
    sub: function (arg1, arg2) {
      let r1, r2, m, n;
      try {
          r1 = arg1.toString().split(".")[1].length;
      }
      catch (e) {
          r1 = 0;
      }
      try {
          r2 = arg2.toString().split(".")[1].length;
      }
      catch (e) {
          r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      //动态控制精度长度
      n = (r1 >= r2) ? r1 : r2;
      return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
    },
    priceToObj: function (price) {
      if(price == 0) {
          return this.data.zero;
      }
      let obj = {};
      obj.hd = parseInt((this.mul(100, price)) % 10);
      obj.td = parseInt((this.mul(10, price)) % 10);
      obj.single = parseInt(price % 10);
      obj.t = parseInt((this.div(10, price)) % 10);
      obj.h = parseInt((this.div(100, price)) % 10);
      obj.k = parseInt((this.div(1000, price)) % 10);
      obj.tk = parseInt((this.div(10000, price)) % 10);
      obj.hk = parseInt((this.div(100000, price)) % 10);
      return obj;
    },
    scrollToNumber: function(num, pos, handler){
        let $this = handler; // $(this);
        let target = this.data.numbers[num];

        $this.find(".numbers-view").stop(true, true);

        let top = num * $this.find(".zero").height();
        let currentTop = -parseFloat($this.find(".numbers-view").css("marginTop").split("px")[0]);

        if(top == currentTop) {
            return;
        } else if(currentTop < top) {
            $this.find(".numbers-view").animate({marginTop: -top}, 1500, "swing");
        } else {
            $this.find(".numbers-view").append($(this.data.numbersTmp).addClass("temp"));
            top = $this.find("." + target + ".temp").offset().top - $this.find(".numbers-view").offset().top;

            $this.find(".numbers-view").animate({marginTop: -top}, 1500, "swing", function(){
                if($this.find(".zero").size && $this.find(".zero").size() > 1) {
                    let top = $this.find("." + target + ":not(.temp)").first().offset().top - $this.find(".numbers-view").offset().top;
                    $this.find(".numbers-view").css({marginTop: -top});
                    $this.find(".numbers-view .temp").remove();
                }
            });
        }
    },
    start: function (event) {
      let number = this.numVal;
      // let number = parseFloat((Math.random() * 1000).toFixed(2));
      let obj = this.priceToObj(number);
      let that = this;
      this.data.targetClass = {
          "hk": $(".h-k"),
          "tk": $(".t-k"),
          "k": $(".k"),
          "h": $(".h"),
          "t": $(".t"),
          "single": $(".single"),
          "td": $(".t-d"),
          "hd": $(".h-d")
      }
      $.each(obj, function(key, value){
          that.scrollToNumber(value, key, that.data.targetClass[key]);
      });
    },
  },
  mounted() {
     this.$nextTick(function() {

     })
  },
  watch: {
    numVal:{
      handler(curVal,oldVal){
        this.$nextTick(function() {
          // this.start()
        })
  　　 }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
      background: black;
      min-width: 600px;
  }

  .flip {
      margin: 0 auto;
      width: 500px;
      height: 100px;
      color: yellow;
      padding-top: 40px;
  }

  .price-div {
      font: 12px tahoma, Arial, Verdana, sans-serif;
  }

  .price-div > div,
  .total-price > div {
      float: left;
      text-align: center;
  }

  .price-icon {
      background: dimgrey;
      width: 25px;
      height: 30px;
      line-height: 30px;
      font-size: 26px;
      font-weight: bold;
      float: left;
      margin-right: 2px;
  }

  .price-div .number {
      background: dimgrey;
      width: 32px;
      height: 48px;
      line-height: 48px;
      font-size: 43px;
      font-weight: bold;
      overflow: hidden;
      margin-right: 1px;
  }

  .price-div .sign {
      font-size: 40px;
      font-weight: bold;
      line-height: 68px;
      height: 48px;
  }
</style>
