import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './plugins/element.js'; // elementUI
import echarts from 'echarts';

import './assets/css/globalBase.css'; // 自定义页面基础样式
import './assets/css/normalize.css'; // 页面基础样式
import './assets/icon/iconfont.css'; // 字体图标库
import 'ol/ol.css'; // openlayers 样式

Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
