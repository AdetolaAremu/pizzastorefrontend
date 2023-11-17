<template>
  <div>
    <div class="bg-white mt-9 rounded-md">
      <div class="text-center py-3">Create new product</div>
      <div
        v-if="loading === true"
        wire:loading
        class="overflow-hidden py-36 mt-3 opacity-75 flex flex-col items-center justify-center"
      >
        <div
          class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-36 w-36 mb-4"
        ></div>
      </div>
      <form
        v-if="crudLoading === false"
        @submit.prevent="updatePizza"
        class="px-8 py-4"
      >
        <div class="flex justify-between">
          <div>
            <input
              v-model="name"
              type="text"
              class="py-2 rounded lg:w-96 border border-blue-700"
              placeholder="Product Name"
            />
            <div
              class="text-red-600 text-sm"
              v-if="$store.state.pizzaValidationErrors?.name"
            >
              {{ $store.state.pizzaValidationErrors?.name[0] }}
            </div>
          </div>
          <div>
            <input
              v-model="price"
              type="text"
              class="py-2 rounded lg:w-96 border border-blue-700"
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
        <div class="flex justify-between mt-3">
          <div>
            <select
              v-model="variant_id"
              name=""
              id=""
              class="rounded border py-2 lg:w-96 border-blue-700"
            >
              <option value="" selected>Choose variant</option>
              <option
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
          <div>
            <input
              type="file"
              class="rounded lg:w-96 border border-blue-700"
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
        <div class="mt-3">
          <textarea
            v-model="description"
            name=""
            id=""
            cols="50"
            rows="3"
            class="border border-blue-700"
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
            v-if="crudLoading === false"
            class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800"
          >
            Update
          </button>
          <button
            v-if="crudLoading === true"
            class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800"
          >
            Updating...
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const toast = useToast();
    const validationErrors = ref("");
    const loading = ref(false);
    const crudLoading = ref(false);
    const { params } = useRoute();
    const name = ref("");
    const description = ref("");
    const price = ref("");
    const variant_id = ref("");

    const updatePizza = async () => {
      crudLoading.value = true;
      await store.dispatch("updatePizza", params.id, {
        name: name.value,
        description: description.value,
        price: price.value,
        variant_id: variant_id.value,
      });
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

      crudLoading.value = false;
    });

    const getThePizza = computed(() => store.state.getPizza);

    const makePizzaCall = async () => {
      store.dispatch("getPizza", params.id);

      name.value = getThePizza.value.name;
      price.value = getThePizza.value.price;
      description.value = getThePizza.value.description;
      variant_id.value = getThePizza.value.variant_id;
    };

    onMounted(async () => {
      await store.dispatch("getVariants");

      makePizzaCall();
    });

    return {
      name,
      description,
      price,
      variant_id,
      updatePizza,
      validationErrors,
      loading,
      getThePizza,
      crudLoading,
      makePizzaCall,
    };
  },
};
</script>

<style></style>
