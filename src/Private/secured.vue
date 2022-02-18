<template>
	<Navbar />
 
	<div class="pt-24 px-24">
		<div class="font-semibold mt-10">Overview</div>
    <div class="mt-2 grid grid-cols-1 lg:grid-cols-3">
      <div class="bg-indigo-600 h-40 text-center text-white mr-2 font-bold text-xl rounded-md">
        Total Amount spent
      </div>
      <div class="bg-green-600 h-40 text-center text-white mr-2 font-bold text-xl rounded-md">
        Total Orders
      </div>
      <div class="bg-yellow-600 h-40 text-center text-white mr-2 font-bold text-xl rounded-md">
        Pending Orders
      </div>
    </div>
	</div>
  <router-view />
	<Footer />
</template>

<script>
import Navbar from './components/privatenavbar.vue';
import Footer from '../components/publicfooter.vue';
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex'
export default {
  components:{ Navbar, Footer },
  setup(){
		const store = useStore();

		const getUser = async () => {
			let response = await axios.get('user')

			await store.dispatch('getCurrentUser', response.data.data)
		}

		onMounted(getUser())

    return { getUser }
  }
}
</script>

<style>
.v-sidebar-menu , .vsm--title {
	padding-top: 15px;
}

.v-sidebar-menu .vsm--title>span:first-child {
	margin-top: -12px;
}
</style>