<template>
  <div class="bg-white mt-6">
    <div class="py-2">
      <div class="">
        <div class="text-center font-semibold">
          <span class="capitalize">All Pizzas</span>
        </div>
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div class="" v-for="pizza in $store.state.getAllPizza" :key="pizza.id">
          <div
            class="bg-gray-200 w-64 mx-3 my-2 py-3 px-2 rounded-md shadow-lg"
          >
            <div>
              <span class="font-semibold">Name: </span>{{ pizza?.name }}
            </div>
            <div>
              <span class="font-semibold mt-3">Price: </span>{{ pizza?.price }}
            </div>
            <div>
              <span class="font-semibold mt-3">Description: </span>
              {{ pizza?.description }}
            </div>
            <div>
              <span class="font-semibold mt-3">Variant: </span>
              {{ pizza?.variant?.name }}
            </div>
            <div class="text-center">
              <router-link
                :to="`/user/edit-pizza/${pizza.id}`"
                class="bg-green-700 text-white mr-3 mt-3 p-2 rounded-md"
              >
                <font-awesome-icon icon="pen" class="mr-2" /> Edit
              </router-link>
              <button
                @click="getID(pizza.id)"
                class="bg-red-700 text-white mt-3 p-2 rounded-md"
              >
                <font-awesome-icon type="button" class="mr-2" icon="trash" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="my-3 text-center"
        v-if="
          $store.state.allPizzas?.length === 0 && $store.state.loading === false
        "
      >
        No content to display
      </div>
    </div>
  </div>

  <DeleteModal :active="active" :deletePizza="deletePizza" :destroy="destroy" />
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import DeleteModal from "../../components/DeleteModal.vue";
import { useStore } from "vuex";
export default {
  components: {
    DeleteModal,
  },
  setup() {
    const store = useStore();
    const allPizzas = ref("");
    const active = ref(false);
    const currentID = ref("");
    const toast = useToast();

    const getAllPizzas = async (text = "") => {
      await store.dispatch("getAllPizza", text);
    };

    const getID = (id) => {
      currentID.value = id;
      active.value = true;
    };

    const deletePizza = async () => {
      await axios.delete(`pizzas/${currentID.value}`);

      active.value = false;

      getAllPizzas();

      toast.success("Pizza deleted successfully");
    };

    const destroy = () => {
      active.value = false;
    };

    onMounted(getAllPizzas());

    return {
      allPizzas,
      getAllPizzas,
      active,
      destroy,
      currentID,
      getID,
      deletePizza,
    };
  },
};
</script>

<style>
.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}

.fade-leave-to {
  opacity: 0;
}

.animodal-enter-active,
.animodal-leave-active {
  transition: opacity 0.2s ease 0s;
}
.animodal-enter-active .animodal-inner,
.animodal-leave-active .animodal-inner {
  transition: transform 0.3s ease 0.1s, opacity 0.2s ease 0.1s;
}
.animodal-enter-active .modal-close,
.animodal-leave-active .modal-close {
  transition: transform 0.2s ease 0.2s, opacity 0.2s ease 0.2s;
}
.animodal-leave-active .animodal-inner {
  transition: transform 0.2s ease 0s, opacity 0.2s ease 0s;
}
.animodal-enter,
.animodal-leave-to {
  opacity: 0;
}
.animodal-enter .animodal-inner,
.animodal-leave-to .animodal-inner {
  transform: scale(0.95);
  opacity: 0;
}
.animodal-enter .modal-close,
.animodal-leave-to .modal-close {
  opacity: 0;
  transform: scale(0.95);
}
</style>
