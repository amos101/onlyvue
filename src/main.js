import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

axios.defaults.baseURL =
  "https://firestore.googleapis.com/v1/projects/vuejs-http-b228a/databases/(default)/documents"

Vue.use(VueAxios, axios)

new Vue({
  router: router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
