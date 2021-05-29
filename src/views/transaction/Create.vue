<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>Create Transaction</h3>
          <p class="text-subtitle text-muted">Create Transaction Page</p>
        </div>
        <div class="col-12 col-md-6 order-md-2 order-first">
          <nav
            aria-label="breadcrumb"
            class="breadcrumb-header float-start float-lg-end"
          >
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'Home' }">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'TransactionIndex' }"
                  >Transactions</router-link
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">Create</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="card">
        <div class="card-body">
          <router-link
            :to="{ name: 'TransactionIndex' }"
            class="btn btn-primary btn-sm rounded mb-3"
            >Back</router-link
          >

          <form @submit.prevent="store">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                v-model="transaction.title"
                type="text"
                id="title"
                placeholder="Transaction Title"
                class="form-control"
              />
              <div v-if="error.title" class="form-text text-danger">
                {{ error.title[0] }}
              </div>
            </div>
            <div class="mb-3">
              <label for="amount" class="form-label">Amount</label>
              <input
                v-model="transaction.amount"
                type="number"
                id="amount"
                placeholder="Transaction Amount"
                class="form-control"
              />
              <div v-if="error.amount" class="form-text text-danger">
                {{ error.amount[0] }}
              </div>
            </div>
            <div class="mb-3">
              <label for="time" class="form-label">Time</label>
              <input
                v-model="transaction.time"
                type="datetime-local"
                id="time"
                placeholder="yyyy-mm-dd hh:mm:ss"
                class="form-control"
              />
              <div v-if="error.time" class="form-text text-danger">
                {{ error.time[0] }}
              </div>
            </div>
            <div class="mb-3">
              <label for="type" class="form-label">Type</label>
              <select v-model="transaction.type" id="type" class="form-select">
                <option value="expense">Expense</option>
                <option value="revenue">Revenue</option>
              </select>
              <div v-if="error.type" class="form-text text-danger">
                {{ error.type[0] }}
              </div>
            </div>

            <button type="submit" class="btn btn-outline-primary">
              <span v-if="!clickStore">Store</span>
              <div
                v-else
                class="spinner-border spinner-border-sm mx-3"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";

import transactionStore from "@/store/transaction";

export default {
  setup() {
    const router = useRouter();
    const transaction = reactive({
      title: "",
      amount: 0,
      time: "",
      type: "expense",
    });

    let clickStore = ref(false);

    const error = computed(() => transactionStore.state.error);

    const store = async () => {
      clickStore.value = true;

      await transactionStore.dispatch("store", transaction).then((response) => {
        clickStore.value = false;

        if (response.status === 201)
          router.replace({ name: "TransactionIndex" });
      });
    };

    return {
      transaction,
      clickStore,
      error,
      store,
    };
  },
};
</script>

<style>
</style>