<template>
  <Navbar />
  <div class="pt-24 px-8 lg:px-16 smallerscreen">
    <div class="">
      <input
        type="text"
        placeholder="Input search text here e.g french pizza"
        class="border-2 border-purple-500 py-2 rounded-md w-60 lg:w-72 xl:lg-72 mb-3"
        @keyup="filterProduct($event.target.value)"
      />
    </div>

    <div
      v-if="$store.state.loading === true"
      wire:loading
      class="overflow-hidden py-36 mt-3 opacity-75 flex flex-col items-center justify-center"
    >
      <div
        class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-36 w-36 mb-4"
      ></div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-10"
      v-if="$store.state.loading === false"
    >
      <div
        class="flex mt-2 mr-0 md:mr-2"
        v-for="(pizza, index) in pizzaitems"
        :key="index"
      >
        <img class="h-60 w-48" :src="pizza.images.main" alt="" />
        <div
          class="bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-60 w-52"
        >
          <div
            class="font-semibold text-lg text-center mt-3 mb-2 text-white smalltitle"
          >
            {{ pizza.name }}
          </div>
          <div
            class="px-3 text-gray-400 text-xs md:text-base lg:text-base textverysmall"
          >
            {{ pizza.description }}
          </div>
          <div
            class="mt-5 flex justify-between flex-col md:flex-row lg:flex-row px-3"
          >
            <div class="text-yellow-700 font-bold text-sm lg:text-lg">
              <span class="text-xs lg:text-sm">#</span>{{ pizza.price }}
            </div>
            <button
              v-if="$store.state.isAuthenticated === true"
              class="bg-red-700 text-white rounded-full py-1 px-3 hover:bg-white hover:text-red-700 text-xs lg:text-base"
              @click="addToCart(pizza)"
            >
              Add to cart
            </button>
            <button
              v-if="$store.state.isAuthenticated === false"
              @click="active = true"
              class="bg-red-700 text-white rounded-full py-1 px-3 hover:bg-white hover:text-red-700"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <HomeModal :active="active" :destroy="destroy" />

  <Footer />
</template>

<script>
import Navbar from "../components/publicnavbar.vue";
import Footer from "../components/publicfooter.vue";
import { ref } from "@vue/reactivity";
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import debounce from "lodash/debounce";
import HomeModal from "../components/HomeModal.vue";
export default {
  components: { Navbar, Footer, HomeModal },
  setup() {
    const pizzaitems = ref("");
    const currentPizzaId = ref("");
    const store = useStore();
    const searchProduct = ref("");
    const active = ref(false);
    const runCheck = ref("");

    const destroy = () => {
      active.value = false;
    };

    const getAllPizzas = async (text = "") => {
      store.dispatch("getAllPizza", text);
    };

    const filterProduct = debounce((text) => {
      getAllPizzas(text);
    }, 800);

    const addToCart = async (pizza) => {
      store.dispatch("addToCart", {
        pizza_id: pizza.id,
        pizza_name: pizza.name,
        price: pizza.price,
      });
      checkIDFromDatabase(pizza.id);
    };

    const checkIDFromDatabase = async (id) => {
      const response = await axios.get(`/carts/check/${id}`);
      runCheck.value = response.data;
    };

    onMounted(async () => await getAllPizzas());

    return {
      pizzaitems,
      getAllPizzas,
      addToCart,
      currentPizzaId,
      searchProduct,
      filterProduct,
      checkIDFromDatabase,
      active,
      destroy,
      runCheck,
    };
  },
};
</script>

<style>
@media screen and (max-width: 300px) {
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
    width: 16.7rem;
  }
}
</style>
