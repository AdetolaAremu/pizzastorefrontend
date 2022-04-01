<template>
<div class="bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-screen">
  <div class="py-56 inset-0">
    <div class="flex h-full">
      <div class="m-auto p-2 rounded bg-white shadow w-10/12 md:w-1/3">
        <div class="text-center my-7 text-green-800 text-2xl font-semibold">
          Your payment is successful!
        </div>
        <div class="font-semibold text-center pb-3">
          <router-link to="/user/order-history" class="text-black rounded-lg bg-white border-2 border-green-600 px-2 py-2">Take me to Order Page</router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { useRoute } from "vue-router";
import axios from 'axios'
import { useStore } from 'vuex';
export default {
  setup(){
    const route = useRoute();
    const store = useStore();

    const finalize = async () => {
      await axios.get(`/finalize_payment`)
    }

    const emptyCart = async () => {
      await axios.delete('carts/empty')
      store.dispatch('getCartCount')
    }

    onMounted(async () => finalize(), emptyCart())

    return { route, finalize, emptyCart }
  }
}
</script>

<style>

</style>