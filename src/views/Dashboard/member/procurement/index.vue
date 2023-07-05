<template>
  <div class="py-4 container-fluid">
    <div class="card">
      <div class="card-header pb-0">
        <div class="d-flex justify-content-between">
          <h6>{{ $route.name }}</h6>
          <button class="btn btn-sm btn-primary">
            <router-link :to="{ name: 'Add Procurement' }" class="text-light">
              <b> Add {{ $route.name }}
              </b>
            </router-link>
          </button>
        </div>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <data-tabel :index="true" :data="g$list" v-bind="dt" @detail-member="showDetail"/>
        </div>
        <!-- modal detail -->
        <Modal v-show="modalDetail" @close="closeModal">
          <template v-slot:header>This Modal</template>
          <template v-slot:body>
            <h2 style="text-align: center;"> Detail</h2>
            <div class="card">
              <h5 class="card-header">Member Information</h5>
              <div class="card-body">
                <h6>Nama : {{ detail?.detailItems?.name }}</h6>
                <h6>Category : {{ detail?.detailItems?.category?.category }}</h6>
                <h6>Description : {{ detail?.detailItems?.description }}</h6>
                <h6>url : {{ detail?.detailItems?.url }}</h6>
                <h6>Quantity : {{ detail?.detailItems?.quantity }}</h6>
                <h6>Price : {{ detail?.detailItems?.price }}</h6>
                <h6>total : {{ detail?.detailItems?.total }}</h6>
                <h6>status : {{ detail?.status }}</h6>
                <h6>Duedate : {{ detail?.detailItems?.duedate }}</h6>
              </div>
            </div>
          </template>
          <template v-slot:footer>@footerMeme</template>
        </Modal>
        <!-- modal edit profil -->
        <Modal v-show="isModalEditVisible" @close="closeModal2">
          <template v-slot:header>This Modal</template>
          <template v-slot:body>
            <div class="mt-3">
              <form v-on:submit.prevent="updateList">
                <div class="form-group">
                  <label for="name">Nama:</label>
                  <input type="text" class="form-control" id="name" v-model="editedItem.name" />
                </div>
                <div class="form-group">
                  <label for="nik">NIK:</label>
                  <textarea type="string" class="form-control" id="nik" v-model="editedItem.nik"></textarea>
                </div>
                <div class="form-group">
                  <label for="address">Address:</label>
                  <textarea type="text" class="form-control" id="address" v-model="editedItem.address"></textarea>
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number:</label>
                  <textarea type="integer" class="form-control" id="phone" v-model="editedItem.phone"></textarea>
                </div>
                <div class="form-group">
                  <label for="username">Username:</label>
                  <textarea type="string" class="form-control" id="username" v-model="editedItem.username"></textarea>
                </div>
                <div class="form-group">
                  <label for="email">Email:</label>
                  <textarea type="email" class="form-control" id="email" v-model="editedItem.email"></textarea>
                </div>
                <!-- <div class="form-group">
                <label for="password">Password:</label>
                <textarea
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="editedItem.password"
                ></textarea>
              </div> -->
                <div class="text-center mt-4">
                  <button class="btn btn-primary px-6 fs-5" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </template>
          <template v-slot:footer>@footerMeme</template>
        </Modal>
        <!-- modal delete -->
        <Modal v-show="confirmationVisible" @close="closeModal3">
          <template v-slot:header>This Modal Confirmation</template>
          <template v-slot:body>
            <div class="mt-3">
              <div class="text-center fs-1">
                Are you sure to delete {{ deleteItemTitle }}?
              </div>
              <div class="text-center mt-9">
                <button class="btn btn-danger px-6 fs-5" @click="deleteItem" type="submit">
                  Delete
                </button>
                <button class="btn btn-secondary px-6 fs-5 ms-2" @click="closeModal2" type="submit">
                  Cancel
                </button>
              </div>
            </div>
          </template>
          <template v-slot:footer>@footerKonfirmasi</template>
        </Modal>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapActions, mapState } from "pinia";
import Modal from "@/components/Modal.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import d$procurement from "@/stores/dashboard/member/procurement";
import DataTabel from "@/components/datatabels.vue"

export default {
  name: "procurement",
  components: {
    DataTabel,
    ArgonSwitch,
    Modal,
  },
  data() {
    return {
      // DataTable
      dt: {
        columns: [
          { name: 'name', th: ' Name', render: ({ detailItems }) => detailItems.name },
          { name: 'category', th: 'Category', render: ({ detailItems }) => detailItems.category.category },
          { name: 'total', th: 'Total', render: ({ detailItems }) => detailItems.total },
          { name: 'status', th: 'Status' },
          { name: 'due date', th: 'Due date', render: ({ detailItems }) => detailItems.duedate },
        ],
        actions: [
          {
            text: 'Detail',
            color: 'info',
            disabled: ({ isDisabled }) => isDisabled,
            event: 'detail-member',
          },
        ],
      },
      editedItem: {
        id: "",
        title: "",
        description: "",
        completed: false,
      },
      modalDetail: false,
      detail: {},
    };
  },
  computed: {
    ...mapState(d$procurement, ["g$list"]),
  },
  methods: {
    async showDetail(item) {
      console.log(item);
      // this.detail = {...item};
      this.detail = { ...(await this.a$getById(item.id)) };
      this.modalDetail = true;
    },
    closeModal() {
      this.modalDetail = false;
    },

    ...mapActions(d$procurement, [
      "a$list",
      "a$update",
      "a$getById",
      "a$add",
      "a$delete",
    ]),
    async getList() {
      try {
        await this.a$list();
      } catch (e) {
        console.error("methods getList error", e);
      }
    },
  },
  async created() {
    await this.getList();
  },
};
</script>
  