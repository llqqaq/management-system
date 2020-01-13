import Vue from 'vue'
import App from './App.vue'

/* 导入饿了么Ui */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* 全局样式 */
import './assets/base.css'

Vue.config.productionTip = false

/* 导入路由 */
import router from './router/router'

/* 全局注册面包屑 */
import breadcrumb from './components/breadcrumb.vue'
Vue.component('breadcrumb',breadcrumb)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
