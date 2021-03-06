import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'  /* 英文Hello.vue模版，并赋值给变量Hello,这里是“@”相当于“../” */
import LineChart from '@/components/LineChart'
import DayChart from '@/components/DayChart'
import MonthChart from '@/components/MonthChart'

Vue.use(Router)

export default new Router({
  routes: [   /* 进行路由配置，规定“/”引入到Hello组件 */
    {
      path: '/',
      name: 'Hello',
      component: Hello   /* 注册Hello组件 */
    },
    {
      path: '/lineChart',
      name: 'LineChart',
      component: LineChart
    },
    {
      path: '/dayChart',
      name: 'DayChart',
      component: DayChart
    },
    {
      path: '/monthChart',
      name: 'MonthChart',
      component: MonthChart
    }
  ]
})
