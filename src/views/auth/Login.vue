<template>
  <div id="auth-left">
    <div class="auth-logo">
      <router-link :to="{ name: 'Login' }"
        ><img src="@/assets/images/logo/logo.png" alt="Logo"
      /></router-link>
    </div>
    <h1 class="auth-title">Log in.</h1>
    <p class="auth-subtitle mb-5">
      Log in with your data that you entered during registration.
    </p>

    <form @submit.prevent="login">
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

      <div
        class="form-group position-relative has-icon-left"
        :class="[!error.password ? 'mb-4' : '']"
      >
        <input
          v-model="user.password"
          type="password"
          class="form-control form-control-xl"
          placeholder="Password"
        />
        <div class="form-control-icon">
          <i class="bi bi-shield-lock"></i>
        </div>
      </div>
      <div v-if="error.password" class="form-text text-danger mb-4">
        {{ error.password[0] }}
      </div>

      <button
        class="btn btn-primary btn-block btn-lg shadow-lg mt-5 d-flex justify-content-center align-items-center"
      >
        <span v-if="!clickLogin">Login</span>
        <div v-else class="spinner-border mx-2" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
    </form>
    <div class="text-center mt-5 text-lg fs-4">
      <p class="text-gray-600">
        Don't have an account?
        <router-link :to="{ name: 'Register' }" class="font-bold"
          >Sign up</router-link
        >.
      </p>
      <p>
        <router-link class="font-bold" :to="{ name: 'ForgotPassword' }"
          >Forgot password?</router-link
        >.
      </p>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import authStore from "@/store/auth";

export default {
  setup() {
    const router = useRouter();
    const user = reactive({
      email: "",
      password: "",
    });

    let clickLogin = ref(false);

    const authStatus = computed(() => authStore.state.authStatus);
    const error = computed(() => authStore.state.error);

    watch(authStatus, () => {
      router.replace({ name: "Home" });
    });

    let login = async () => {
      clickLogin.value = true;

      await authStore.dispatch("login", user).then(() => {
        clickLogin.value = false;
      });
    };

    return {
      user,
      clickLogin,
      error,
      login,
    };
  },
};
</script>

<style>
</style>