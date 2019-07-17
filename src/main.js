// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '../src/store/store';
import VueResource from "vue-resource"
import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.min.css";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.use(iView);

import loading from '../src/components/Loading';
import warning from './components/warning';

Vue.component("kingLoading",loading)
Vue.component("kingWarning",warning)
Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
