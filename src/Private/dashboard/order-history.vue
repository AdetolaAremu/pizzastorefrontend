<template>
  <div class="px-2 bg-white rounded-lg">
    <div class="font-semibold mt-10 text-xl text-center">All Orders table</div>
    <table class="table-fixed w-full mt-2">
      <thead class="bg-gray-300 py-4">
        <tr>
          <th>S/N</th>
          <th>Total Amount</th>
          <th>Payment Status</th>
          <th>Transaction type</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody class="text-center">
        <tr v-for="(order, index) in $store.state.orders" :key="index.id">
          <td>{{ index + 1 }}</td>
          <td>{{ order.total_amout }}</td>
          <td class="capitalize">{{ order.payment_status }}</td>
          <td class="capitalize">{{ order.transaction_type }}</td>
          <td>
            <router-link :to="`/user/order/${order.id}`">View</router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="$store.state.orders.length === 0 && $store.state.loading === false"
      class="text-center my-3"
    >
      No content to display
    </div>

    <div
      v-if="$store.state.loading === true"
      wire:loading
      class="overflow-hidden mt-3 opacity-75 flex flex-col items-center justify-center"
    >
      <div
        class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
      ></div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    onMounted(() => store.dispatch("getAllOrders"));

    return { store };
  },
};
</script>

<style>
/* .loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} */
</style>
