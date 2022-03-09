<template>
  <Navbar />
  
  <div class="pt-56 pb-20 inset-0" v-if="countCartItems === 0">
    <div class="flex h-full">
      <div class="m-auto bg-gradient-to-tl from-gray-800 via-black to-gray-900 p-2 rounded shadow w-10/12 md:w-1/3">
        <div class="text-center my-5 text-white font-semibold">
          Cart is empty, <router-link to="/login" class="text-red-600">Log in</router-link> to add to cart
        </div>
      </div>
    </div>
  </div>

  <div class="mb-3" v-for="pizza in cartItems" :key="pizza" v-show="currentpage === 0">
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
        <span><button @click="deleteCartItem(thepizza.id)" class="bg-red-700 rounded-full mt-5 py-3 px-5 text-white font-bold">x</button></span>
      </div>
    </div>
    <div class="flex justify-center text-white" v-if="countCartItems > 0">
      <button @click="nextpage" class="flex justify-between w-96 bg-green-700 rounded-lg px-6 py-2 font-semibold">
        <div>
          <div>Grand Total</div>
          <div class="text-xl"><span class="text-xs mr-1">NGN</span>{{ pizza.grand_total }}</div>
        </div>
        <div class="flex">
          <div class="text-2xl mt-2">
            Proceed
          </div>
          <span class="mt-3 ml-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" 
            stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </div>
      </button>
    </div>
  </div>

  <div class="pt-32 pb-20" v-show="currentpage === 1">
    <div class="font-bold text-center text-xl mb-3">Checkout</div>
    <div class="flex justify-center">
      <form @submit.prevent="submitForPayment" class="bg-gradient-to-tl from-gray-800 via-black to-gray-900 w-2/5 shadow-2xl py-3 rounded-lg">
        <div class="w-full px-3">
          <label class="block text-white uppercase tracking-wide text-xs font-bold mb-2" for="grid-last-name">
            Address
          </label>
          <input v-model="address" class="appearance-none block w-full rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Enter Address">
          <!-- <div class="text-red-600 text-sm " v-if="validationErrors.password">{{ validationErrors.password[0] }}</div> -->
        </div>
        <div class="w-full px-3 mt-4">
          <label class="block text-white uppercase tracking-wide text-xs font-bold mb-2" for="grid-last-name">
            Phone Number
          </label>
          <input v-model="phone_number" class="appearance-none block w-full rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Enter Address">
          <!-- <div class="text-red-600 text-sm " v-if="validationErrors.password">{{ validationErrors.password[0] }}</div> -->
        </div>
        <div class="w-full px-3 mt-4">
          <label class="block text-white uppercase tracking-wide text-xs font-bold mb-2" for="grid-last-name">
            City <span class="text-red">*</span>
          </label>
          <input v-model="city" class="appearance-none block w-full rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Enter Address">
          <!-- <div class="text-red-600 text-sm " v-if="validationErrors.password">{{ validationErrors.password[0] }}</div> -->
        </div>
        <div class="w-full px-3 mt-4 text-center">
          <label class="block text-white uppercase tracking-wide text-xs font-bold mb-2" for="grid-last-name">
            Total Amount to be paid
          </label>
          <div class="text-white font-bold text-xl">
            NGN {{ getGrandTotal }}
          </div>
          
          <!-- <div class="text-red-600 text-sm " v-if="validationErrors.password">{{ validationErrors.password[0] }}</div> -->
        </div>
        <div class="mt-4 text-center">
          <button class="text-white bg-green-600 rounded-md px-3 py-2">Proceed to pay</button>
        </div>
      </form>
    </div>
  </div>
  
  <Footer />
</template>

<script>
import Navbar from '../components/publicnavbar.vue';
import Footer from '../components/publicfooter.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
export default {
  components: { Navbar, Footer },
  setup(){
    const cartItems = ref('');
    const toast = useToast();
    const currentStep = ref(0)
    const inputQuantity = ref('')
    const store = useStore()
    const currentpage = ref(0)
    const getGrandTotal = ref('')
    const city = ref('')
    const phone_number = ref('')
    const address = ref('');
    const auth_pay_link = ref('');
    const loading = ref(false)

    const submitForPayment = async () => {
      await axios.post('/checkout-paystack', {
        city:city.value,
        phone_number:phone_number.value,
        address_one:address.value
      }).then((res) => {
       auth_pay_link.value = res.data.data.authorization_url
       window.location.href = auth_pay_link.value;
       emptyCart()
       getCartItems()
      }).catch((error) => {
        if(error.res){
          if (error.response.status === 500) {
            toast.error('The payment gateway is not responding, please retry!', {
              timeout:10000
            })
          }
        }
      })
    }

    const getCartItems = async () => {
      loading.value = true

      await axios.get('carts')
      .then((res) => {
        cartItems.value = res.data.data
        getGrandTotal.value = res.data.data[0].grand_total
        store.dispatch('getCartCount', res.data.data[0].items.length)

        loading.value = false
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

    const emptyCart = async () => {
      await axios.delete('carts/empty')
    }

    const deleteCartItem = async (id) => {
      await axios.delete(`/cart-item/${id}`)
       getCartItems()
      toast.success('Cart item deleted!', {
        timeout:10000
      })
    }

    const countCartItems = computed(() =>  store.getters.getCartLength)

    onMounted(countCartItems, store.dispatch("getCartItems"))

    const nextpage = () => {
      currentpage.value++
    }

    const previouspage = () => {
      currentpage.value--
    }

    onMounted(getCartItems())

    return { cartItems, getCartItems, currentStep, inputQuantity, currentpage, nextpage, 
      previouspage, getGrandTotal, submitForPayment, city, phone_number, address, auth_pay_link, emptyCart,
      deleteCartItem, countCartItems, loading
    }
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