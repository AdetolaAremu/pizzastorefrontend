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
          <div class="grid grid-cols-1 -mx-3 mb-6">
            <div class="w-full lg:w-96 px-3">
              <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-last-name">
                Password
              </label>
              <input v-model="password" :class="`${validationErrors.password != '' ? 'border border-red-500' : ''}`" class="appearance-none block w-full border border-purple-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="******">
              <div class="text-red-600 text-sm " v-if="validationErrors.password">{{ validationErrors.password[0] }}</div>
            </div>
          </div>
          <div class="text-center">
            <button class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800">Submit</button>
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

    const loginUser = async () => {
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
      })
    }
    return {email, password, loginUser, validationErrors, toast}
  }
}
</script>

<style>

</style>