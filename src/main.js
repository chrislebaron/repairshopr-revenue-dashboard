import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCurrencyFilter from 'vue-currency-filter'
import VueGoogleCharts from 'vue-google-charts'


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueCurrencyFilter,
    {
      symbol : '$',
      thousandsSeparator: ',',
      fractionCount: 2,
      fractionSeparator: '.',
      symbolPosition: 'front',
      symbolSpacing: false
    })
Vue.use(VueGoogleCharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
