<template>
  <div class="mt-7">
    <ChangeInfo />
    <ChangePassword />
  </div>
</template>

<script>
import { ref, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import ChangeInfo from "../../components/ChangeInfo.vue";
import ChangePassword from "../../components/ChangePassword.vue";
export default {
  components: {
    ChangeInfo,
    ChangePassword,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const loading = ref(false);

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

    return {
      loading,
    };
  },
};
</script>

<style>
.loader {
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
}
</style>
