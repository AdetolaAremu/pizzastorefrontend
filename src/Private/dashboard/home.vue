<template>
  <div class="px-0 mt-5">
    <div class="bg-white py-2 px-3 rounded-lg">
      <div class="font-semibold text-center text-gray-600">Top Selling Pizza</div>
      <div>

      </div>
    </div>
    <div class="font-semibold mt-10">Order History</div>
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
// import { onMounted } from '@vue/runtime-core'
import { useToast } from "vue-toastification";
export default {
  setup(){
    const toast = useToast()
    
   
    // toast.success("My toast content", {
    //   timeout: 10000
    // });

    // const user = computed(() => store.state.user)

        
    return{ toast }
  }
}
</script>

<style scoped>
body {
  background-color: rgba(209, 213, 219);
}
</style>