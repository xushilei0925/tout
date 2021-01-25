import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入样式表文件
import '@/styles/index.css'
// 移动端REM
import 'amfe-flexible'

// 导入vant 库
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
