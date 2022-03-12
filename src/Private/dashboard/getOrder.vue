<template>
  <div class="bg-white mt-6">
    <div class="py-2">
      <div v-if="loading === true" wire:loading class="overflow-hidden py-36 mt-3 opacity-75 flex flex-col items-center justify-center">
        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-36 w-36 mb-4"></div>
      </div>

      <div class="" v-if="loading === false">
        <div class="text-center font-semibold">
          <span class="capitalize">Order Code:</span> {{ getorder?.order_code }}
        </div>
      </div>

      <div v-if="loading === false" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div class="" v-for="item in orderItems" :key="item.id">
          <div class="bg-gray-200 w-64 mx-3 my-2 py-3 px-2 rounded-md shadow-lg">
            <div><span class="font-semibold">Name: </span>{{ item?.pizza_name }}</div>
            <div><span class="font-semibold">Price: </span>Price: {{ item?.pizza_price }}</div>
            <div><span class="font-semibold">Quantity: </span> {{ item?.quantity }}</div>
            <div><span class="font-semibold">Total Amount: </span> {{ item?.total_amount }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import axios from 'axios'
export default {
  setup(){
    const getorder = ref(null)
    const orderItems = ref(null)
    const {params} = useRoute()
    const loading = ref(false)

    const getOneOrder = async () => {
      loading.value = true
      const response = await axios.get(`/orders/with-items/${params.id}`)

      getorder.value = response.data
      orderItems.value = response.data.items

      loading.value = false
    }

    onMounted(getOneOrder())

    return { getorder, getOneOrder, orderItems, loading }
  }
}
</script>

<style>

</style>