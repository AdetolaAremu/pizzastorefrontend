<template>
  <div>
    <div class="bg-white mt-9 rounded-md">
      <div class="text-center py-3">Create new product</div>
      <form id="theform" @submit.prevent="createPizza" class="px-8 py-4">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="mt-2">
            <input
              v-model="name"
              type="text"
              class="py-2 px-3 rounded w-100 lg:w-96 border-2 border-green-500"
              placeholder="Product Name"
            />
            <div
              class="text-red-600 text-sm"
              v-if="$store.state.pizzaValidationErrors?.name"
            >
              {{ $store.state.pizzaValidationErrors?.name[0] }}
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="price"
              type="text"
              class="py-2 px-3 rounded w-100 lg:w-96 border-2 border-green-500"
              placeholder="Product Price"
            />
            <div
              class="text-red-600 text-sm"
              v-if="$store.state.pizzaValidationErrors?.price"
            >
              {{ $store.state.pizzaValidationErrors?.price[0] }}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 mt-3">
          <div class="mt-2">
            <select
              v-model="variant_id"
              name=""
              id=""
              class="rounded border-2 py-2 px-3 w-100 lg:w-96 border-green-500 capitalize"
            >
              <option value="" selected>Choose variant</option>
              <option
                class=""
                v-for="variants in $store.state.getVariants"
                :key="variants.id"
                :value="variants.id"
              >
                {{ variants.name }}
              </option>
            </select>
            <div
              class="text-red-600 text-sm"
              v-if="$store.state.pizzaValidationErrors?.variant_id"
            >
              {{ $store.state.pizzaValidationErrors?.variant_id[0] }}
            </div>
          </div>
          <div class="mt-2">
            <input
              type="file"
              @change="handleImageUpload"
              class="rounded w-100 lg:w-96 border-2 border-green-500"
            />
            <div
              class="text-red-600 text-sm"
              v-if="$store.state.pizzaValidationErrors?.image"
            >
              {{ $store.state.pizzaValidationErrors?.image[0] }}
            </div>
          </div>
        </div>
        <div class="mt-3">
          <textarea
            v-model="description"
            name=""
            id=""
            cols="50"
            rows="3"
            class="border-2 border-green-500 px-3"
            placeholder="Description"
          ></textarea>
          <div
            class="text-red-600 text-sm"
            v-if="$store.state.pizzaValidationErrors?.description"
          >
            {{ $store.state.pizzaValidationErrors?.description[0] }}
          </div>
        </div>
        <div class="text-center">
          <button
            v-if="$store.state.loading === false"
            class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800"
          >
            Post
          </button>
          <button
            v-if="$store.state.loading === true"
            class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800"
          >
            Posting...
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted, watchEffect } from "@vue/runtime-core";
// import axios from "axios";
import { useToast } from "vue-toastification";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const name = ref("");
    const description = ref("");
    const price = ref("");
    const variant_id = ref("");
    const image = ref("");
    const toast = useToast();

    const handleImageUpload = (e) => {
      image.value = e.target.files[0];
    };

    const createPizza = async () => {
      let formData = new FormData();

      formData.append("image", image.value);
      formData.append("description", description.value);
      formData.append("price", price.value);
      formData.append("variant_id", variant_id.value);
      formData.append("name", name.value);

      await store.dispatch("createPizza", formData);
    };

    watchEffect(() => {
      if (store.state.successResponse != null) {
        toast.success(store.state.successResponse, {
          timeout: 10000,
        });
        store.dispatch("nullSuccessResponse");
      }

      if (store.state.errorResponse != null) {
        toast.success(store.state.errorResponse, {
          timeout: 10000,
        });
        store.dispatch("nullErrorResponse");
      }
    });

    onMounted(async () => {
      await store.dispatch("getVariants");
    });

    return {
      name,
      description,
      price,
      variant_id,
      createPizza,
      handleImageUpload,
      image,
    };
  },
};
</script>

<style></style>
