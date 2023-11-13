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
                  <button
                    @click="deletePizza"
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
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean,
    destroy: Function,
    deletePizza: Function,
  },
};
</script>

<style></style>
