<template>
  <Navbar />
  <div class="pt-24 px-16">
    
    <div class="flex justify-between">
      <input type="text" placeholder="Input search text here e.g french pizza" 
        class="border-2 border-purple-500 py-2 rounded-md w-72 mb-3"
      >
      <select name="" class="border-2 border-purple-500 rounded-md w-72">
        <option disabled selected>Select Order</option>
        <option>Order by Highest Pizza Price</option>
        <option>Order by Lowest Pizza Price</option>
      </select>
    </div>

    <div class="grid grid-cols-3">
      <div class="flex mt-2">
        <img class="h-60 w-48" src="../assets/images/pizza-2.jpg" alt="">
        <div class=" bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-60 w-52">
          <div class="font-semibold text-lg text-center mt-3 mb-2 text-white">Lagos Pizza</div>
          <div class="px-3 text-gray-400">
            This is the pizza variant you will love to have and we say
            and we try thats the shit we post here
          </div>
          <div class="mt-5 flex justify-between px-3">
            <div class="text-yellow-700 font-bold text-lg">#1500</div>
            <button class="bg-red-700 text-white rounded-full py-1 px-3">Add to cart</button>
          </div>
        </div>
      </div>

      <div class="flex mt-2">
        <img class="h-60 w-48" src="../assets/images/pizza-2.jpg" alt="">
        <div class=" bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-60 w-52">
          <div class="font-semibold text-lg text-center mt-3 mb-2 text-white">Lagos Pizza</div>
          <div class="px-3 text-gray-400">
            This is the pizza variant you will love to have and we say
            and we try thats the shit we post here
          </div>
          <div class="mt-5 flex justify-between px-3">
            <div class="text-yellow-700 font-bold text-lg">#1500</div>
            <button class="bg-red-700 text-white rounded-full py-1 px-3">Add to cart</button>
          </div>
        </div>
      </div>

      <div class="flex mt-2">
        <img class="h-60 w-48" src="../assets/images/pizza-2.jpg" alt="">
        <div class=" bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-60 w-52">
          <div class="font-semibold text-lg text-center mt-3 mb-2 text-white">Lagos Pizza</div>
          <div class="px-3 text-gray-400">
            This is the pizza variant you will love to have and we say
            and we try thats the shit we post here
          </div>
          <div class="mt-5 flex justify-between px-3">
            <div class="text-yellow-700 font-bold text-lg">#1500</div>
            <button class="bg-red-700 text-white rounded-full py-1 px-3">Add to cart</button>
          </div>
        </div>
      </div>

      <div class="flex mt-2">
        <img class="h-60 w-48" src="../assets/images/pizza-2.jpg" alt="">
        <div class=" bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-60 w-52">
          <div class="font-semibold text-lg text-center mt-3 mb-2 text-white">Lagos Pizza</div>
          <div class="px-3 text-gray-400">
            This is the pizza variant you will love to have and we say
            and we try thats the shit we post here
          </div>
          <div class="mt-5 flex justify-between px-3">
            <div class="text-yellow-700 font-bold text-lg">#1500</div>
            <button class="bg-red-700 text-white rounded-full py-1 px-3">Add to cart</button>
          </div>
        </div>
      </div>

      <div class="flex mt-2">
        <img class="h-60 w-48" src="../assets/images/pizza-2.jpg" alt="">
        <div class=" bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-60 w-52">
          <div class="font-semibold text-lg text-center mt-3 mb-2 text-white">Lagos Pizza</div>
          <div class="px-3 text-gray-400">
            This is the pizza variant you will love to have and we say
            and we try thats the shit we post here
          </div>
          <div class="mt-5 flex justify-between px-3">
            <div class="text-yellow-700 font-bold text-lg">#1500</div>
            <button class="bg-red-700 text-white rounded-full py-1 px-3">Add to cart</button>
          </div>
        </div>
      </div>

      <div class="flex mt-2">
        <img class="h-60 w-48" src="../assets/images/pizza-2.jpg" alt="">
        <div class=" bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-60 w-52">
          <div class="font-semibold text-lg text-center mt-3 mb-2 text-white">Lagos Pizza</div>
          <div class="px-3 text-gray-400">
            This is the pizza variant you will love to have and we say
            and we try thats the shit we post here
          </div>
          <div class="mt-5 flex justify-between px-3">
            <div class="text-yellow-700 font-bold text-lg">#1500</div>
            <button class="bg-red-700 text-white rounded-full py-1 px-3">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from '../components/publicnavbar.vue';
import Footer from '../components/publicfooter.vue';
export default {
  components:{ Navbar, Footer }
}
</script>

<style>

</style>