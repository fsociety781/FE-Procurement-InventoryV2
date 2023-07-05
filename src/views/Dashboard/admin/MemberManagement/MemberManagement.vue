<template>
  <div class="py-4 container-fluid">
    <div class="card">
      <div class="card-header pb-0">
        <div class="d-flex justify-content-between">
          <h6>Member</h6>
          <button class="btn btn-sm btn-primary">
            <router-link :to="{ name: 'Add member' }" class="text-light">
              <b> Add member
              </b>
            </router-link>
          </button>
        </div>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <data-tabel :index="true" :data="g$list" v-bind="dt" @detail-admin="showDetail" @edit-admin="showModal"
            @delete-admin="showConfirmation" />
          <!-- <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index ) in g$list" :key="index" >
                <td>
                  {{ index + 1 }}
                </td>
                <td>
                  <h6>{{ item.name }}</h6>
                </td>
                <td>{{ item.phone }}</td>
                <td >
                  {{ item.email }}
                </td>
                <td>{{ item.username }}</td>
                <td >
                  <a href="#" class="btn btn-danger dropdown-toggle" 
                  :id="`dropdown-${index}`" data-bs-toggle="dropdown" @click="showMenu = !showMenu" >Action</a>
                  <ul class="dropdown-menu" :class="[showMenu ? 'show' : '']">
                    <li class="dropdown-item" @click="showDetail(item)" >See Detail</li>
                    <li class="dropdown-item" @click="showModal(item)">Edit Profile</li>
                    <li class="dropdown-item" @click="showConfirmation(item.id, item.title)">Delete</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table> -->
        </div>
        <!-- modal detail -->
        <Modal v-show="modalDetail" @close="closeModal">
          <template v-slot:header>This Modal</template>
          <template v-slot:body>
            <h2 style="text-align: center;"> Detail</h2>
            <div class="card">
              <h5 class="card-header">Member Information</h5>
              <div class="card-body">
                <h6>Name : {{ detail.name }}</h6>
                <h6>NIK : {{ detail.nik }}</h6>
                <h6>Address : {{ detail.address }}</h6>
                <h6>Phone Number : {{ detail.phone }}</h6>
                <h6>Username : {{ detail.username }}</h6>
                <h6>Email : {{ detail.email }}</h6>
                <h6>Password : {{ detail.password }}</h6>
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
            <button class="btn btn-secondary px-6 fs-5 ms-2" @click="closeModal3" type="submit">
              Cancel
            </button>
          </div>
        </div>
      </template>
      <template v-slot:footer>@footerKonfirmasi</template>
    </Modal>
    <div v-if="isDeleted" class="success-popup">
      Data has been successfully deleted.
    </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapActions, mapState } from "pinia";
import Modal from "@/components/Modal.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import d$MemberManagement from "@/stores/dashboard/admin/MemberManagement";
import DataTabel from "@/components/datatabels.vue"


export default {
  name: "MemberManagement",
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
          { name: 'name', th: ' Name' },
          { name: 'phone', th: 'Phone' },
          { name: 'username', th: ' Username' },
          { name: 'email', th: ' Email' },
          // {
          //   name: 'partNumber',
          //   th: 'Part Number',
          //   render: ({ part }) => part.number,
          // },
        ],
        actions: [
          {
            text: 'Detail',
            color: 'info',
            disabled: ({ isDisabled }) => isDisabled,
            event: 'detail-admin',
          },
          {
            text: 'Edit ',
            color: 'warning',
            disabled: ({ isDisabled }) => isDisabled,
            event: 'edit-admin',
          },
          {
            text: 'Hapus',
            color: 'danger',
            disabled: ({ isDisabled }) => isDisabled,
            event: 'delete-admin',
          },

        ],
      },
      editedItem: {
        id: "",
        title: "",
        description: "",
        completed: false,
      },
      // isDeleted: false, // Properti untuk menampilkan pop-up berhasil dihapus
      isModalEditVisible: false,
      confirmationVisible: false,
      deleteItemId: null,
      deleteItemTitle: "",
      modalDetail: false,
      detail: {},
    };
  },
  computed: {
    ...mapState(d$MemberManagement, ["g$list"]),
  },
  methods: {
    showModal(item) {
      this.editedItem = { ...item };
      // this.editedItem = {...(await this.a$getById(item,id))}
      this.isModalEditVisible = true;
    },
    async showDetail(item) {
      console.log(item);
      // this.detail = {...item};
      this.detail = { ...(await this.a$getById(item.id)) };
      this.modalDetail = true;
    },
    showConfirmation({ id, name }) {
      this.confirmationVisible = true;
      this.deleteItemId = id;
      this.deleteItemTitle = name;
      this.deleteItemTitle = item.title; // sama kyk yg di atas
    },
    closeModal() {
      this.modalDetail = false;
    },
    closeModal2() {
      this.isModalEditVisible = false;
    },
    closeModal3() {
      this.confirmationVisible = false;
    },
    async updateList() {
      try {
        const updatedItem = { ...this.editedItem };
        delete updatedItem.id;

        await this.a$update(this.editedItem.id, updatedItem);
        this.closeModal();

        // Perbarui data tabel secara otomatis setelah operasi pembaruan berhasil
        await this.getList();

        // Setelah berhasil memperbarui, sembunyikan pop-up edit
        this.isModalEditVisible = false;
        
      } catch (e) {
        console.error(e);
      }
    },

    async deleteItem() {
      try {
        await this.a$delete(this.deleteItemId);
        this.closeModal2();

        // Setelah berhasil menghapus, sembunyikan pop-up delete
        this.confirmationVisible = false;

        // Setelah berhasil menghapus, tampilkan pop-up berhasil dihapus
        // this.isDeleted = true;

        // Setelah beberapa waktu, sembunyikan pop-up berhasil dihapus
        setTimeout(() => {
          this.isDeleted = false;
        }, 3000); // Ubah angka 3000 sesuai dengan durasi yang diinginkan (dalam milidetik)

      } catch (e) {
        console.error(e);
      }
    },

    ...mapActions(d$MemberManagement, [
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



  <style>

.success-popup {
  position: fixed;
  background: #ffffff;
  /* overflow-x: hidden; */
    Width:472px;
    Height:311px;
    Top:335px;
    Left:520px;
    padding:10px;
}
</style>
