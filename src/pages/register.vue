<template>
  <Navbar />
  <div
    class="bg-gradient-to-tl from-gray-800 via-black to-gray-900 h-full lg:h-screen"
  >
    <div class="font-bold text-2xl text-center text-white mb-5 pt-32">
      Register
    </div>
    <div class="flex justify-center pb-12">
      <div class="w-3/5">
        <form @submit.prevent="registerUser" class="w-full mt-5 px-2">
          <div class="grid grid-cols-1 lg:grid-cols-2 -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              >
                First Name
              </label>
              <input
                v-model="first_name"
                class="appearance-none block w-full border border-purple-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Jane"
              />
              <div
                class="text-red-600 text-sm"
                v-if="$store.state.validationErrors.first_name"
              >
                {{ $store.state.validationErrors.first_name[0] }}
              </div>
            </div>
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Last Name
              </label>
              <input
                v-model="last_name"
                class="appearance-none block w-full border border-purple-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Doe"
              />
              <div
                class="text-red-600 text-sm"
                v-if="$store.state.validationErrors.last_name"
              >
                {{ $store.state.validationErrors.last_name[0] }}
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Middle Name
              </label>
              <input
                v-model="middle_name"
                class="appearance-none block w-full border border-purple-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Doe"
              />
              <div
                class="text-red-600 text-sm"
                v-if="$store.state.validationErrors.middle_name"
              >
                {{ $store.state.validationErrors.middle_name[0] }}
              </div>
            </div>
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                for="grid-password"
              >
                Email
              </label>
              <input
                v-model="email"
                class="appearance-none block w-full border border-purple-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                placeholder="e.g doe@mail.com"
              />
              <div
                class="text-red-600 text-sm"
                v-if="$store.state.validationErrors.email"
              >
                {{ $store.state.validationErrors.email[0] }}
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Password
              </label>
              <input
                v-model="password"
                :class="`${
                  $store.state.validationErrors.password != ''
                    ? 'border border-red-500'
                    : ''
                }`"
                class="appearance-none block w-full border border-purple-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                placeholder="******"
              />
              <div
                class="text-red-600 text-sm"
                v-if="$store.state.validationErrors.password"
              >
                {{ $store.state.validationErrors.password[0] }}
              </div>
            </div>
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                for="grid-password"
              >
                Confirm Password
              </label>
              <input
                v-model="confirm_password"
                class="appearance-none block w-full border border-purple-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                placeholder="*****"
              />
              <div
                class="text-red-600 text-sm"
                v-if="$store.state.validationErrors.confirm_password"
              >
                {{ $store.state.validationErrors.confirm_password[0] }}
              </div>
            </div>
          </div>
          <div class="text-center">
            <button
              class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/publicnavbar.vue";
import { ref } from "@vue/reactivity";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  components: { Navbar },
  setup() {
    const first_name = ref("");
    const last_name = ref("");
    const middle_name = ref("");
    const email = ref("");
    const password = ref("");
    const confirm_password = ref("");
    const router = useRouter("");
    const validationErrors = ref("");
    const toast = useToast();

    const registerUser = async () => {
      axios
        .post("register", {
          first_name: first_name.value,
          last_name: last_name.value,
          middle_name: middle_name.value,
          email: email.value,
          password: password.value,
          confirm_password: confirm_password.value,
        })
        .then(() => {
          router.push("/login");
          toast.success("Registration successful, you may now login", {
            timeout: 10000,
          });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            validationErrors.value = error.response.data.errors;
          }
        });
    };

    return {
      first_name,
      last_name,
      middle_name,
      email,
      password,
      confirm_password,
      registerUser,
      validationErrors,
    };
  },
};
</script>

<style></style>
