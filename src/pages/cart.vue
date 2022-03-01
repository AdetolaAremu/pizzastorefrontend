<template>
  <Navbar />
  
  <div class="py-56 inset-0" v-if="cartItems === null || cartItems === ''">
    <div class="flex h-full">
      <div class="m-auto bg-gradient-to-tl from-gray-800 via-black to-gray-900 p-2 rounded shadow w-10/12 md:w-1/3">
        <div class="text-center my-5 text-white font-semibold">
          Cart is empty, <router-link to="/login" class="text-red-600">Log in</router-link> to add to cart
        </div>
      </div>
    </div>
  </div>

  <div class="mb-3" v-for="pizza in cartItems" :key="pizza">
    <div class="pt-24 lg:px-16 grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1">
      <div class="flex justify-between bg-gray-100 py-2 px-3 rounded-md m-2 hover:bg-blue-200" 
        v-for="thepizza in pizza.items" :key="thepizza"
      >
        <span> <img class="h-40 w-60" src="../assets/images/pizza-2.jpg" alt=""></span>
        <span class="flex cursor-pointer">
          <span class="ml-3 mt-1 flex-col flex">
            <span class="font-semibold text-xl">{{ thepizza.pizza_name }}</span>
            <div class="font-semibold mt-3 mr-1 text-xl"><span class="text-xs text-gray-600">NGN</span>{{ thepizza.price }}</div>
            <div class="mt-3">
              <span class="mr-2 text-xs">Qty</span>
              <input class="w-10 text-center" v-model="thepizza.quantity" type="number" name="" id="">
            </div>
            <div class="mt-3">
              <span class="mr-1 text-xs">Total:</span>
              <span class="font-semibold">{{ pizza.grand_total }}</span>
            </div>
          </span>
        </span>
        <span><button class="bg-red-700 rounded-full mt-5 py-3 px-5 text-white font-bold">x</button></span>
      </div>
    </div>
    <div class="flex justify-center text-white">
      <button class="flex justify-between w-96 bg-green-700 rounded-lg px-6 py-2 font-semibold">
        <div>
          <div>Grand Total</div>
          <div class="text-xl"><span class="text-xs mr-1">NGN</span>{{ pizza.grand_total }}</div>
        </div>
        <div class="text-2xl mt-2">
          Proceed
        </div>
      </button>
    </div>
  </div>

  <div>

  </div>
  
  <Footer />
</template>

<script>
import Navbar from '../components/publicnavbar.vue';
import Footer from '../components/publicfooter.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
export default {
  components: { Navbar, Footer },
  setup(){
    const cartItems = ref('');
    const toast = useToast();
    const currentStep = ref(0)
    const inputQuantity = ref('')
    const store = useStore()

    const getCartItems = async () => {
      await axios.get('carts')
      .then((res) => {
        cartItems.value = res.data.data
        store.dispatch('getCartCount', res.data.data[0].items.length)
      }).catch((error) => {
        if(error.response){
          if (error.response.status === 500) {
            toast.error('Error!', {
              timeout:10000
            })
          }
        }
      })
    }

    onMounted(getCartItems())

    return { cartItems, getCartItems, currentStep, inputQuantity }
  }
}
</script>

<style>

</style>