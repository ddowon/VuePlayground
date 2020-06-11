import 'babel-polyfill'
import 'es6-promise/auto'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueYoutube from 'vue-youtube'

import '@/styles/ui.css'
import '@/styles/ui2020.css'

Vue.config.productionTip = false

Vue.use(VueYoutube)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
