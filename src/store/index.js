import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    isAuthenticated:false
  },
  mutations: {
    GET_CURRENT_USER(state, user){
      state.user = user
    },
    SET_AUTHENTICATED_TO_TRUE(state){
      state.isAuthenticated == true
    }
  },
  actions: {
    getCurrentUser: ({commit}, user) => commit('GET_CURRENT_USER', user)
  },
  modules: {
  },
  getters: {
    getFirstName: state => {
      return state.user
    }
  }
})