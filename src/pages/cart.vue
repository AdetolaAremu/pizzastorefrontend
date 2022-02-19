<template>
  <Navbar />
  
  <div class="py-56 inset-0" v-if="cartItems === null">
    <div class="flex h-full">
      <div class="m-auto bg-gradient-to-tl from-gray-800 via-black to-gray-900 p-2 rounded shadow w-10/12 md:w-1/3">
        <div class="text-center my-5 text-white font-semibold">
          Cart is empty, <router-link to="/login" class="text-red-600">Log in</router-link> to add to cart
        </div>
      </div>
    </div>
  </div>

  <div class="pt-24 pb-16 px-20" v-for="pizza in cartItems" :key="pizza">
    <div class="w-56 py-8" v-for="thepizza in pizza.items" :key="thepizza">
      <div class="flex mt-2">
        <img class="h-80 w-72" src="../assets/images/pizza-2.jpg" alt="">
        <div class=" bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-80 w-72">
          <div class="font-semibold text-lg text-center mt-3 mb-2 text-white">{{ thepizza.pizza_name }}</div>
          <!-- <div class="px-3 text-gray-400">description here</div> -->
          <div class="mt-5 flex justify-between px-3">
            <div class="text-yellow-700 font-bold text-lg">{{ thepizza.price }}</div>
            <button class="bg-red-700 text-white rounded-full py-1 px-3">Remove from cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <Footer />
</template>

<script>
import Navbar from '../components/publicnavbar.vue';
import Footer from '../components/publicfooter.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { onMounted, ref } from 'vue'
export default {
  components: { Navbar, Footer },
  setup(){
    const cartItems = ref('');
    const toast = useToast();

    const getCartItems = async () => {
      await axios.get('carts')
      .then((res) => {
        console.log('response', res.data.data)
        cartItems.value = res.data.data
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

    return { cartItems, getCartItems }
  }
}
</script>

<style>

</style>