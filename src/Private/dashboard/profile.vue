<template>
  <div class="px-24 mt-7">
    <div class="font-bold">Profle View</div>
    <form @submit.prevent="updateInfo" class="w-full mt-2">
      <div class="grid grid-cols-1 lg:grid-cols-2 -mx-3 mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            First Name
          </label>
          <input v-model="first_name" class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Jane">
        </div>
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Last Name
          </label>
          <input v-model="last_name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Doe">
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Middle Name
          </label>
          <input v-model="middle_name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Doe">
        </div>
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Email
          </label>
          <input v-model="email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">
        </div>
      </div>
      <div class="text-center">
          <button class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800">Submit</button>
      </div>
    </form>

    <div class="font-bold mt">Edit Password</div>
    <form @submit.prevent="updateInfo" class="w-full mt-2">
      <div class="grid grid-cols-1 lg:grid-cols-3 -mx-3 mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Current Password 
          </label>
          <input v-model="current_password" class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="*********">
        </div>
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            New Password
          </label>
          <input v-model="last_name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="*********">
        </div>
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Confirm New Password
          </label>
          <input v-model="last_name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="*********">
        </div>
      </div>
     
      <div class="text-center">
          <button class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800">Submit</button>
      </div>
    </form>
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
    const toast = useToast()

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
      }).catch((error) => {
        if (error.response) {
          if (error.response.status == 422) {
            toast.error('Please see the errors', {
              timeout:10000
            })
          }
          if(error.response.status == 400) {
             toast.error('This is a bad request', {
              timeout:10000
            })
          }
        }
      })
    }

    const user = computed(() => store.state.user)

    onMounted(async () => {
      const callLoggedInUser = await axios.get('user')
    
      const User  = callLoggedInUser.data.data

      first_name.value = User.first_name
      last_name.value = User.last_name
      middle_name.value = User.middle_name
      email.value = User.email
    })
    
    return { user, updateInfo, first_name, last_name, middle_name, email }
  }
}
</script>

<style>

</style>