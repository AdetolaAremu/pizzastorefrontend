<template>
  <div class="font-sans antialiased" id="app">
    <nav class="flex items-center justify-between flex-wrap text-white bg-black p-6 absolute w-full">
      <router-link to="/" class="flex items-center flex-no-shrink">
        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
        <span class="font-semibold text-xl tracking-tight">Peeza</span>
      </router-link>
      <div class="block sm:hidden">
        <button @click="toggleNav" class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div :class="opened ? 'block': 'hidden'" class="w-full z-50 flex-grow sm:flex sm:items-center sm:w-auto">
        <div class="text-sm sm:flex-grow lg:text-center">
          <router-link to="/user/dashboard" class="no-underline block mt-4 text-lg sm:inline-block sm:mt-0 text-teal-lighter font-semibold hover:text-white mr-4">
            Dashboard
          </router-link>
          <router-link to="/user/order-history" class="no-underline block mt-4 text-lg sm:inline-block sm:mt-0 text-teal-lighter font-semibold hover:text-white mr-4">
            Order History
          </router-link>
          <router-link to="/user/profile" class="no-underline block mt-4 text-lg sm:inline-block sm:mt-0 text-teal-lighter font-semibold hover:text-white mr-4">
            Profile
          </router-link>
          <router-link to="/store" class="no-underline block mt-4 text-lg sm:inline-block sm:mt-0 text-teal-lighter font-semibold hover:text-white">
            Store
          </router-link>
        </div>
        <div class="relative">
          <a href="#" class="no-underline inline-block text-lg px-4 py-2 leading-none border rounded 
            text-white border-black mt-4 -ml-4 sm:mt-0 " @click="toggleNameDropDown"
          >Hi, {{ user?.first_name }}</a>
          <div v-if="toggleDropDown" class="absolute w-28 top-auto left-0 py-2 mt-2 rounded-lg border-gray-900 bg-white shadow-xl">
            <a class="text-sm text-gray-900 block px-4 py-2 cursor-pointer">Profile</a>
            <button @click="logout" class="text-sm bg-red-600 ml-2 rounded-sm text-white block px-4 py-2 cursor-pointer">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  setup(){
    const opened = ref(false);
    const toggleDropDown = ref(false)
    const store = useStore();

    const toggleNav = () => {
      opened.value = !opened.value
    }

    const toggleNameDropDown = () => {
      toggleDropDown.value = !toggleDropDown.value
    }

    const logout = () => {
      localStorage.clear();

      window.location.href = '/login'
    }

    const user = computed(() => store.state.user)

    return { opened, toggleNav, toggleDropDown, toggleNameDropDown, logout, user }
  }
}
</script>

<style>

</style>