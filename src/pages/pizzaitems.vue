<template>
  <Navbar />
  <div class="pt-24 px-8 lg:px-16">
    
    <div class="">
      <input type="text" placeholder="Input search text here e.g french pizza" 
        class="border-2 border-purple-500 py-2 rounded-md w-72 mb-3" @keyup="filterProduct($event.target.value)">
    </div>

    <div v-if="loading === true" wire:loading class="overflow-hidden py-36 mt-3 opacity-75 flex flex-col items-center justify-center">
      <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-36 w-36 mb-4"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-10" v-if="loading === false">
      <div class="flex mt-2 mr-0 md:mr-2" v-for="(pizza, index) in pizzaitems" :key="index">
        <img class="h-60 w-48" src="../assets/images/pizza-2.jpg" alt="">
        <div class=" bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-60 w-52">
          <div class="font-semibold text-lg text-center mt-3 mb-2 text-white">{{ pizza.name }}</div>
          <div class="px-3 text-gray-400 text-xs md:text-base lg:text-base">{{ pizza.description }}</div>
          <div class="mt-5 flex justify-between flex-col md:flex-row lg:flex-row px-3">
            <div class="text-yellow-700 font-bold text-sm lg:text-lg"><span class="text-xs lg:text-sm">#</span>{{ pizza.price }}</div>
            <button v-if="$store.state.isAuthenticated===true" class="bg-red-700 text-white rounded-full py-1 px-3 hover:bg-white hover:text-red-700 text-xs lg:text-base" @click="addToCart(pizza)">Add to cart</button>
            <button v-if="$store.state.isAuthenticated===false" @click="active = true" class="bg-red-700 text-white rounded-full py-1 px-3 hover:bg-white hover:text-red-700">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="Modal">
    <transition name="animodal">
      <div class="fixed inset-0 z-20" v-if="active">
        <div class="absolute inset-0 bg-black bg-opacity-75" @click="destroy"></div>
        <div class="flex flex-col items-center justify-center w-screen h-screen">
          <div class="relative animodal-inner">
            <div class="rounded bg-white overflow-hidden">
            <div>
              <div class="text-center p-3 flex-auto justify-center leading-6">
                <font-awesome-icon icon="frown" class="text-8xl text-red-700" />
                
                <h2 class="text-2xl font-bold py-4">Hi, only logged in user can add to cart</h2>
                <p class="text-md text-gray-500 px-8">
                  Please register <router-link to="/register" class="text-red-600">here</router-link> cheers!
                </p>
              </div>
              <div class="p-3 mt-2 text-center space-x-4 md:block">
                <button
                  @click="destroy"
                  class="mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
                >
                  Close
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="animodal-inner absolute top-0 right-0 cursor-pointer" @click="destroy">
          <div class="text-white text-lg p-6"><i class="material-icons"></i></div>
        </div>
      </div>
    </transition>
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
import debounce from "lodash/debounce"

export default {
  components:{ Navbar, Footer },
  setup(){
    const pizzaitems = ref('')
    const currentPizzaId = ref('')
    const toast = useToast()
    const store = useStore()
    const loading = ref(false)
    const searchProduct = ref('')
    const active = ref(false)
    const runCheck = ref('')

    const destroy = () => {
      active.value = false
    }

    const getAllPizzas = async (text = '') => {
      loading.value = true

      const response  = await axios.get(`all-pizzas?s=${text}`)
      
      pizzaitems.value = response.data

      loading.value = false
    }

    const filterProduct = debounce((text) => {
       getAllPizzas(text)
    }, 800)

    const addToCart = async (pizza) => {
      await axios.post('carts', {
        pizza_id:pizza.id,
        pizza_name:pizza.name,
        price:pizza.price,
      }).then((res) => {
        store.dispatch("getCartItems")
        toast.success((res.data.message), {
          timeout:3000
        })

      }).catch((error) => {
        if (error.response) {
          if(error.response.status === 422){
            toast.info("Pizza item is in your cart already!", {
              timeout:3000
            })
          }
        }
      })
      checkIDFromDatabase(pizza.id)
    }

    const checkIDFromDatabase = async (id) => {
      const response = await axios.get(`/carts/check/${id}`)
      runCheck.value = response.data
    }

    onMounted(async () => await getAllPizzas())

    return { pizzaitems, getAllPizzas, addToCart, currentPizzaId, loading, searchProduct, 
    filterProduct, checkIDFromDatabase, active, destroy, runCheck }
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