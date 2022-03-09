<template>
  <div class="font-sans antialiased" id="app">
    <nav class="flex items-center justify-between flex-wrap text-white bg-black z-50 p-6 absolute w-full">
      <div class="flex items-center flex-no-shrink">
        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
        <span class="font-semibold text-xl tracking-tight">Peeza</span>
      </div>
      <div class="block sm:hidden">
        <button @click="toggleNav" class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div :class="opened ? 'block': 'hidden'" class="w-full z-50 flex-grow sm:flex sm:items-center sm:w-auto">
        <div class="text-sm sm:flex-grow lg:text-center">
          <router-link to="/" class="no-underline block mt-4 text-lg sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
            Home
          </router-link>
          <router-link to="/store" class="no-underline block mt-4 text-lg sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
            Store
          </router-link>
          <router-link to="/" class="no-underline block mt-4 text-lg sm:inline-block sm:mt-0 text-teal-lighter hover:text-white">
            Github
          </router-link>
        </div>
        <div>
          <router-link to="/cart" class="no-underline block text-lg sm:inline-block sm:mt-0 text-teal-lighter 
            hover:text-white lg:pr-5"
          >
            <svg class="w-6 h-6 lg:pt-2 relative" fill="none" stroke="currentColor" viewBox="0 0 24 22" 
              xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" 
              stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 
              1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
              </path>
            </svg>
            <span class="absolute text-xs bg-red-600 text-white p-1 lg:top-4 rounded-full lg:ml-3">
              {{ countCartItems }}
            </span>
          </router-link>
          <router-link to="/register" class="no-underline bg-green-700 inline-block text-sm px-4 py-2 leading-none border rounded 
            text-white border-green-700 hover:border-transparent hover:text-teal hover:bg-green-900 mt-4 
            sm:mt-0 mr-4" v-if="$store.state.isAuthenticated===false">Sign Up</router-link>
          <router-link to="/login" class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded 
            text-white border-black hover:border-transparent hover:text-teal hover:border-white mt-4 
            sm:mt-0" v-if="$store.state.isAuthenticated===false">Sign In</router-link>
          <router-link to="/user/dashboard" class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded 
            text-white border-black hover:text-teal hover:bg-green-800 mt-4 
            sm:mt-0 bg-green-700" v-if="$store.state.isAuthenticated===true">Dashboard</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref, computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
export default {
  setup(){
    const opened = ref(false)
    const store = useStore()

    const toggleNav = () => {
      opened.value = !opened.value
    }

    const countCartItems = computed(() =>  store.getters.getCartLength)

    onMounted(countCartItems, store.dispatch("getCartItems"))

    return { opened, toggleNav, countCartItems }
  }
}
</script>

<style>

</style>