<template>
  <Navbar />
  <div class="pt-20 bg-gradient-to-tl from-gray-800 via-black to-gray-900 w-full">
    <div class="mt-24 text-white flex justify-between lg:flex-row md:flex-row flex-col px-5 md:10 lg:px-32 pb-16">
      <div class="fade-in one">
        <div class="font-bold text-4xl lg:text-6xl">
          Order<span class="text-red-700"> Tasty Pizza</span><br> at your finger tips<br>
          <span class="text-red-700">anytime, anywhere!</span>
        </div>
        <div class="text-gray-400 font-semibold mt-5">
          Start adding your preferred pizza variant to cart today,
          <br> it will be delivered in a jiffy.
        </div>
        <div class="mt-5">
          <router-link to="/login">
            <button class="bg-red-700 text-white px-8 py-3 rounded-full shadow-2xl font-semibold
              hover:bg-white hover:text-red-700"
            >Get Started</button>
          </router-link>
        </div>
      </div>
      <div class="animate-bounce mt-16">
        <img class="lg:h-96 h-60" src="../assets/images/bg_1.png" alt="">
      </div>
    </div>
  </div>

  <div class="my-5 lg:px-20">
    <div class="py-5 text-center text-black text-3xl font-bold">
      <span class="text-red-500">Explore</span> our exquisite pizza 
      <span class="text-red-500">variants</span>
    </div>

    <div v-if="loading === true">
      <div v-if="loading === true" wire:loading class="overflow-hidden py-5 mt-3 opacity-75 flex flex-col items-center justify-center">
        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16 mb-4"></div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-5 lg:px-1 smallerscreen">
      <div class="flex mt-2" v-for="(pizza, index) in pizzaitems" :key="index">
        <img class="h-60 w-48" :src="pizza.images.main" alt="">
        <div class=" bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-60 w-48">
          <div class="font-semibold text-lg text-center mt-3 mb-2 text-white smalltitle">{{ pizza.name }}</div>
          <div class="px-3 text-gray-400 text-xs md:text-base lg:text-base textverysmall">{{ pizza.description }}</div>
          <div class="mt-5 flex justify-between flex-col md:flex-row lg:flex-row px-3">
            <div class="text-yellow-700 font-bold text-lg -mt-6 md:-mt-0 lg:-mt-0"><span class="text-xs lg:text-sm">#</span>{{ pizza.price }}</div>
            <button v-if="$store.state.isAuthenticated===true" class="bg-red-700 text-white rounded-full py-1 px-3 hover:bg-white hover:text-red-700 text-xs lg:text-base" @click="addToCart(pizza)">Add to cart</button>
            <button v-if="$store.state.isAuthenticated===false" @click="active = true" class="bg-red-700 text-white rounded-full py-1 px-3 hover:bg-white hover:text-red-700 text-xs lg:text-base">Add to cart</button>
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


  <div id="Modal">
    <transition name="animodal">
      <div class="fixed inset-0 z-20" v-if="makeModalActive">
        <div class="absolute inset-0 bg-black bg-opacity-75" @click="closeModal"></div>
        <div class="flex flex-col items-center justify-center w-screen h-screen">
          <div class="relative animodal-inner">
            <div class="rounded bg-white overflow-hidden">
            <div>
              <div class="text-center p-3 flex-auto justify-center leading-6">
                <font-awesome-icon icon="frown" class="text-8xl text-red-700" />
                
                <h2 class="text-2xl font-bold py-4">Hi, I am currently having issues with my AWS S3 account.</h2>
                <p class="text-md text-gray-500 px-8">
                  <span class="font-bold text-black">That is why the images are not loading/showing</span>, it is being attended to, please bear with me. <br>
                  <span class="font-bold text-black">It is also making me sad</span> because I have had to put a lot into creating this project. <br>
                  <span class="font-bold text-black">Thank you for your patience and understanding.</span>
                </p>
              </div>
              <div class="p-3 mt-2 text-center space-x-4 md:block">
                <button
                  @click="closeModal"
                  class="mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
                >
                  Close
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="animodal-inner absolute top-0 right-0 cursor-pointer" @click="closeModal">
          <div class="text-white text-lg p-6"><i class="material-icons"></i></div>
        </div>
      </div>
    </transition>
  </div>


  <div class="bg-gradient-to-tl from-gray-800 via-black to-gray-900 w-full mt-16 mb-10 px-5 overflow-hidden">
    <div class="pt-16 pb-10 text-white font-semibold text-3xl text-center">
      Our <span class="text-red-700">Services</span> at a glance
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 pb-24">
      <div class="text-center hover:bg-gray-900 py-2 cursor-pointer" data-aos="fade-right">
        <div class="flex justify-center"><img src="https://img.icons8.com/officel/80/000000/scooter.png"/></div>
        <div class="text-gray-400 text-3xl my-12 font-semibold">Fast Delivery</div>
        <div class="text-white">
          We deliver pizza to your doorstep with lightening speed,<br>
          maybe not lightening speed, but you get the point. Give us <br>a
          try and you will absolutely love our service.
        </div>
      </div>

      <div class="text-center hover:bg-gray-900 py-2 cursor-pointer">
        <div class="flex justify-center"><img class="" src="https://img.icons8.com/external-konkapp-flat-konkapp/80/000000/external-pizza-seafood-konkapp-flat-konkapp.png"/></div>
        <div class="text-gray-400 text-3xl my-12 font-semibold">Tasty Pizza</div>
        <div class="text-white">
          we offer you the best and most tasty pizza, we have <br>varieties of
          pizzas, you can choose from our menu and be assured of satisfaction<br>
        </div>
      </div>

      <div class="text-center hover:bg-gray-900 py-2 cursor-pointer" data-aos="fade-left">
        <div class="flex justify-center"><img src="https://img.icons8.com/external-victoruler-flat-gradient-victoruler/100/000000/external-time-food-and-delivery-victoruler-flat-gradient-victoruler.png"/></div>
        <div class="text-gray-400 text-3xl mt-8 font-semibold">24/7 Customer Service</div>
        <div class="text-white" style="margin-top:44px">
          We are always here to help you, if you have any questions or <br>
          concerns, we are always here to help you. Our services run 24/7
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-between lg:flex-row md:flex-row flex-col px-5 md:10 lg:px-32">
    <div data-aos="fade-up">
      <div class="text-4xl lg:text-6xl font-bold text-gray-800 mt-6">Our Customers <br> love what we do</div>
      <div class="mt-10 font-semibold">We have served thousands of customers and<br> who have good things to say about us</div>
      <button class="border-gray-300 mt-10 w-64 rounded-md px-5 py-5 text-gray-800 shadow-2xl text-center font-bold hover:bg-red-700 hover:text-white border transition duration-300 ease-in-out delay-150 ">
        Read more success stories
      </button>
    </div>

    <div class="mb-6 pt-10 lg:pt-0">
      <div class="border border-gray-300 mb-3 shadow-2xl flex justify-between rounded w-80 lg:w-96 px-3 cursor-pointer
        hover:scale-110 transform transition duration-500 reducewidth">
        <div class="py-2">
          <div class="text-5xl text-red-400">
            <font-awesome-icon icon="quote-left" />
          </div>
          <div>I got my pizza delivered to me within 30minutes, recommended.</div>
          <div class="font-bold text-gray-800 text-lg">Bella Dan</div>
        </div>
        <img class="h-20 mt-14 lg:mt-5 md:mt-5 rounded-full" src="../assets/images/testi.webp" alt="">
      </div>
      <div class="border border-gray-300 mb-3 shadow-2xl flex justify-between rounded w-80 lg:w-96 px-3 cursor-pointer
        hover:scale-110 transform transition duration-500 reducewidth">
        <div class="py-2">
          <div class="text-5xl text-red-400">
            <font-awesome-icon icon="quote-left" />
          </div>
          <div>I still can't believe I got a pizza this good in record time!</div>
          <div class="font-bold text-gray-800 text-lg">Bisi Jola</div>
        </div>
        <img class="h-20 mt-14 lg:mt-5 md:mt-5 rounded-full" src="../assets/images/testi2.webp" alt="">
      </div>
      <div class="border border-gray-300 mb-3 shadow-2xl flex justify-between rounded w-80 lg:w-96 px-3 cursor-pointer
        hover:scale-110 transform transition duration-500 reducewidth">
        <div class="py-2">
          <div class="text-5xl text-red-400">
            <font-awesome-icon icon="quote-left" />
          </div>
          <div>The pizza tastes good, looks nice and also delivered fast.</div>
          <div class="font-bold text-gray-900 text-lg">Jessie Jay</div>
        </div>
        <img class="h-20 mt-14 lg:mt-5 md:mt-5 rounded-full" src="../assets/images/testi3.webp" alt="">
      </div>
    </div>
  </div>
  <Footer />
