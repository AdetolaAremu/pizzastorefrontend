import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    isAuthenticated:false,
    cartCount:0,
    cartItems:null
  },
  plugins: [createPersistedState()],
  mutations: {
    GET_CURRENT_USER(state, user){
      state.user = user
    },
    SET_AUTHENTICATED_TO_TRUE(state){
      state.isAuthenticated = true
    },
    SET_AUTHENTICATED_TO_FALSE(state){
      state.isAuthenticated = false
    },
    GET_CART_COUNT(state, cartCount){
      state.cartCount = cartCount
    }
  },
  actions: {
    getCurrentUser: ({commit}, user) => commit('GET_CURRENT_USER', user),

    getCartCount: ({commit}, cartCount) => commit('GET_CART_COUNT', cartCount),

    changeAuthenticationToTrue: ({ commit }, isAuthenticated) => 
      commit('SET_AUTHENTICATED_TO_TRUE', isAuthenticated === true),
      
    getCartItems ({ commit }) {
      axios.get('carts').then((response) => {
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