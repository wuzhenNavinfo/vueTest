<template>
  <div class="chart-content">
    <h1>{{ msg }}</h1>
    <div id='myChart'>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      msg: 'this is a test Chart'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#myChart {
    width: 400px;
    height: 400px;
    border: solid red 1px;
}
</style>
