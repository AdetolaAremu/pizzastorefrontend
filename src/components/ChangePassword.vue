<template>
  <div class="bg-white rounded-md mt-3">
    <div class="font-bold mt text-center pt-3">Edit Password</div>
    <form @submit.prevent="updatePassword" class="w-full mt-2 px-2">
      <div class="grid grid-cols-1 lg:grid-cols-3 -mx-3 mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Current Password
          </label>
          <input
            v-model="currentPassword"
            class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="password"
            placeholder="*********"
          />
          <div
            class="text-red-600 text-sm"
            v-if="$store.state.validationErrors?.current_password"
          >
            {{ $store.state.validationErrors?.current_password[0] }}
          </div>
        </div>
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >
            New Password
          </label>
          <input
            v-model="password"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="password"
            placeholder="*********"
          />
          <div
            class="text-red-600 text-sm"
            v-if="$store.state.validationErrors?.password"
          >
            {{ $store.state.validationErrors?.password[0] }}
          </div>
        </div>
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Confirm New Password
          </label>
          <input
            v-model="passwordConfirm"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="password"
            placeholder="*********"
          />
          <div
            class="text-red-600 text-sm"
            v-if="$store.state.validationErrors?.password_confirm"
          >
            {{ $store.state.validationErrors?.password_confirm[0] }}
          </div>
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
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const password = ref("");
    const currentPassword = ref("");
    const passwordConfirm = ref("");

    const updatePassword = async () => {
      await store.dispatch("updateUserPassword", {
        current_password: currentPassword.value,
        password: password.value,
        password_confirm: passwordConfirm.value,
      });
    };

    return {
      password,
      currentPassword,
      passwordConfirm,
      updatePassword,
    };
  },
};
</script>

<style></style>
