<template>
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
    <div class="col-md-4 col-lg-2">
      <input
        v-model="search"
        type="text"
        placeholder="Search"
        class="form-control"
      />
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" @click="sort('title')" class="sort">
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-capitalize">Title</span>
              <div>
                <span>↑</span>
                <span>↓</span>
              </div>
            </div>
          </th>
          <th scope="col" @click="sort('amount')" class="sort">
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-capitalize">Amount</span>
              <div>
                <span>↑</span>
                <span>↓</span>
              </div>
            </div>
          </th>
          <th scope="col" @click="sort('type')" class="sort">
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-capitalize">Type</span>
              <div>
                <span>↑</span>
                <span>↓</span>
              </div>
            </div>
          </th>
          <th scope="col" class="text-capitalize">Action</th>
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
          <td colspan="5" class="text-center">Transaction Not Found.</td>
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
        <a class="page-link" href="#" @click.prevent="page = pageNumber">
          {{ pageNumber }}</a
        >
      </li>
      <li class="page-item" :class="page == pages.length ? 'disabled' : ''">
        <a class="page-link" href="#" @click.prevent="page++">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>