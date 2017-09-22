// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  created: function () {
    this.getChartData()
  },
  methods: {
    getChartData: function () {
      this.$http.get('/api/getChartData').then((data) => {
        this.charData = data.body.data
      })
    }
  },
  router,
  template: '<App/>', /* 给Vue实例初始一个App组件作为template 相当于默认组件 */
  components: { App } /* 注册引入的组件App.vue */
})
