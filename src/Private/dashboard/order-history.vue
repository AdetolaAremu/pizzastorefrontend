<template>
  <div class="px-2 bg-white rounded-lg ">
    <div class="font-semibold mt-10 text-xl text-center">All Orders table</div>
    <table class="table-fixed w-full mt-2">
      <thead class="bg-gray-300 py-4">
        <tr>
          <th>S/N</th>
          <th>Total Amount</th>
          <th>Payment Status</th>
          <th>Transaction type</th>
          <th>Actions</th>
        </tr>
      </thead>
       <!-- v-if="orders.length === 4 ? orders.slice(): orders" -->
      <tbody class="text-center">
        <tr v-for="(order, index) in orders" :key='index.id'>
          <td>{{ index + 1 }}</td>
          <td>{{ order.total_amout }}</td>
          <td class="capitalize">{{ order.payment_status }}</td>
          <td class="capitalize">{{ order.transaction_type }}</td>
          <td><router-link :to="`/user/order/${order.id}`">View</router-link></td>
        </tr>
      </tbody>
    </table>

    <div v-if="orders.length === 0 && loading === false" class="text-center my-3">No content to display</div>

    <div v-if="loading === true" wire:loading class="overflow-hidden mt-3 opacity-75 flex flex-col items-center justify-center">
      <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
export default {
  setup(){
    const orders = ref('')
    const loading = ref(false)

    const getOrderHistory = async () => {
      loading.value = true;

      const response = await axios.get('/orders')
      orders.value = response.data
      
      loading.value = false
    }

    onMounted(() => getOrderHistory())

    return { orders, getOrderHistory, loading }
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