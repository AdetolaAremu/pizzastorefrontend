import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router";
export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    cartCount: 0,
    // cartItems: null,
    fiveOrders: [],
    orders: [],
    loading: false,
    successResponse: null,
    errorResponse: null,
    validationErrors: "",
    pizzaValidationErrors: "",
    getVariants: [],
    getPizza: {},
    getAllPizza: [],
    getFeaturedPizza: [],
    cartItems: [],
    grandTotal: "",
    payLink: "",
  },
  plugins: [
    createPersistedState({
      filter: (mutation) => {
        return !["GET_SUCCESS_RESPONSE", "GET_ERROR_RESPONSE"].includes(
          mutation.type
        );
      },
    }),
  ],
  mutations: {
    GET_CURRENT_USER(state, user) {
      state.user = user;
    },
    SET_AUTHENTICATED_TO_TRUE(state) {
      state.isAuthenticated = true;
    },
    SET_AUTHENTICATED_TO_FALSE(state) {
      state.isAuthenticated = false;
    },
    GET_CART_COUNT(state, cartCount) {
      state.cartCount = cartCount;
    },
    GET_LAST_FIVE_ORDERS(state, fiveOrders) {
      state.fiveOrders = fiveOrders;
    },
    GET_ALL_ORDERS(state, orders) {
      state.orders = orders;
    },
    GET_LOADING(state, loading) {
      state.loading = loading;
    },
    GET_ERROR_RESPONSE(state, errorResponse) {
      state.errorResponse = errorResponse;
    },
    GET_SUCCESS_RESPONSE(state, successResponse) {
      state.successResponse = successResponse;
    },
    GET_VALIDATION_ERROR(state, validationErrors) {
      state.validationErrors = validationErrors;
    },
    GET_VARIANTS(state, getVariants) {
      state.getVariants = getVariants;
    },
    GET_CREATE_PIZZA_VALIDATION_ERROR(state, pizzaValidationErrors) {
      state.pizzaValidationErrors = pizzaValidationErrors;
    },
    GET_PIZZA(state, getPizza) {
      state.getPizza = getPizza;
    },
    GET_ALL_PIZZA(state, getAllPizza) {
      state.getAllPizza = getAllPizza;
    },
    GET_ALL_FEATURED_PIZZA(state, getFeaturedPizza) {
      state.getFeaturedPizza = getFeaturedPizza;
    },
    GET_CART_ITEMS(state, cartItems) {
      state.cartItems = cartItems;
    },
    GET_GRAND_TOTAL(state, grandTotal) {
      state.grandTotal = grandTotal;
    },
    GET_AUTH_PAY_LINK(state, payLink) {
      state.payLink = payLink;
    },
  },
  actions: {
    loginUser: async ({ commit, dispatch }, data) => {
      try {
        commit("GET_LOADING", true);
        const response = await axios.post("login", data);
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        router.push("/user/dashboard");
        dispatch("changeAuthenticationToTrue");
        commit("GET_SUCCESS_RESPONSE", "Login successful");
        commit("GET_LOADING", false);
      } catch (error) {
        if (error.response.status === 422) {
          commit("GET_VALIDATION_ERROR", error.response.data.errors);
        } else if (error.response.status === 400) {
          commit("GET_ERROR_RESPONSE", "Email or password do not match");
        } else {
          commit("GET_ERROR_RESPONSE", "Something went wrong, please retry");
        }
        commit("GET_LOADING", false);
      }
    },

    registerUser: async ({ commit }, data) => {
      try {
        commit("GET_LOADING", true);
        await axios.post("register", data);
        router.push("/login");
        commit(
          "GET_SUCCESS_RESPONSE",
          "Registration successful, you may now login"
        );
      } catch (error) {
        if (error.response.status === 422) {
          commit("GET_VALIDATION_ERROR", error.response.data.errors);
        } else if (error.response.status === 400) {
          commit("GET_ERROR_RESPONSE", error.response.message);
        } else {
          commit("GET_ERROR_RESPONSE", "Something went wrong, please retry");
        }
        commit("GET_LOADING", false);
      }
    },

    getCurrentUser: ({ commit }, user) => commit("GET_CURRENT_USER", user),

    getLoadingState: ({ commit }, loading) => commit("GET_LOADING", loading),

    nullSuccessResponse: ({ commit }) => commit("GET_SUCCESS_RESPONSE", null),

    nullErrorResponse: ({ commit }) => commit("GET_ERROR_RESPONSE", null),

    getCartCount: ({ commit }, cartCount) =>
      commit("GET_CART_COUNT", cartCount),

    changeAuthenticationToTrue: ({ commit }, isAuthenticated) =>
      commit("SET_AUTHENTICATED_TO_TRUE", isAuthenticated === true),

    callLoggedInUser: async ({ dispatch }) => {
      const user = await axios.get("user");
      dispatch("getCurrentUser", user.data.data);
    },

    getLastFiveOrders({ commit }) {
      const response = axios.get("orders/last-five-orders");
      commit("GET_LAST_FIVE_ORDERS", response.data);
    },

    getAllOrders({ commit, dispatch }) {
      const response = axios.get("orders");
      commit("GET_ALL_ORDERS", response.data);
      dispatch("getLoadingState", false);
    },

    getAllPizza: async ({ commit, dispatch }, text) => {
      const response = await axios.get(`all-pizzas?s=${text}`);
      commit("GET_ALL_PIZZA", response.data);
      dispatch("getLoadingState", false);
    },

    getAllFeaturedPizza: async ({ commit, dispatch }) => {
      const response = await axios.get(`featured-pizzas`);
      commit("GET_ALL_FEATURED_PIZZA", response.data);
      dispatch("getLoadingState", false);
    },

    getVariants: async ({ commit }) => {
      try {
        const response = await axios.get("variants");
        commit("GET_VARIANTS", response.data.data);
      } catch (error) {
        commit("GET_ERROR_RESPONSE", error.response?.message);
      }
    },

    getPizza: async ({ commit }, id) => {
      try {
        const response = await axios.get(`/pizza/${id}`);
        commit("GET_PIZZA", response.data.data);
        commit("GET_LOADING", false);
      } catch (error) {
        commit("GET_ERROR_RESPONSE", error.response?.message);
      }
    },

    updateUserInfo: async ({ commit, dispatch }, userInfo) => {
      try {
        commit("GET_LOADING", true);

        const response = await axios.put("users/info", userInfo);
        commit("GET_SUCCESS_RESPONSE", response.data.message);
        commit("GET_LOADING", false);
        dispatch("callLoggedInUser");
        commit("GET_LOADING", false);
      } catch (error) {
        commit("GET_ERROR_RESPONSE", error.response.message);
        commit("GET_LOADING", false);
      }
    },

    updateUserPassword: async ({ commit }, userInfo) => {
      try {
        commit("GET_LOADING", true);
        commit("GET_VALIDATION_ERROR", null);
        const response = await axios.put("users/password", userInfo);
        commit("GET_SUCCESS_RESPONSE", response.data.message);
        commit("GET_LOADING", false);
      } catch (error) {
        if (error.response.status === 422) {
          console.log(error.response.data.errors);
          commit("GET_VALIDATION_ERROR", error.response.data.errors);
        }
        commit("GET_ERROR_RESPONSE", error.response.message);
        commit("GET_LOADING", false);
      }
    },

    createPizza: async ({ commit }, formData) => {
      try {
        commit("GET_LOADING", true);
        commit("GET_CREATE_PIZZA_VALIDATION_ERROR", null);
        const response = await axios.post("/pizzas", formData);
        commit("GET_SUCCESS_RESPONSE", response.data.message);
        router.push("/user/all-pizzas");
        commit("GET_LOADING", false);
      } catch (error) {
        if (error.response.status === 422) {
          commit(
            "GET_CREATE_PIZZA_VALIDATION_ERROR",
            error.response.data.errors
          );
        }
        commit("GET_ERROR_RESPONSE", error.response.message);
        commit("GET_LOADING", false);
      }
    },

    updatePizza: async ({ commit }, id, formData) => {
      try {
        commit("GET_LOADING", true);
        commit("GET_CREATE_PIZZA_VALIDATION_ERROR", null);
        const response = await axios.put(`/pizzas/${id}`, formData);
        commit("GET_SUCCESS_RESPONSE", response.data.message);
        router.push("/user/all-pizzas");
        commit("GET_LOADING", false);
      } catch (error) {
        if (error.response.status === 422) {
          commit(
            "GET_CREATE_PIZZA_VALIDATION_ERROR",
            error.response.data.errors
          );
        }
        commit("GET_ERROR_RESPONSE", error.response.message);
        commit("GET_LOADING", false);
      }
    },

    addToCart: async ({ commit }, data) => {
      try {
        commit("GET_LOADING", true);
        const response = await axios.post("carts", data);
        commit("GET_SUCCESS_RESPONSE", response.data.message);
        commit("GET_LOADING", false);
      } catch (error) {
        commit("GET_ERROR_RESPONSE", error.response.message);
        commit("GET_LOADING", false);
      }
    },

    getCartItems: async ({ commit, dispatch }) => {
      try {
        commit("GET_LOADING", true);

        const response = await axios.get("carts");
        commit("GET_CART_ITEMS", response.data.data);
        commit("GET_GRAND_TOTAL", response.data.data);
        commit("GET_LOADING", false);
        dispatch("getCartCount", response?.data?.data[0]?.items?.length);
      } catch (error) {
        commit("GET_ERROR_RESPONSE", error.response.message);
        commit("GET_LOADING", false);
      }
    },

    emptyCart: async ({ commit }) => {
      try {
        axios.delete("carts/empty");
      } catch (error) {
        commit("GET_ERROR_RESPONSE", error.response.message);
      }
    },

    deleteCarItem: async ({ commit, dispatch }, id) => {
      try {
        commit("GET_LOADING", true);

        const response = await axios.delete(`/cart-item/${id}`);
        dispatch("getCartCount");
        commit("GET_SUCCESS_RESPONSE", response.data.message);
        commit("GET_LOADING", false);
      } catch (error) {
        commit("GET_ERROR_RESPONSE", error.response.message);
        commit("GET_LOADING", false);
      }
    },

    submitPayment: async ({ commit, dispatch }) => {
      try {
        commit("GET_LOADING", true);
        const response = await axios.get("checkout-paystack");
        window.location.href = response.data.data.authorization_url;
        dispatch("emptyCart");
        dispatch("getCartCount");
        dispatch("getCartItems");
        commit("GET_LOADING", false);
      } catch (error) {
        commit("GET_ERROR_RESPONSE", error.response.message);
        commit("GET_LOADING", false);
      }
    },
  },
  modules: {},
  getters: {
    getFirstName: (state) => {
      return state.user;
    },
    getCartLength: (state) => {
      return state.cartCount;
    },
  },
});
