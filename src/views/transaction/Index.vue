<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>Transactions</h3>
          <p class="text-subtitle text-muted">Table Transactions</p>
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
              <li class="breadcrumb-item active" aria-current="page">
                Transactions
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="card">
        <div class="card-header">
          <router-link
            :to="{ name: 'TransactionCreate' }"
            class="btn btn-primary"
            >Add Transaction</router-link
          >
        </div>
        <div class="card-body">
          <div class="row justify-content-between mb-3">
            <div class="row align-items-center col-md-6 col-lg-4 mb-3 mb-md-0">
              <div class="col-auto">
                <select class="form-select" v-model="perPage">
                  <option value="5">5</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div class="col-auto">
                <p class="my-auto">entries per page</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xxl-2">
              <input
                v-model="keyword"
                type="text"
                placeholder="Search Transaction.."
                class="form-control"
              />
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" @click="setSort('title')" class="sort">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <span>Title</span>
                      <div>
                        <span>↑</span>
                        <span>↓</span>
                      </div>
                    </div>
                  </th>
                  <th scope="col" @click="setSort('amount')" class="sort">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <span>Amount</span>
                      <div>
                        <span>↑</span>
                        <span>↓</span>
                      </div>
                    </div>
                  </th>
                  <th scope="col" @click="setSort('type')" class="sort">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <span>Type</span>
                      <div>
                        <span>↑</span>
                        <span>↓</span>
                      </div>
                    </div>
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="displayedTransactions.length">
                  <tr
                    v-for="(transaction, index) in displayedTransactions"
                    :key="index"
                  >
                    <th scope="row">
                      {{ startTransactions + index + 1 }}
                    </th>
                    <td>{{ transaction.title }}</td>
                    <td>{{ transaction.amount }}</td>
                    <td>{{ transaction.type }}</td>
                    <td>
                      <div class="btn-group">
                        <router-link
                          :to="{
                            name: 'TransactionEdit',
                            params: { id: transaction.id },
                          }"
                          class="btn btn-sm btn-outline-info"
                          >Edit</router-link
                        >
                        <button
                          @click.prevent="destroy(transaction.id, index)"
                          class="btn btn-sm btn-outline-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
                <tr v-else>
                  <td colspan="5" class="text-center">
                    Transaction Not Found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav
            v-if="transactions.length"
            class="d-flex justify-content-between align-items-center"
          >
            <p>
              Showing {{ startTransactions + 1 }} to
              {{ startTransactions + displayedTransactions.length }}
              of {{ transactions.length }} entries
            </p>
            <ul class="pagination">
              <li class="page-item" :class="page == 1 ? 'disabled' : ''">
                <a class="page-link" href="#" @click.prevent="page--">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                class="page-item"
                :class="page == pageNumber ? 'active' : ''"
                v-for="pageNumber in pages"
                :key="pageNumber"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="page = pageNumber"
                >
                  {{ pageNumber }}</a
                >
              </li>
              <li
                class="page-item"
                :class="page == pages.length ? 'disabled' : ''"
              >
                <a class="page-link" href="#" @click.prevent="page++">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref, computed, watch } from "vue";
import transactionStore from "@/store/transaction";

export default {
  setup() {
    let search = (transaction) => {
      return transaction.filter((transaction) =>
        transaction.title.toLowerCase().includes(keyword.value.toLowerCase())
      );
    };

    let sort = (transaction) => {
      return transaction.sort((a, b) => {
        let modifier = 1;
        if (currentSortDir.value === "desc") modifier = -1;
        if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier;
        if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier;
        return 0;
      });
    };

    let setSort = (s) => {
      //if s == current sort, reverse
      if (s === currentSort.value) {
        currentSortDir.value = currentSortDir.value === "asc" ? "desc" : "asc";
      }
      currentSort.value = s;
    };

    let setPages = () => {
      let numberOfPages = Math.ceil(transactions.value.length / perPage.value);
      for (let index = 1; index <= numberOfPages; index++) {
        pages.value.push(index);
      }
    };

    let paginate = (transactions) => {
      let newPage = page.value;
      let newPerPage = perPage.value;
      let from = newPage * newPerPage - newPerPage;
      let to = newPage * newPerPage;
      return transactions.slice(from, to);
    };

    let destroy = (id, index) => {
      $swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await transactionStore.dispatch("destroy", { id, index });
            $swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
    };

    const app = getCurrentInstance();
    const $swal = app.appContext.config.globalProperties.$swal;

    let keyword = ref("");
    let currentSort = ref("");
    let currentSortDir = ref("");

    let page = ref(1);
    let perPage = ref(5);
    let pages = ref([]);

    onMounted(() => {
      transactionStore.dispatch("index");
    });

    const transactions = computed(() => {
      return sort(search(transactionStore.state.transactions));
    });

    const displayedTransactions = computed(() => {
      return paginate(transactions.value);
    });

    const startTransactions = computed(() => {
      return page.value * perPage.value - perPage.value;
    });

    watch([perPage, transactions], ([newPerPage]) => {
      perPage.value = parseInt(newPerPage);
      page.value = 1;
      pages.value = [];
      setPages();
    });

    return {
      keyword,
      page,
      perPage,
      pages,
      transactions,
      displayedTransactions,
      startTransactions,
      setSort,
      destroy,
    };
  },
};
</script>

<style scoped>
th.sort {
  cursor: pointer;
}
</style>