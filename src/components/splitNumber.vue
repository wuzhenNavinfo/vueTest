<template>
  <div class='price-div'>
    <div v-for="item in valArr">
      <div v-if="item == ','" class='sign'>{{item}}</div>
      <div v-else class='number'>{{item}}</div>
    </div>
    {{valArr}}
  </div>
</template>

<script>

export default {
  name: 'SplitNumber',
  props: ['numValue'],
  data () {
    return {
      valArr:[]
    }
  },
  methods: {
    add: function (event) {
      this.numValue++;
    }
  },
  mounted() {
     this.$nextTick(function() {
       let str = parseInt(this.numValue).toLocaleString();
       this.valArr = str.split('');
       console.info(this.valArr);
     })
  },
  watch: {
    numValue:{
      handler(curVal,oldVal){
        this.$nextTick(function() {
          let str = parseInt(curVal).toLocaleString();
          this.valArr = str.split('');
          console.info(this.valArr);
        })
  　　 }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.price-div {
  border: solid red 1px;
  font: 12px tahoma, Arial, Verdana, sans-serif;
  display:inline-flex;
  color:yellow;
  text-align:center;
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
  margin-right: 1px;
  height: 48px;
  background: dimgrey;
}
</style>
