<template>
  <div id="auth">
    <div class="row h-100">
      <div class="col-lg-5 col-12">
        <router-view></router-view>
      </div>
      <div class="col-lg-7 d-none d-lg-block">
        <div id="auth-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/pages/auth.css";

export default {};
</script>

<style>
</style>