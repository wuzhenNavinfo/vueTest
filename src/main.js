// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>', /* 给Vue实例初始一个App组件作为template 相当于默认组件 */
  components: { App } /* 注册引入的组件App.vue */
})
