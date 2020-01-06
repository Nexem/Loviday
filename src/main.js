import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Welcome from './components/Welcome.vue'
import Research from './components/Research.vue'
import Lists from './components/Lists.vue'
import Favorites from './components/Favorites.vue'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

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
    },
    {
      path: '/Lists',
      component: Lists,
      name: 'Lists'
    },
    {
      path: '/Favorites',
      component: Favorites,
      name: 'Favorites'
    }
  ]
})

const store = new Vuex.Store({
  state: {
    user: {
      firstname: null,
      lastname: null,
      email: null,
      pwd: null
    },
    productList: {
      nameProduct: ['item1', 'item2']
    },
    favsList: {
      nameProduct: []
    }
  },

  mutations: {
    authenticate (state, [email, pwd]) {
      state.user.email = email
      state.user.pwd = pwd
      router.push('Welcome')
    },
    connect (state, { email, pwd }) {
      state.user.email = email
      state.user.pwd = pwd
    },
    disconnect (state) {
      state.user.email = null
      state.user.pwd = null
      router.push('Welcome')
    },
    register (state, { firstname, lastname, email, pwd }) {
      state.user.firstname = firstname
      state.user.lastname = lastname
      state.user.email = email
      state.user.pwd = pwd
    },
    addProductToList (state, nameProduct) {
      state.productList.nameProduct.push(nameProduct)
    },
    addFavsList (state, nameProduct) {
      state.favsList.nameProduct.push(nameProduct)
    }
  },
  getters: {
    // User getters
    getEmail: state => {
      return state.user.email
    },
    // Unused
    getPwd: state => {
      return state.user.pwd
    },
    getProducts: state => {
      return state.productList.nameProduct
    },
    getFavs: state => {
      return state.favsList.nameProduct
    }
  }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
