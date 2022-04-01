<template>
  <div class="bg-gradient-to-tl from-gray-800 via-black to-gray-900 w-full">
    <div class="lg:px-32 xl:px-32 px-10 py-10 flex-row lg:flex md:flex xl:flex justify-between">
      <div>
        <div class="font-bold text-gray-500 text-xl">About Peeza</div>
        <div class="text-white lg:w-44 mt-5 font-semibold">
          Peeza is a pizza web store app where you can order and take delivery 
        </div>
      </div>
      <div class="pt-3 lg:pt-0">
        <div class="font-bold text-gray-500 text-xl pr-4 lg:pr-0">Quicklinks</div>
        <div class="text-white lg:w-44 mt-5">
          <router-link to="/" class="font-semibold">Home</router-link>
        </div>
        <div class="text-white lg:w-44 mt-1">
          <router-link to="/store" class="font-semibold">Store</router-link>
        </div>
         <div class="text-white lg:w-44 mt-1">
          <a href="" class="font-semibold">GitHub</a>
        </div>
      </div>
      <div class="pt-3 lg:pt-0">
        <div class="font-bold text-gray-500 text-xl">Contact us</div>
        <div class="text-white lg:w-44 mt-5 font-semibold">
          55 Bailey street, Lagos street off Lagos state, Nigeria
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>