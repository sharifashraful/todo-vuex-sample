import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import tasks from "./modules/todolistModule";
import auth from './modules/authModule'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tasks,
    auth
  },
  plugins: [createPersistedState()]
});
