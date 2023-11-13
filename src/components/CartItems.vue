<template>
  <div>
    <div
      class="mb-20"
      v-for="pizza in $store.state.cartItems"
      :key="pizza"
      v-show="currentpage === 0"
    >
      <div
        class="pt-24 lg:px-16 grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1"
      >
        <div
          class="flex justify-between bg-gray-100 py-2 px-3 rounded-md m-2 hover:bg-blue-200"
          v-for="thepizza in pizza.items"
          :key="thepizza"
        >
          <span> <img class="h-40 w-60" :src="thepizza.image" alt="" /></span>
          <span class="flex cursor-pointer">
            <span class="ml-3 mt-1 flex-col flex">
              <span class="font-semibold text-xl">{{
                thepizza.pizza_name
              }}</span>
              <div class="font-semibold mt-3 mr-1 text-xl">
                <span class="text-xs text-gray-600">NGN</span
                >{{ thepizza.price }}
              </div>
              <div class="mt-3">
                <span class="mr-2 text-xs">Qty</span>
                <input
                  class="w-10 text-center"
                  disabled
                  v-model="thepizza.quantity"
                  type="number"
                  name=""
                  id=""
                />
              </div>
              <div class="mt-3">
                <span class="mr-1 text-xs">Total:</span>
                <span class="font-semibold">{{ pizza.grand_total }}</span>
              </div>
            </span>
          </span>
          <span
            ><button
              @click="deleteCartItem(thepizza.id)"
              class="bg-red-700 rounded-full mt-5 py-3 px-5 text-white font-bold"
            >
              x
            </button></span
          >
        </div>
      </div>
      <div
        class="flex justify-center text-white mb-7"
        v-if="countCartItems > 0"
      >
        <button
          @click="nextpage"
          class="flex justify-between w-96 bg-green-700 rounded-lg px-6 py-2 font-semibold"
        >
          <div>
            <div>Grand Total</div>
            <div class="text-xl">
              <span class="text-xs mr-1">NGN</span>{{ pizza.grand_total }}
            </div>
          </div>
          <div class="flex">
            <div class="text-2xl mt-2">Proceed</div>
            <span class="mt-3 ml-2">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </span>
          </div>
        </button>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  props: {
    deleteCartItem: Function,
    countCartItems: Number,
    nextpage: Function,
    currentpage: Number,
  },
  // setup() {
  //   console.log(props.currentpage);
  // },
};
</script>

<style></style>
