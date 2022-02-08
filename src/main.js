import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'

import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports)

import {BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import i18n from '@/i18n.js'
import "vue-lazy-youtube-video/dist/style.simplified.css";

Vue.use(VueCookies)

Vue.use(AmplifyPlugin, AmplifyModules);

axios.defaults.withCredentials = true;

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(BootstrapVueIcons)
Vue.use(BootstrapVue)
Vue.prototype.$log = console.log.bind(console)


new Vue({
  el: '#app',
  router,
  store,
  icons,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})
