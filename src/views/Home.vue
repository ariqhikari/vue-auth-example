<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>Home</h3>
          <p class="text-subtitle text-muted">Home Page</p>
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
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Welcome to Dashboard Admin!</h4>
        </div>
        <div class="card-body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
          commodi? Ullam quaerat similique iusto temporibus, vero aliquam
          praesentium, odit deserunt eaque nihil saepe hic deleniti? Placeat
          delectus quibusdam ratione ullam!
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>
