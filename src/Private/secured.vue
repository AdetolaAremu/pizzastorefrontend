<template>
	<Navbar />
  <!-- <SideBar /> -->
	<!-- <SidebarMenu :menu="menu" /> -->
	<div class="pt-24 grid grid-cols-1 lg:grid-cols-3 px-24">
		<router-link to="/user/dashboard" class="bg-gradient-to-br from-gray-500 via-gray-800 to-gray-900 px-20 py-10 text-center text-white mr-2 font-bold text-3xl rounded-md">
			Dashboard
		</router-link>
		<router-link to="/user/order-history" class="bg-gradient-to-br from-gray-500 via-gray-800 to-gray-900 px-20 py-10 text-center text-white mr-2 font-bold text-3xl rounded-md">
			Order History
		</router-link>
		<router-link to="/user/profile" class="bg-gradient-to-br from-gray-500 via-gray-800 to-gray-900 px-20 py-10 text-center text-white mr-2 font-bold text-3xl rounded-md">
			Profile
		</router-link>
	</div>
  <router-view />
	<Footer />


	<!-- <div class="pt-40">
		name it overview...
		total amount spent
		total orders
		pending orders
	</div> -->
</template>

<script>
// import { ref } from '@vue/reactivity';
// import SideBar from '../Private/components/sidebar.vue';
import Navbar from './components/privatenavbar.vue';
import Footer from '../components/publicfooter.vue';
// import { SidebarMenu } from 'vue-sidebar-menu'
export default {
  components:{ Navbar, Footer },
  setup(){
   

    return {  }
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