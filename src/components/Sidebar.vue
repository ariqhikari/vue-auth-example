<template>
  <div id="sidebar" class="active">
    <div class="sidebar-wrapper active">
      <div class="sidebar-header">
        <div class="d-flex justify-content-between">
          <div class="logo">
            <router-link :to="{ name: 'Home' }"
              ><img src="@/assets/images/logo/logo.png" alt="Logo" srcset=""
            /></router-link>
          </div>
          <div class="toggler">
            <a href="#" class="sidebar-hide d-xl-none d-block"
              ><i class="bi bi-x bi-middle"></i
            ></a>
          </div>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul class="menu">
          <li class="sidebar-title">Menu</li>

          <li class="sidebar-item">
            <router-link :to="{ name: 'Home' }" class="sidebar-link">
              <i class="bi bi-grid-fill"></i>
              <span>Dashboard</span>
            </router-link>
          </li>

          <li class="sidebar-item has-sub">
            <a href="#" class="sidebar-link">
              <i class="bi bi-grid-1x2-fill"></i>
              <span>Tables</span>
            </a>
            <ul class="submenu">
              <li class="submenu-item">
                <router-link :to="{ name: 'TransactionIndex' }"
                  >Transactions</router-link
                >
              </li>
            </ul>
          </li>

          <li class="sidebar-item">
            <a href="#" @click.prevent="logout" class="sidebar-link">
              <i class="bi bi-door-closed-fill"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import authStore from "@/store/auth";

export default {
  setup() {
    const router = useRouter();

    let logout = async () => {
      await authStore.dispatch("logout");
      router.replace({ name: "Login" });
    };

    return {
      logout,
    };
  },
};
</script>