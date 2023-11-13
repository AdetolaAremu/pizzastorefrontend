<template>
  <div class="relative min-h-screen md:flex" data-dev-hint="container">
    <Header />

    <DashboardSidebar :loggedInUser="loggedInUser" />

    <main id="content" class="flex-1 p-6 lg:px-4 bg-gray-300">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between">
          <div class="text-lg">{{ $router.currentRoute.value.name }}</div>
          <div class="relative">
            <a
              href="#"
              class="no-underline text-lg px-4 py-1 leading-none -ml-4 sm:mt-0 flex"
              @click="toggleNameDropDown"
              ref="targetToggle"
            >
              Hi, {{ loggedInUser?.first_name }}
              <svg
                style="margin-top: 2px"
                class="w-6 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </a>
            <div
              v-if="toggleDropDown"
              class="absolute w-28 top-auto left-0 py-2 mt-2 rounded-lg border-gray-900 bg-white shadow-xl"
            >
              <router-link
                to="/user/profile"
                class="text-sm text-gray-900 block px-4 py-2 cursor-pointer"
                >Profile</router-link
              >
              <button
                @click="logout"
                class="text-sm bg-red-600 ml-2 rounded-sm text-white block px-4 py-2 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <DashboardTopCard :stats="stats" />

        <router-view />
      </div>
    </main>
  </div>

  <Footer />
</template>

<script>
import Footer from "../components/publicfooter.vue";
import axios from "axios";
import { onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { onClickOutside } from "@vueuse/core";
import DashboardSidebar from "../components/DashboardSidebar.vue";
import DashboardTopCard from "../components/DashboardTopCard.vue";
import Header from "../components/Header.vue";
export default {
  components: { Footer, DashboardSidebar, DashboardTopCard, Header },
  setup() {
    const store = useStore();
    const loggedInUser = ref();
    const toggleDropDown = ref(false);
    const stats = ref({});
    const targetToggle = ref(null);

    onClickOutside(targetToggle, () => {
      toggleDropDown.value = false;
    });

    const getUser = async () => {
      let response = await axios.get("user");

      await store.dispatch("getCurrentUser", response.data.data);

      loggedInUser.value = response.data.data;
    };

    const toggleNameDropDown = () => {
      toggleDropDown.value = !toggleDropDown.value;
    };

    const getDashboard = async () => {
      const response = await axios.get("/orders/stats");
      stats.value = response.data;
    };

    const logout = () => {
      localStorage.clear();

      window.location.href = "/login";
    };

    onMounted(getUser(), getDashboard());

    return {
      getUser,
      loggedInUser,
      toggleDropDown,
      toggleNameDropDown,
      getDashboard,
      stats,
      logout,
      targetToggle,
    };
  },
};
</script>

<style>
.v-sidebar-menu,
.vsm--title {
  padding-top: 15px;
}

.v-sidebar-menu .vsm--title > span:first-child {
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
