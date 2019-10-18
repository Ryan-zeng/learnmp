import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$toast = function (msg) {
  wx.showToast({
    title: msg, // 提示的内容,
    icon: 'none', // 图标,
    duration: 2000, // 延迟时间,
    mask: false
  })
}

const app = new Vue(App)
app.$mount()
