<template>
  <div id="Modal">
    <transition name="animodal">
      <div class="fixed inset-0 z-20" v-if="active">
        <div
          class="absolute inset-0 bg-black bg-opacity-75"
          @click="destroy"
        ></div>
        <div
          class="flex flex-col items-center justify-center w-screen h-screen"
        >
          <div class="relative animodal-inner">
            <div class="rounded bg-white overflow-hidden">
              <div>
                <div class="text-center p-3 flex-auto justify-center leading-6">
                  <font-awesome-icon
                    icon="frown"
                    class="text-8xl text-red-700"
                  />

                  <h2 class="text-2xl font-bold py-4">
                    Hi, only logged in user can add to cart
                  </h2>
                  <p class="text-md text-gray-500 px-8">
                    Please register
                    <router-link to="/register" class="text-red-600"
                      >here</router-link
                    >
                    cheers!
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
        <div
          class="animodal-inner absolute top-0 right-0 cursor-pointer"
          @click="destroy"
        >
          <div class="text-white text-lg p-6">
            <i class="material-icons"></i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean,
    destroy: Function,
  },
};
</script>

<style></style>
