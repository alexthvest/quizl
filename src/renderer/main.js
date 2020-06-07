import Vue from 'vue'

const { ipcRenderer } = window.require('electron')

import router from './plugins/router'
import vuetify from './plugins/vuetify'

import App from './App'

import 'vuetify/dist/vuetify.min.css'
import './main.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.$ipc = ipcRenderer

new Vue({
  render: h => h(App),
  router, vuetify
})
  .$mount('#app')
