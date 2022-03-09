<template>

  <div class="relative min-h-screen md:flex" data-dev-hint="container">
    <input type="checkbox" id="menu-open" class="hidden" />

    <label for="menu-open" class="absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-100 text-gray-600 md:hidden" data-dev-hint="floating action button">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </label>

    <header class="bg-gray-600 text-gray-100 flex justify-between md:hidden" data-dev-hint="mobile menu bar">
      <a href="#" class="block p-4 text-white font-bold whitespace-nowrap truncate">
          Peeza
      </a>

      <label for="menu-open" id="mobile-menu-button" class="m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md">
          <svg id="menu-open-icon" class="h-6 w-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg id="menu-close-icon" class="h-6 w-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
      </label>
    </header>

    <aside id="sidebar" class="bg-gray-800 text-gray-100 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto" data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation">
      <div class="flex flex-col space-y-6" data-dev-hint="optional div for having an extra footer navigation">
        <router-link to="/" class="text-white flex items-center space-x-2 px-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span class="text-2xl font-extrabold whitespace-nowrap truncate">Peeza </span>
        </router-link>
        <nav data-dev-hint="main navigation">
          <router-link to="/user/dashboard" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              <span>Dashboard</span>
          </router-link>
          <router-link to="/user/order-history" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            <span>Order History</span>
          </router-link>
          <router-link to="/user/profile" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            <span>Profile</span>
          </router-link>
          <router-link to="/store" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            <span>Store</span>
          </router-link>
        </nav>
      </div>

      <nav data-dev-hint="second-main-navigation or footer navigation">
        <a href="#" class="block py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
          Github Frontend Repo
        </a>
        <a href="#" class="block py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
          Github Backend Repo
        </a>
      </nav>
    </aside>

    <main id="content" class="flex-1 p-6 lg:px-4 bg-gray-300">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between">
          <div>Home</div>
          <div class="relative">
            <a href="#" class="no-underline text-lg px-4 py-2 leading-none
             -ml-4 sm:mt-0 flex" @click="toggleNameDropDown"
            >
              Hi, {{ loggedInUser?.first_name }}
              <svg style="margin-top:2px" class="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" 
                stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
            <div v-if="toggleDropDown" class="absolute w-28 top-auto left-0 py-2 mt-2 rounded-lg border-gray-900 bg-white shadow-xl">
              <router-link to="/user/profile" class="text-sm text-gray-900 block px-4 py-2 cursor-pointer">Profile</router-link>
              <button @click="logout" class="text-sm bg-red-600 ml-2 rounded-sm text-white block px-4 py-2 cursor-pointer">Logout</button>
            </div>
          </div>
        </div>

        <div class="pt-2">
          <div class="font-semibold mt-3">Overview</div>
          <div class="mt-2 grid grid-cols-1 lg:grid-cols-3">
            <div class="bg-indigo-600 text-center text-white mr-2 my-3 lg:my-0 font-bold text-xl rounded-md">
              <div class="flex justify-between px-5 py-10">
                <div class="bg-white p-3 text-indigo-600 rounded-full">
                  <font-awesome-icon icon="chart-bar" style="font-size:50px" />
                </div>
                <div class="mt-3">
                  <div>Total Orders</div>
                  <div>{{ stats.total_orders }}</div>
                </div>
              </div>
            </div>
            <div class="bg-green-600 text-center text-white mr-2 my-3 lg:my-0 font-bold text-xl rounded-md">
              <div class="flex justify-between px-5 py-10">
                <div class="text-green-600 bg-white p-3 rounded-full">
                  <font-awesome-icon icon="check-circle" style="font-size:50px" />
                </div>
                <div class="mt-3">
                  <div>Successful Orders</div>
                  <div>{{ stats.successful_orders }}</div>
                </div>
              </div>
            </div>
            <div class="bg-yellow-600 text-center text-white mr-2 my-3 lg:my-0 font-bold text-xl rounded-md">
              <div class="flex justify-between px-5 py-10">
                <div class="bg-white text-yellow-600 p-3 rounded-full">
                  <font-awesome-icon icon="hourglass-end" style="font-size:50px" />
                </div>
                <div class="mt-3">
                  <div>Pending Orders</div>
                  <div>{{ stats.pending_orders }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <router-view />
      </div>
    </main>
</div>

 
	
	<Footer />
</template>

<script>
// import Navbar from './components/privatenavbar.vue';
import Footer from '../components/publicfooter.vue';
import axios from 'axios';
import { onMounted, ref } from '@vue/runtime-core';
import { useStore } from 'vuex'
export default {
  components:{ Footer },
  setup(){
		const store = useStore();
    const loggedInUser = ref()
    const toggleDropDown = ref(false)
    const stats = ref('')

		const getUser = async () => {
			let response = await axios.get('user')

			await store.dispatch('getCurrentUser', response.data.data)

      loggedInUser.value = response.data.data
		}

    const toggleNameDropDown = () => {
      toggleDropDown.value = !toggleDropDown.value
    }

    const getDashboard = async () => {
      const response = await axios.get('/orders/stats')
      stats.value = response.data
    }

    const logout = () => {
      localStorage.clear();

      window.location.href = '/login'

      // store.dispatch('changeAuthenticationToTrue')
    }

		onMounted(getUser(), getDashboard())

    return { getUser, loggedInUser, toggleDropDown, toggleNameDropDown, getDashboard, stats, logout}
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



#sidebar {
    --tw-translate-x: -100%;
}
#menu-close-icon {
    display: none;
}

#menu-open:checked ~ #sidebar {
    --tw-translate-x: 0;
}

#menu-open:checked ~ * #mobile-menu-button {
    background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
}

#menu-open:checked ~ * #menu-open-icon {
    display: none;
}

#menu-open:checked ~ * #menu-close-icon {
    display: block;
}

@media (min-width: 768px) {
  #sidebar {
      --tw-translate-x: 0;
  }
}
</style>