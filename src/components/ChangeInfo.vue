<template>
  <div class="bg-white rounded-md p-3">
    <div class="font-bold text-center">Profle View</div>
    <div
      v-if="$store.state.loading === true"
      wire:loading
      class="overflow-hidden mt-3 opacity-75 flex flex-col items-center justify-center"
    >
      <div
        class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
      ></div>
    </div>
    <form
      @submit.prevent="updateInfo"
      v-if="$store.state.loading === false"
      class="w-full mt-2"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 -mx-3 mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            First Name
          </label>
          <input
            v-model="first_name"
            class="appearance-none border-2 border-gray-200 block w-full rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Jane"
          />
        </div>
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Last Name
          </label>
          <input
            v-model="last_name"
            class="appearance-none block w-full border-2 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Doe"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Middle Name
          </label>
          <input
            v-model="middle_name"
            class="appearance-none block w-full border-2 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Doe"
          />
        </div>
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Email
          </label>
          <input
            v-model="email"
            class="appearance-none block w-full border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
      </div>
      <div class="text-center">
        <button
          class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const first_name = ref("");
    const last_name = ref("");
    const middle_name = ref("");
    const email = ref("");

    const updateInfo = async () => {
      await store.dispatch("updateUserInfo", {
        first_name: first_name.value,
        last_name: last_name.value,
        middle_name: middle_name.value,
        email: email.value,
      });
    };

    const user = computed(() => store.state.user);

    onMounted(async () => {
      store.dispatch("callLoggedInUser");

      first_name.value = user.value.first_name;
      last_name.value = user.value.last_name;
      middle_name.value = user.value.middle_name;
      email.value = user.value.email;
    });

    return {
      store,
      first_name,
      last_name,
      middle_name,
      email,
      updateInfo,
      user,
    };
  },
};
</script>

<style></style>
