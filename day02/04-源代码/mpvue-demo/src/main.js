import Vue from 'vue'
import App from './App'

// 生产信息提示
Vue.config.productionTip = false
// 小程序实例的类型，可能的值是 'app', 'page'
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
