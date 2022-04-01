<template>
  <div class="mt-6">
    <div class="bg-white">
      <div class="px-5 pt-5">
        <div class="flex justify-between">
          <div><span class="font-bold">Count of Users:</span> {{ stats?.users_count }}</div>
          <div><span class="font-bold">Count of Pizzas:</span> {{ stats?.pizza_count }}</div>
        </div>
        <div class="flex justify-between mt-2">
          <div><span class="font-bold">Count of All Pending Orders:</span> {{ stats?.pending_orders_count }}</div>
          <div><span class="font-bold">Count of All Successful Orders:</span> {{ stats?.successful_orders_count }}</div>
        </div>
      </div>
      <div class="font-semibold text-center mt-6">All Users</div>
      <table class="table-fixed w-full mt-2 mb-3">
        <thead class="bg-gray-300 py-4">
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user?.first_name }} {{ user?.last_name }}</td>
            <td>{{ user?.email }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading === true" wire:loading class="overflow-hidden mt-3 opacity-75 flex flex-col items-center justify-center">
        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
export default {
  setup(){
    const stats = ref('')
    const users = ref([])
    const loading = ref(false)

    const getStats = async () => {
      const response = await axios.get('/admin-stats')
      stats.value = response.data
    }

    const getUsers = async () => {
      loading.value = true

      const response = await axios.get('/users')
      users.value = response.data.data

      loading.value = false
    }

    onMounted(getStats(), getUsers())

    return { stats, getStats, getUsers, users, loading }
  }
}
</script>

<style>

</style>