import Vue from 'vue';
import VueMorph from 'vue-morph';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueMorph);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
