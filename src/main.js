import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from '@/request'
import antd from 'ant-design-vue'

Vue.config.productionTip = false
// import {
//   Button,
//   message,
//   Modal,
//   Input,
//   Col,
//   Row,
//   Layout,
//   Icon,
//   Divider,
//   Collapse,
//   Popconfirm,
//   Radio,
//   Result,
//   Tooltip
// } from 'ant-design-vue';
Vue.prototype.$http = axios;
Vue.use(antd)

// Vue.use(Icon)
// Vue.use(Button)
// Vue.use(Modal)
// Vue.use(Input)
// Vue.use(Divider)
// Vue.use(Col)
// Vue.use(Row)
// Vue.use(Layout)
// Vue.use(Collapse)
Vue.use(VueRouter)
// Vue.use(Tooltip)
// Vue.use(Popconfirm)
// Vue.use(Radio)
// Vue.use(Result)
const routes = [
  {path: '/', component: () => import('./components/Index'), name: 'index'},
  {path: '/created', component: () => import('./components/Created'), name: "created"},
  {path: '/scan', component: () => import('./components/ScanCode'), name: "scan"},
  {path: '/:id', component: () => import('./components/Paste'), name: 'paste'},
  {path: '/transfer/:id', component: () => import('./components/Transfer'), name: 'transfer'},

  {path: '*', component: () => import('./components/Index')}
]
const router = new VueRouter({
  mode: 'history',

  routes
})
new Vue({
  render: h => h(App), router
}).$mount('#app')
