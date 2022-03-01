import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    isAuthenticated:false,
    cartCount:0,
    cartItems:null
  },
  mutations: {
    GET_CURRENT_USER(state, user){
      state.user = user
    },
    SET_AUTHENTICATED_TO_TRUE(state){
      state.isAuthenticated == true
    },
    GET_CART_COUNT(state, cartCount){
      state.cartCount = cartCount
    }
  },
  actions: {
    getCurrentUser: ({commit}, user) => commit('GET_CURRENT_USER', user),
    getCartCount: ({commit}, cartCount) => commit('GET_CART_COUNT', cartCount),
    getCartItems ({ commit }) {
      axios.get('carts').then((response) => {
        console.log('cart', response.data.data)
        commit('GET_CART_COUNT', response.data.data[0].items.length)
      });
    },
  },
  modules: {
  },
  getters: {
    getFirstName: state => {
      return state.user
    },
    getCartLength: state => {
      return state.cartCount
    }
  }
})