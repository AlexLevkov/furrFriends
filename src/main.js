import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/style.scss'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'apiKey',
    libraries: 'places',
  },
})

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
