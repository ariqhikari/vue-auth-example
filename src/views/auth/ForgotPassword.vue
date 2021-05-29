<template>
  <div id="auth-left">
    <div class="auth-logo">
      <router-link :to="{ name: 'Login' }"
        ><img src="@/assets/images/logo/logo.png" alt="Logo"
      /></router-link>
    </div>
    <h1 class="auth-title">Forgot Password</h1>
    <p class="auth-subtitle mb-5">
      Input your email and we will send you reset password link.
    </p>

    <form @submit.prevent="forgotPassword">
      <div
        class="form-group position-relative has-icon-left"
        :class="[!error.email ? 'mb-4' : '']"
      >
        <input
          v-model="user.email"
          type="email"
          class="form-control form-control-xl"
          placeholder="Email"
        />
        <div class="form-control-icon">
          <i class="bi bi-envelope"></i>
        </div>
      </div>
      <div v-if="error.email" class="form-text text-danger mb-4">
        {{ error.email[0] }}
      </div>

      <button
        class="btn btn-primary btn-block btn-lg shadow-lg mt-5 d-flex justify-content-center align-items-center"
      >
        <span v-if="!clickForgotPassword">Send</span>
        <div v-else class="spinner-border mx-2" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
    </form>
    <div class="text-center mt-5 text-lg fs-4">
      <p class="text-gray-600">
        Remember your account?
        <router-link :to="{ name: 'Login' }" class="font-bold"
          >Login</router-link
        >.
      </p>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import authStore from "@/store/auth";

export default {
  setup() {
    const user = reactive({
      email: "",
    });

    let clickForgotPassword = ref(false);

    const error = computed(() => authStore.state.error);

    let forgotPassword = async () => {
      clickForgotPassword.value = true;

      await authStore.dispatch("forgotPassword", user).then(() => {
        alert("Password Reset Email Sent.");
        clickForgotPassword.value = false;
      });
    };

    return {
      user,
      error,
      forgotPassword,
    };
  },
};
</script>

<style>
</style>