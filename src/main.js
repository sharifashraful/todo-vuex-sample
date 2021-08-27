import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Vuex from 'vuex'
import { router } from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
