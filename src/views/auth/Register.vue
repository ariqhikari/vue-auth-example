<template>
  <div id="auth-left">
    <div class="auth-logo">
      <router-link :to="{ name: 'Login' }"
        ><img src="@/assets/images/logo/logo.png" alt="Logo"
      /></router-link>
    </div>
    <h1 class="auth-title">Sign Up</h1>
    <p class="auth-subtitle mb-5">
      Input your data to register to our website.
    </p>

    <form @submit.prevent="register">
      <div
        class="form-group position-relative has-icon-left"
        :class="[!error.name ? 'mb-4' : '']"
      >
        <input
          v-model="user.name"
          type="text"
          class="form-control form-control-xl"
          placeholder="Name"
        />
        <div class="form-control-icon">
          <i class="bi bi-person"></i>
        </div>
      </div>
      <div v-if="error.name" class="form-text text-danger mb-4">
        {{ error.name[0] }}
      </div>

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

      <div class="form-group position-relative has-icon-left mb-4">
        <input
          v-model="user.password_confirmation"
          type="password"
          class="form-control form-control-xl"
          placeholder="Confirm Password"
        />
        <div class="form-control-icon">
          <i class="bi bi-shield-lock"></i>
        </div>
      </div>

      <button
        class="btn btn-primary btn-block btn-lg shadow-lg mt-5 d-flex justify-content-center align-items-center"
      >
        <span v-if="!clickRegister">Register</span>
        <div v-else class="spinner-border mx-2" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
    </form>
    <div class="text-center mt-5 text-lg fs-4">
      <p class="text-gray-600">
        Already have an account?
        <router-link :to="{ name: 'Login' }" class="font-bold"
          >Log in</router-link
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
      password_confirmation: "",
    });

    let clickRegister = ref(false);

    const authStatus = computed(() => authStore.state.authStatus);
    const error = computed(() => authStore.state.error);

    watch(authStatus, () => {
      router.replace({ name: "Home" });
    });

    let register = async () => {
      clickRegister.value = true;

      await authStore.dispatch("register", user).then(() => {
        clickRegister.value = false;
      });
    };

    return {
      user,
      clickRegister,
      error,
      register,
    };
  },
};
</script>

<style>
</style>