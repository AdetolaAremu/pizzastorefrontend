<template>
  <Navbar />
  <div
    class="pt-20 bg-gradient-to-tl from-gray-800 via-black to-gray-900 w-full"
  >
    <div
      class="mt-24 text-white flex justify-between lg:flex-row md:flex-row flex-col px-5 md:10 lg:px-32 pb-16"
    >
      <div class="fade-in one">
        <div class="font-bold text-4xl lg:text-6xl">
          Order<span class="text-red-700"> Tasty Pizza</span><br />
          at your finger tips<br />
          <span class="text-red-700">anytime, anywhere!</span>
        </div>
        <div class="text-gray-400 font-semibold mt-5">
          Start adding your preferred pizza variant to cart today,
          <br />
          it will be delivered in a jiffy.
        </div>
        <div class="mt-5">
          <router-link to="/login">
            <button
              class="bg-red-700 text-white px-8 py-3 rounded-full shadow-2xl font-semibold hover:bg-white hover:text-red-700"
            >
              Get Started
            </button>
          </router-link>
        </div>
      </div>
      <div class="animate-bounce mt-16">
        <img class="lg:h-96 h-60" src="../assets/images/bg_1.png" alt="" />
      </div>
    </div>
  </div>

  <div class="my-5 lg:px-20">
    <div class="py-5 text-center text-black text-3xl font-bold">
      <span class="text-red-500">Explore</span> our exquisite pizza
      <span class="text-red-500">variants</span>
    </div>

    <div v-if="$store.state.loading === true">
      <div
        v-if="$store.state.loading === true"
        wire:loading
        class="overflow-hidden py-5 mt-3 opacity-75 flex flex-col items-center justify-center"
      >
        <div
          class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16 mb-4"
        ></div>
      </div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-5 lg:px-1 smallerscreen"
    >
      <div
        class="flex mt-2"
        v-for="(pizza, index) in $store.state.getFeaturedPizza"
        :key="index"
      >
        <img class="h-60 w-48" :src="pizza.images.main" alt="" />
        <div
          class="bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-60 w-48"
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
            <div
              class="text-yellow-700 font-bold text-lg -mt-6 md:-mt-0 lg:-mt-0"
            >
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
              class="bg-red-700 text-white rounded-full py-1 px-3 hover:bg-white hover:text-red-700 text-xs lg:text-base"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <HomeModal :active="active" :destroy="destroy" />

  <MainHomeCard />

  <Footer />
</template>
<script>
import Navbar from "../components/publicnavbar.vue";
import Footer from "../components/publicfooter.vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { ref } from "@vue/reactivity";
import { onMounted, watchEffect } from "@vue/runtime-core";
import HomeModal from "../components/HomeModal.vue";
import MainHomeCard from "../components/MainHomeCard.vue";
export default {
  components: { Navbar, Footer, HomeModal, MainHomeCard },
  setup() {
    const toast = useToast();
    const store = useStore();
    const active = ref(false);
    const makeModalActive = ref(false);

    const closeModal = () => {
      makeModalActive.value = false;
    };

    const destroy = () => {
      active.value = false;
    };

    const getAllPizzas = async () => {
      store.dispatch("getAllFeaturedPizza");
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

    const addToCart = async (pizza) => {
      store.dispatch("addToCart", {
        pizza_id: pizza.id,
        pizza_name: pizza.name,
        price: pizza.price,
      });
    };

    onMounted(getAllPizzas());

    return {
      getAllPizzas,
      addToCart,
      active,
      destroy,
      makeModalActive,
      closeModal,
    };
  },
};
</script>

<style>
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fade-in.one {
  -webkit-animation-delay: 2s;
  -moz-animation-delay: 2s;
  animation-delay: 2s;
}

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
