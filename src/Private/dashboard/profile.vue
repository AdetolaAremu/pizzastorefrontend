<template>
  <div class="mt-7">
    <div class="bg-white rounded-md p-3">
      <div class="font-bold text-center">Profle View</div>
      <div v-if="loading === true" wire:loading class="overflow-hidden mt-3 opacity-75 flex flex-col items-center justify-center">
        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
      <form @submit.prevent="updateInfo" v-if="loading === false" class="w-full mt-2">
        <div class="grid grid-cols-1 lg:grid-cols-2 -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input v-model="first_name" class="appearance-none border-2 border-gray-200 block w-full rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Jane">
          </div>
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Last Name
            </label>
            <input v-model="last_name" class="appearance-none block w-full border-2 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Doe">
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Middle Name
            </label>
            <input v-model="middle_name" class="appearance-none block w-full border-2 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Doe">
          </div>
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Email
            </label>
            <input v-model="email" class="appearance-none block w-full border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">
          </div>
        </div>
        <div class="text-center">
            <button class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800">Submit</button>
        </div>
      </form>
    </div>

    <div class="bg-white rounded-md mt-3">
      <div class="font-bold mt text-center pt-3">Edit Password</div>
      <form @submit.prevent="updatePassword" class="w-full mt-2 px-2">
        <div class="grid grid-cols-1 lg:grid-cols-3 -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Current Password
            </label>
            <input v-model="current_password" class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="password" placeholder="*********">
            <div class="text-red-600 text-sm" v-if="validationErrors.current_password">{{ validationErrors.current_password[0] }}</div>
          </div>
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              New Password
            </label>
            <input v-model="password" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="*********">
            <div class="text-red-600 text-sm" v-if="validationErrors.password">{{ validationErrors.password[0] }}</div>
          </div>
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Confirm New Password
            </label>
            <input v-model="password_confirm" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="*********">
            <div class="text-red-600 text-sm" v-if="validationErrors.password_confirm">{{ validationErrors.password_confirm[0] }}</div>
          </div>
        </div>
        <div class="text-center">
          <button class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800">Submit</button>
        </div>
      </form>
    </div>
    
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import axios from 'axios'
import { useToast } from 'vue-toastification'
export default {
  setup(){
    const store = useStore()
    const first_name = ref('');
    const last_name = ref('');
    const middle_name = ref('');
    const email = ref('');
    const password = ref('');
    const current_password = ref('');
    const password_confirm = ref('');
    const toast = useToast()
    const validationErrors = ref('');
    const loading = ref(false)

    const updateInfo = async () => {
      await axios.put('users/info', {
        first_name:first_name.value,
        last_name:last_name.value,
        middle_name:middle_name.value,
        email:email.value
      }).then((res) => {
        toast.success(res.data.message, {
          timeout:10000
        })
        store.dispatch('GET_CURRENT_USER')
      }).catch((error) => {
        if (error.response) {
          if (error.response.status == 422) {
            toast.error(error.response.data.message, {
              timeout:10000
            })
          }
          if(error.response.status == 400) {
             toast.error('Current password is incorrect', {
              timeout:10000
            })
          }
        }
      })
    }

    const updatePassword = async () => {
      await axios.put('users/password', {
        current_password:current_password.value,
        password:password.value,
        password_confirm:password_confirm.value
      }).then((res) => {
        validationErrors.value = ''
        toast.success(res.data.message, {
          timeout:10000
        })
      }).catch((error) => {
         if (error.response) {
          if (error.response.status === 422) {
            validationErrors.value =  error.response.data.errors
            toast.error(error.response.data.message, {
              timeout:10000
            })
          }
          if(error.response.status === 400) {
             toast.error('This is a bad request', {
              timeout:10000
            })
          }
        }
      })
    }

    const user = computed(() => store.state.user)

    onMounted(async () => {
      loading.value = true
      const callLoggedInUser = await axios.get('user')
    
      const User  = callLoggedInUser.data.data

      first_name.value = User.first_name
      last_name.value = User.last_name
      middle_name.value = User.middle_name
      email.value = User.email

      loading.value = false
    });
    
    return { user, updateInfo, updatePassword, first_name, last_name, middle_name, email, current_password,
      password, password_confirm, validationErrors, loading }
  }
}
</script>

<style>
.loader {
	border-top-color: #3498db;
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>