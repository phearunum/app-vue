<template>
  <div class="page-wrapper">
    <div class="page-content">
      <!--breadcrumb-->
      <!--end breadcrumb-->
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-7 p-2">
              <h3 class="app_font_titel">{{ $t("user_management") }}</h3>
            </div>
            <div class="col-sm-5">
              <div class="col d-flex justify-content-end">
                <div class="btn-group">
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    backdrop="false"
                    data-bs-target="#primary"
                    data-bs-whatever="@mdo"
                    class="btn btn-primary btn-sm"
                  >
                    {{ $t("action") }}
                  </button>
                  <button
                    type="button"
                    class="
                      btn btn-primary btn-sm
                      split-bg-primary
                      dropdown-toggle dropdown-toggle-split
                    "
                    data-bs-toggle="dropdown"
                    aria-expanded="false "
                  >
                    <span class="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <div
                    class="
                      dropdown-menu dropdown-menu-right dropdown-menu-lg-end
                    "
                  >
                    <a class="dropdown-item" @click="modal = true" href="#">{{
                      $t("addnew")
                    }}</a>
                    <a class="dropdown-item" href="javascript:;">{{
                      $t("search")
                    }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <div class="col-md-4">
              <input
                type="search"
                class="form-control"
                placeholder="Search by name,email,phone,or address..."
              />
            </div>
            <table
              id="data_user_list"
              class="table table-striped table-bordered data_user_list"
              style="width: 100%"
            >
              <thead>
                <tr>
                  <th>{{ $t("id") }}</th>
                  <th>{{ $t("first_name") }}</th>
                  <th>{{ $t("last_name") }}</th>
                  <th>{{ $t("gender") }}</th>
                  <th>{{ $t("username") }}</th>
                  <th>{{ $t("email") }}</th>
                  <th>{{ $t("phone") }}</th>
                  <th>{{ $t("address") }}</th>
                  <th>{{ $t("create on") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users.data" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.first_name }}</td>
                  <td>{{ user.last_name }}</td>
                  <td>{{ user.gender }}</td>
                  <td>{{ user.username }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.phone }}</td>
                  <td>{{ user.address }}</td>
                  <td>{{ user.create }}</td>
                  <td>
                    <button
                      @click="error"
                      class="edit btn btn-success btn-sm"
                    >
                      <i class="bx bx-edit"></i>{{ $t("edit") }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row mt-4">
            <div class="col-sm-6 offset-5">
              <pagination :data="users" @pagination-change-page="getUses">
                <template #prev-nav>
                  <span>&lt; Previous</span>
                </template>
                <template #next-nav>
                  <span>Next &gt;</span>
                </template>
              </pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="modal" width="360">
      <template #header>
        <p style="color: #f60; text-align: center">
          <Icon type="ios-information-circle"></Icon>
          <span>Delete confirmation</span>
        </p>
      </template>
      <div style="text-align: center">
        <p>
          After this task is deleted, the downstream 10 tasks will not be
          implemented.
        </p>
        <p>Will you delete it?</p>
      </div>
      <template #footer>
        <Button
          type="error"
          size="large"
          long
          :loading="modal_loading"
          @click="del"
          >Delete</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: {},
      paginate: 1,
      modal: false,
      loading: true,
    };
  },
  watch: {
    paginate: function (value) {
      this.getUses();
    },
  },
  methods: {
    getUses(page = 1) {
      axios
        .get("/api/users/lists?page=" + page + "&paginate=" + this.paginate)
        .then((response) => {
          this.users = response.data;
        });
    },
    error() {
      this.$Message.error("This is an error tip");
    },
  },
  mounted() {
    this.getUses();
  },
};
</script>
