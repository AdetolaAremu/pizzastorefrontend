<template>
  <div>
    <div class="bg-white mt-9 rounded-md">
      <div class="text-center py-3">Create new product</div>
      <form id="theform" @submit.prevent="createPizza" class="px-8 py-4">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="mt-2">
            <input v-model="name" type="text" class="py-2 px-3 rounded w-100 lg:w-96 border-2 border-green-500" placeholder="Product Name">
            <div class="text-red-600 text-sm " v-if="validationErrors.name">{{ validationErrors.name[0] }}</div>
          </div>
          <div class="mt-2">
            <input v-model="price" type="text" class="py-2 px-3 rounded w-100 lg:w-96 border-2 border-green-500" placeholder="Product Price">
            <div class="text-red-600 text-sm " v-if="validationErrors.price">{{ validationErrors.price[0] }}</div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 mt-3">
          <div class="mt-2">
            <select v-model="variant_id" name="" id="" class="rounded border-2 py-2 px-3 w-100 lg:w-96 border-green-500 capitalize">
              <option value="" selected>Choose variant</option>
              <option class="" v-for="variants in getVariants" :key="variants.id" :value="variants.id">{{ variants.name }}</option>
            </select>
            <div class="text-red-600 text-sm " v-if="validationErrors.variant_id">{{ validationErrors.variant_id[0] }}</div>
          </div>
          <div class="mt-2">
            <input type="file" @change="handleImageUpload" class="rounded w-100 lg:w-96 border-2 border-green-500">
            <div class="text-red-600 text-sm " v-if="validationErrors.image">{{ validationErrors.image[0] }}</div>
          </div>
        </div>
        <div class="mt-3">
          <textarea v-model="description" name="" id="" cols="50" rows="3" class="border-2 border-green-500 px-3" placeholder="Description"></textarea>
            <div class="text-red-600 text-sm " v-if="validationErrors.description">{{ validationErrors.description[0] }}</div>
        </div>
        <div class="text-center">
            <button v-if="loading === false" class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800">Post</button>
            <button v-if="loading === true" class="bg-green-600 text-white font-bold rounded px-5 py-3 mb-3 hover:bg-green-800">Posting...</button>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
export default {
  setup(){
    const getVariants = ref('');
    const name = ref('');
    const description = ref('');
    const price = ref('');
    const variant_id = ref('');
    const image = ref('');
    const toast = useToast();
    const router = useRouter()
    const validationErrors = ref('')
    const loading = ref(false)

    const handleImageUpload = (e) => {
      image.value = e.target.files[0]
      console.log(image.value, 'image')
    }

    const createPizza = async () => {
      let formData = new FormData()

      formData.append('image', image.value)
      formData.append('description', description.value)
      formData.append('price', price.value)
      formData.append('variant_id', variant_id.value)
      formData.append('name', name.value)

      loading.value = true
      
      await axios.post('/pizzas', formData
        // name:name.value,
        // description:description.value,
        // price:price.value,
        // variant_id:variant_id.value,
        // image:image.value
        
      ).then(() => {
        router.push('/user/all-pizzas')
        loading.value = false
        toast.success('Pizza created successfully', { timeout:5000 })
      }).catch((error) => {
        if (error.response) {
          if (error.response.status == 422) {
            toast.error(error.response.data.message, {
              timeout:10000
            })
            validationErrors.value = error.response.data.errors
          }
          else {
             toast.error('An error occured, please retry', {
              timeout:5000
            })
          }
          loading.value = false
        }
      })
    }

    onMounted(async () => {
      const response = await axios.get('variants')
      getVariants.value = response.data.data
    })

    return { getVariants, name, description, price, variant_id, createPizza, validationErrors, 
      loading, handleImageUpload, image 
    }
  }
}
</script>

<style>

</style>