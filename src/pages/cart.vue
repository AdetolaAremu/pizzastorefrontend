<template>
  <Navbar />

  <div
    class="pt-52 pb-28 inset-0"
    v-if="
      ((countCartItems === 0 || countCartItems === undefined) &&
        $store.state.loading === false) ||
      $store.state.isAuthenticated === false
    "
  >
    <div class="flex h-full">
      <div
        class="m-auto bg-gradient-to-tl from-gray-800 via-black to-gray-900 p-2 rounded shadow w-10/12 md:w-1/3"
      >
        <div class="text-center my-5 text-white font-semibold">
          Cart is empty, <span class="text-red-600">start adding to cart!</span>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="
      $store.state.loading === true && $store.state.isAuthenticated === true
    "
    wire:loading
    class="overflow-hidden py-36 mt-3 opacity-75 flex flex-col items-center justify-center"
  >
    <div
      class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-36 w-36 mb-4"
    ></div>
  </div>

  <div v-if="$store.state.isAuthenticated === true">
    <CartItems
      :cartItems="cartItems"
      :countCartItems="countCartItems"
      :deleteCartItem="deleteCartItem"
      :nextpage="nextpage"
      :currentpage="currentpage"
    />
  </div>

  <div v-if="$store.state.loading === false">
    <div class="pt-32 pb-20" v-show="currentpage === 1">
      <div class="font-bold text-center text-xl mb-3">Checkout</div>
      <div class="flex justify-center">
        <form
          @submit.prevent="submitForPayment"
          class="bg-gradient-to-tl from-gray-800 via-black to-gray-900 w-2/5 shadow-2xl py-3 rounded-lg"
        >
          <div class="w-full px-3">
            <label
              class="block text-white uppercase tracking-wide text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Address
            </label>
            <input
              v-model="address"
              class="appearance-none block w-full rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter Address"
            />
          </div>
          <div class="w-full px-3 mt-4">
            <label
              class="block text-white uppercase tracking-wide text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Phone Number
            </label>
            <input
              v-model="phone_number"
              class="appearance-none block w-full rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter Address"
            />
          </div>
          <div class="w-full px-3 mt-4">
            <label
              class="block text-white uppercase tracking-wide text-xs font-bold mb-2"
              for="grid-last-name"
            >
              City <span class="text-red">*</span>
            </label>
            <input
              v-model="city"
              class="appearance-none block w-full rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter Address"
            />
          </div>
          <div class="w-full px-3 mt-4 text-center">
            <label
              class="block text-white uppercase tracking-wide text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Total Amount to be paid
            </label>
            <div class="text-white font-bold text-xl">
              NGN {{ $store.state.grandTotal }}
            </div>
          </div>
          <div class="mt-4 text-center">
            <button class="text-white bg-green-600 rounded-md px-3 py-2">
              Proceed to pay
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <Footer class="mt-10" />
</template>

<script>
import Navbar from "../components/publicnavbar.vue";
import Footer from "../components/publicfooter.vue";
import { useToast } from "vue-toastification";
import { ref, onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import CartItems from "../components/CartItems.vue";
export default {
  components: { Navbar, Footer, CartItems },
  setup() {
    const cartItems = ref([]);
    const toast = useToast();
    const currentStep = ref(0);
    const inputQuantity = ref("");
    const store = useStore();
    const currentpage = ref(0);
    const city = ref("");
    const phone_number = ref("");
    const address = ref("");

    const submitForPayment = async () => {
      store.dispatch("submitPayment", {
        city: city.value,
        phone_number: phone_number.value,
        address_one: address.value,
      });
    };

    watchEffect(() => {
      if (store.state.successResponse != null) {
        toast.success(store.state.successResponse, {
          timeout: 10000,
        });
        store.dispatch("nullSuccessResponse");
      }

      if (store.state.errorResponse != null) {
        toast.success(store.state.errorResponse, {
          timeout: 10000,
        });
        store.dispatch("nullErrorResponse");
      }
    });

    const emptyCart = async () => {
      store.dispatch("emptyCart");
    };

    const deleteCartItem = async (id) => {
      store.dispatch("deleteCarItem", id);
    };

    const countCartItems = computed(() => store.getters.getCartLength ?? 0);

    onMounted(countCartItems, store.dispatch("getCartItems"));

    const nextpage = () => {
      currentpage.value++;
    };

    const previouspage = () => {
      currentpage.value--;
    };

    return {
      cartItems,
      currentStep,
      inputQuantity,
      currentpage,
      nextpage,
      previouspage,
      submitForPayment,
      city,
      phone_number,
      address,
      emptyCart,
      deleteCartItem,
      countCartItems,
    };
  },
};
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
