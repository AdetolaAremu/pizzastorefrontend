<template>
  <div class="bg-white mt-6">
    <div class="py-2">
      <div class="">
        <div class="text-center font-semibold">
          <span class="capitalize">All Pizzas</span>
        </div>
      </div>
      <div v-if="loading === true" wire:loading class="overflow-hidden py-36 mt-3 opacity-75 flex flex-col items-center justify-center">
        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-36 w-36 mb-4"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div class="" v-for="pizza in allPizzas" :key="pizza.id">
          <div class="bg-gray-200 w-64 mx-3 my-2 py-3 px-2 rounded-md shadow-lg">
            <div><span class="font-semibold">Name: </span>{{ pizza?.name }}</div>
            <div><span class="font-semibold mt-3">Price: </span>{{ pizza?.price }}</div>
            <div><span class="font-semibold mt-3">Description: </span> {{ pizza?.description }}</div>
            <div><span class="font-semibold mt-3">Variant: </span> {{ pizza?.variant?.name }}</div>
            <div class="text-center">
              <router-link :to="`/user/edit-pizza/${pizza.id}`" class="bg-green-700 text-white mr-3 mt-3 p-2 rounded-md">
                <font-awesome-icon  icon="pen" class="mr-2" /> Edit
              </router-link>
              <button @click="getID(pizza.id)" class="bg-red-700 text-white mt-3 p-2 rounded-md">
                <font-awesome-icon type="button" class="mr-2" icon="trash" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="my-3 text-center" v-if="allPizzas.length === 0 && loading === false">
        No content to display
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-16 h-16 flex items-center text-purple-500 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <h2 class="text-2xl font-bold py-4">Are you sure?</h2>
                <p class="text-md text-gray-500 px-8">
                  Are you really want to delete this pizza?
                </p>
              </div>
              <div class="p-3 mt-2 text-center space-x-4 md:block">
                <button @click="deletePizza"
                  class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-red-700 rounded-md hover:shadow-lg hover:bg-gray-100"
                >
                  Confirm
                </button>
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
          <div class="text-white text-lg p-6"><i class="material-icons">close</i></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
import { useToast } from 'vue-toastification'
export default {
  setup(){
    const allPizzas = ref('')
    const loading = ref(false)
    const active = ref(false)
    const currentID = ref('')
    const toast = useToast();

    const getAllPizzas = async (text = '') => {
      loading.value = true

      const response  = await axios.get(`all-pizzas?s=${text}`)
      
      allPizzas.value = response.data

      loading.value = false
    }

    const getID = (id) => {
      currentID.value = id
      active.value = true
    }

    const deletePizza = async () => {
      await axios.delete(`pizzas/${currentID.value}`)

      active.value = false

      getAllPizzas()

      toast.success('Pizza deleted successfully')
    }

    const destroy = () => {
      active.value = false
    }

    onMounted(getAllPizzas())

    return { allPizzas, getAllPizzas, loading, active, destroy, currentID, getID, deletePizza }
  }
}
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