</template>
<script>
import Navbar from '../components/publicnavbar.vue';
import Footer from '../components/publicfooter.vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
import { ref } from '@vue/reactivity';
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';
export default {
  components:{ Navbar, Footer },
   setup(){
    const pizzaitems = ref('')
    const currentPizzaId = ref('')
    const toast = useToast()
    const store = useStore()
    const loading = ref(false)
    const active = ref(false)
    const makeModalActive = ref(true)

    const closeModal = () => {
      makeModalActive.value = false
    }

    const destroy = () => {
      active.value = false
    }

    const getAllPizzas = async () => {
      loading.value = true

      const response  = await axios.get(`featured-pizzas`)
      
      pizzaitems.value = response.data

      loading.value = false
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

    return { pizzaitems, getAllPizzas, addToCart, currentPizzaId, loading, active, destroy, makeModalActive,
      closeModal
    }
  }
}
</script>

<style>
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fade-in {
  opacity:0; 
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fade-in.one {
  -webkit-animation-delay: 2s;
  -moz-animation-delay: 2s;
  animation-delay: 2s;
}

@media screen and (max-width:300px) {
  .smallerscreen {
    padding-left: 0;
    padding-right: 0;
  }

  .textverysmall {
    font-size: 10px;
  }

  .smalltitle {
    font-size: 12px;
  }

  .reducewidth {
    width:16.7rem;
  }
}

</style>