<template>
  <div class="pt-2">
    <div class="font-semibold mt-3">Overview</div>
    <div class="mt-2 grid grid-cols-1 lg:grid-cols-3">
      <div
        class="bg-indigo-600 text-center text-white mr-2 my-3 lg:my-0 font-bold text-xl rounded-md"
      >
        <div class="flex justify-between px-5 py-10">
          <div class="bg-white p-3 text-indigo-600 rounded-full">
            <font-awesome-icon icon="chart-bar" style="font-size: 50px" />
          </div>
          <div class="mt-3">
            <div>Total Orders</div>
            <div>{{ stats.total_orders }}</div>
          </div>
        </div>
      </div>
      <div
        class="bg-green-600 text-center text-white mr-2 my-3 lg:my-0 font-bold text-xl rounded-md"
      >
        <div class="flex justify-between px-5 py-10">
          <div class="text-green-600 bg-white p-3 rounded-full">
            <font-awesome-icon icon="check-circle" style="font-size: 50px" />
          </div>
          <div class="mt-3">
            <div>Successful Orders</div>
            <div>{{ stats.successful_orders }}</div>
          </div>
        </div>
      </div>
      <div
        class="bg-yellow-600 text-center text-white mr-2 my-3 lg:my-0 font-bold text-xl rounded-md"
      >
        <div class="flex justify-between px-5 py-10">
          <div class="bg-white text-yellow-600 p-3 rounded-full">
            <font-awesome-icon icon="hourglass-end" style="font-size: 50px" />
          </div>
          <div class="mt-3">
            <div>Pending Orders</div>
            <div>{{ stats.pending_orders }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: Object,
  },
};
</script>

<style></style>
