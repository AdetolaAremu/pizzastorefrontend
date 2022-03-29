<template>
  <Navbar />
  <div class="bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-full lg:h-screen">
    <div class="font-bold text-2xl text-center text-white mb-5 pt-32">LOGIN</div>
    <div class="flex justify-center pb-12">
      <div class="">
        <form @submit.prevent="loginUser" class="w-full mt-5 px-2">
          <div class="grid grid-cols-1 -mx-3 mb-6">
            <div class="w-full lg:w-96 px-3">
              <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
                Email
              </label>
              <input v-model="email" class="appearance-none block w-full border border-purple-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="e.g doe@mail.com">
              <div class="text-red-600 text-sm " v-if="validationErrors.email">{{ validationErrors.email[0] }}</div>
            </div>
          </div>
          <div class="grid grid-cols-1 -mx-3 mb-6 relative">
            <div class="w-full  lg:w-96 px-3">
              <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-last-name">
                Password
              </label>
              <div @click="toggleShowHide" class="absolute inset-y-0 right-0 flex items-center pr-4">
                <label v-if="!showPassword" class="rounded px-2 py-1 mt-5 text-sm text-gray-600 font-mono cursor-pointer js-password-label" for="toggle">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path 
                    fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 
                    4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
                    clip-rule="evenodd"></path>
                  </svg>
                </label>
                <label v-if="showPassword" class="rounded px-2 py-1 mt-5 text-sm text-gray-600 font-mono cursor-pointer js-password-label" for="toggle">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 
                    00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 
                    10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 
                    4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" 
                    clip-rule="evenodd"></path><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 
                    6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
                  </svg>
                </label>

              </div>
              <input v-if="showPassword" v-model="password" :class="`${validationErrors.password != '' ? 'border border-red-500' : ''}`" class="appearance-none block w-full border border-purple-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="******">
              <input v-else v-model="password" :class="`${validationErrors.password != '' ? 'border border-red-500' : ''}`" class="appearance-none block w-full border border-purple-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="******">
              <div class="text-red-600 text-sm " v-if="validationErrors.password">{{ validationErrors.password[0] }}</div>
            </div>
          </div>
          <!-- <div class="relative w-full">
            <div class="absolute inset-y-0 right-0 flex items-center px-2">
              <label class="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" for="toggle">show</label>
            </div>
            <input class="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" id="password" type="password" autocomplete="off"
            />
          </div> -->
          <div class="text-center">
            <button v-if="loading === false" class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800">Submit</button>
            <button v-if="loading === true" disabled="loading === true" class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800">Submitting...</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- <Footer /> -->
</template>

<script>

import Navbar from '../components/publicnavbar.vue';
import { ref } from '@vue/reactivity';
import axios from 'axios';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  components: {Navbar},
  setup(){
    const email = ref('');
    const password = ref('');
    const validationErrors = ref('');
    const toast = useToast()
    const router = useRouter()
    const store = useStore()
    const loading = ref(false)
    const showPassword = ref(false)

    const toggleShowHide = () => {
      showPassword.value = !showPassword.value
    }

    const loginUser = async () => {
        loading.value = true
        await axios.post('login', {
        email:email.value,
        password:password.value,
      }).then((response) => {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
        router.push('/user/dashboard')
        store.dispatch('changeAuthenticationToTrue')
        toast.success("Login successful", {
          timeout: 10000
        });
        loading.value = false
      }).catch((error) => {
        if (error.response) {
          if(error.response.status === 422){
          validationErrors.value =  error.response.data.errors
          }
          if (error.response.status === 400) {
            toast.error("Email or password do not match", {
              timeout: 10000
            });
          }
        }
        loading.value = false
      })
    }
    return {email, password, loginUser, validationErrors, toast, loading, showPassword, toggleShowHide}
  }
}
</script>

<style>

</style>