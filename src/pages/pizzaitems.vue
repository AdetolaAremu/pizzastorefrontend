<template>
  <Navbar />
  <div class="pt-24 px-16">
    
    <div class="flex justify-between">
      <input type="text" placeholder="Input search text here e.g french pizza" 
        class="border-2 border-purple-500 py-2 rounded-md w-72 mb-3"
      >
      <select name="" class="border-2 border-purple-500 rounded-md w-72">
        <option disabled selected>Select Order</option>
        <option>Order by Highest Pizza Price</option>
        <option>Order by Lowest Pizza Price</option>
      </select>
    </div>

    <div class="grid grid-cols-3 mb-10">
      <div class="flex mt-2" v-for="(pizza, index) in pizzaitems" :key="index">
        <img class="h-60 w-48" src="../assets/images/pizza-2.jpg" alt="">
        <div class=" bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-60 w-52">
          <div class="font-semibold text-lg text-center mt-3 mb-2 text-white">{{ pizza.name }}</div>
          <div class="px-3 text-gray-400">{{ pizza.description }}</div>
          <div class="mt-5 flex justify-between px-3">
            <div class="text-yellow-700 font-bold text-lg">{{ pizza.price }}</div>
            <button class="bg-red-700 text-white rounded-full py-1 px-3" @click="addToCart(pizza)">Add to cart</button>
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
import { ref } from '@vue/reactivity';
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';
import { useToast } from 'vue-toastification'
import { useStore } from 'vuex';
export default {
  components:{ Navbar, Footer },
  setup(){
    const pizzaitems = ref('')
    const currentPizzaId = ref('')
    const toast = useToast()
    const store = useStore()

    const getAllPizzas = async () => {
      await axios.get('all-pizzas')
      .then((response) => {
        pizzaitems.value = response.data.data
      })
    }

    const addToCart = async (pizza) => {
      await axios.post('carts', {
        pizza_id:pizza.id,
        pizza_name:pizza.name,
        price:pizza.price,
      }).then((res) => {
        store.dispatch("getCartItems")
        toast.success((res.data.message), {
          timeout:5000
        })
      }).catch((error) => {
        if (error.response) {
          if(error.response.status === 422){
            toast.info("Pizza item is in your cart already!", {
              timeout:5000
            })
          }
        }
      })
    }

    onMounted(getAllPizzas())

    return { pizzaitems, getAllPizzas, addToCart, currentPizzaId }
  }
}
</script>

<style>

</style>