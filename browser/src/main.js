import Vuelidate from 'vuelidate';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes';
import Vuetify from 'vuetify'
import axios from 'axios';
import localForage from 'localforage';
import LFM from "./utils/LocalForageManager";
import store from "./store";
import OpenService from './services/openService';

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(Vuetify, {
  theme: {
    primary: '#173753',
    secondary: '#6DAEDB',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
});
Vue.use(Vuelidate);


/**
 * Configuração e inicialização do LocalForage (armazenamento local).
 */
localForage.config({
  name: 'BaseToAll'
});

/**
 * @author Bernardo Schveitzer
 * Seta o endereço padrão do servidor para as requisições.
 * @type {string}
 */
// axios.defaults.baseURL = 'http://192.168.0.198:1337';
axios.defaults.baseURL = 'http://179.97.106.7:8080';

/**
 * @author Bernardo Schveitzer
 *
 * Configurações do roteador.
 *
 * onError: caso ocorra algum erro na
 * transição de uma página para outra, o usuário é redirecionado
 * para a tela de login e deslogado.
 *
 * beforeEach: com excessão do login, será verificado se o usuário
 * tem autorização para entrar na rota.
 *
 * @type {VueRouter}
 */
const router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkActiveClass: "active-page",
  linkExactActiveClass: "current-page"
});

router.beforeEach(async (to,from, next) => {
  return next(true);
});

/**
 * Inicialização do Vue passando o que deve ser injetado.
 * (router: VueRouter, store: VueX)
 */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#container');
