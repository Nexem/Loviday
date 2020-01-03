import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Welcome from './components/Welcome.vue'
import Research from './components/Research.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/Login',
      component: Login,
      name: 'Login'
    },
    {
      path: '/Welcome',
      component: Welcome,
      name: 'Welcome'
    },
    {
      path: '/Research',
      component: Research,
      name: 'Research'
    }
  ]
})
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
