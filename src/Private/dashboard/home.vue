<template>
  <div class="px-24 mt-5">
    <div class="font-semibold mt-10">User Statistics Overview</div>
    <div class="mt-2 grid grid-cols-1 lg:grid-cols-3">
      <router-link to="/" class="bg-indigo-600 h-40 text-center text-white mr-2 font-bold text-xl rounded-md">
        Total Amount spent
      </router-link>
      <router-link to="/" class="bg-green-600 h-40 text-center text-white mr-2 font-bold text-xl rounded-md">
        Total Orders
      </router-link>
      <router-link to="/" class="bg-yellow-600 h-40 text-center text-white mr-2 font-bold text-xl rounded-md">
        Pending Orders
      </router-link>
    </div>

    <div class="font-semibold mt-10">Active Orders</div>
    <table class="table-fixed w-full mt-2">
      <thead class="bg-gray-300 py-4">
        <tr>
          <th>Order ID</th>
          <th>Status</th>
          <th>Total Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr>
          <td>The Sliding</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
          <td><router-link to="/">View</router-link></td>
        </tr>
        <tr>
          <td>Witchy Woman</td>
          <td>The Eagles</td>
          <td>1972</td>
          <td><router-link to="/">View</router-link></td>
        </tr>
        <tr>
          <td>Shining Star</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
          <td><router-link to="/">View</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>