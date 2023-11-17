<template>
  <div>
    <div
      class="bg-gradient-to-tl from-gray-800 via-black to-gray-900 w-full mt-16 mb-10 px-5 overflow-hidden"
    >
      <div class="pt-16 pb-10 text-white font-semibold text-3xl text-center">
        Our <span class="text-red-700">Services</span> at a glance
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 pb-24">
        <div
          class="text-center hover:bg-gray-900 py-2 cursor-pointer"
          data-aos="fade-right"
        >
          <div class="flex justify-center">
            <img src="https://img.icons8.com/officel/80/000000/scooter.png" />
          </div>
          <div class="text-gray-400 text-3xl my-12 font-semibold">
            Fast Delivery
          </div>
          <div class="text-white">
            We deliver pizza to your doorstep with lightening speed,<br />
            maybe not lightening speed, but you get the point. Give us <br />a
            try and you will absolutely love our service.
          </div>
        </div>

        <div class="text-center hover:bg-gray-900 py-2 cursor-pointer">
          <div class="flex justify-center">
            <img
              class=""
              src="https://img.icons8.com/external-konkapp-flat-konkapp/80/000000/external-pizza-seafood-konkapp-flat-konkapp.png"
            />
          </div>
          <div class="text-gray-400 text-3xl my-12 font-semibold">
            Tasty Pizza
          </div>
          <div class="text-white">
            we offer you the best and most tasty pizza, we have <br />varieties
            of pizzas, you can choose from our menu and be assured of
            satisfaction<br />
          </div>
        </div>

        <div
          class="text-center hover:bg-gray-900 py-2 cursor-pointer"
          data-aos="fade-left"
        >
          <div class="flex justify-center">
            <img
              src="https://img.icons8.com/external-victoruler-flat-gradient-victoruler/100/000000/external-time-food-and-delivery-victoruler-flat-gradient-victoruler.png"
            />
          </div>
          <div class="text-gray-400 text-3xl mt-8 font-semibold">
            24/7 Customer Service
          </div>
          <div class="text-white" style="margin-top: 44px">
            We are always here to help you, if you have any questions or <br />
            concerns, we are always here to help you. Our services run 24/7
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex justify-between lg:flex-row md:flex-row flex-col px-5 md:10 lg:px-32"
    >
      <div data-aos="fade-up">
        <div class="text-4xl lg:text-6xl font-bold text-gray-800 mt-6">
          Our Customers <br />
          love what we do
        </div>
        <div class="mt-10 font-semibold">
          We have served thousands of customers and<br />
          who have good things to say about us
        </div>
        <button
          class="border-gray-300 mt-10 w-64 rounded-md px-5 py-5 text-gray-800 shadow-2xl text-center font-bold hover:bg-red-700 hover:text-white border transition duration-300 ease-in-out delay-150"
        >
          Read more success stories
        </button>
      </div>

      <div class="mb-6 pt-10 lg:pt-0">
        <div
          class="border border-gray-300 mb-3 shadow-2xl flex justify-between rounded w-80 lg:w-96 px-3 cursor-pointer hover:scale-110 transform transition duration-500 reducewidth"
        >
          <div class="py-2">
            <div class="text-5xl text-red-400">
              <font-awesome-icon icon="quote-left" />
            </div>
            <div>
              I got my pizza delivered to me within 30minutes, recommended.
            </div>
            <div class="font-bold text-gray-800 text-lg">Bella Dan</div>
          </div>
          <img
            class="h-20 mt-14 lg:mt-5 md:mt-5 rounded-full"
            src="../assets/images/testi.webp"
            alt=""
          />
        </div>
        <div
          class="border border-gray-300 mb-3 shadow-2xl flex justify-between rounded w-80 lg:w-96 px-3 cursor-pointer hover:scale-110 transform transition duration-500 reducewidth"
        >
          <div class="py-2">
            <div class="text-5xl text-red-400">
              <font-awesome-icon icon="quote-left" />
            </div>
            <div>
              I still can't believe I got a pizza this good in record time!
            </div>
            <div class="font-bold text-gray-800 text-lg">Bisi Jola</div>
          </div>
          <img
            class="h-20 mt-14 lg:mt-5 md:mt-5 rounded-full"
            src="../assets/images/testi2.webp"
            alt=""
          />
        </div>
        <div
          class="border border-gray-300 mb-3 shadow-2xl flex justify-between rounded w-80 lg:w-96 px-3 cursor-pointer hover:scale-110 transform transition duration-500 reducewidth"
        >
          <div class="py-2">
            <div class="text-5xl text-red-400">
              <font-awesome-icon icon="quote-left" />
            </div>
            <div>
              The pizza tastes good, looks nice and also delivered fast.
            </div>
            <div class="font-bold text-gray-900 text-lg">Jessie Jay</div>
          </div>
          <img
            class="h-20 mt-14 lg:mt-5 md:mt-5 rounded-full"
            src="../assets/images/testi3.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
