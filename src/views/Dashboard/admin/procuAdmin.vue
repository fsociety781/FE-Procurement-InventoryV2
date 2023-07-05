<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Procurement</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <data-tabel
          :index="false"
          :data="g$list"
          v-bind="dt"
          @detail-member="showDetail"
          :footer="false"
        ><template #pagination>
            
            <div class="col-md-6">
              <base-pagination
                v-model.number="page"
                :page-count="g$pagination.totalPages"
              ></base-pagination>
            </div>
          </template></data-tabel>
    </div>
    <Modal v-show="modalDetail" @close="closeModal">
        <template v-slot:header>This Modal</template>
        <template v-slot:body>
          <h2 style="text-align: center;"> Detail</h2>
          <div class="card">
            <h5 class="card-header">Member Information</h5>
            <div class="card-body">
              <h6>Nama  : {{ detail?.detailItems?.name }}</h6>
              <h6>Submited By  : {{ detail?.user?.name }}</h6>
              <h6>Description  : {{ detail?.detailItems?.description }}</h6>
              <h6>Category  : {{ detail?.detailItems?.category?.category }}</h6>
              <h6>url  : {{ detail?.detailItems?.url }}</h6>
              <h6>Quantity  : {{ detail?.detailItems?.quantity }}</h6>
              <h6>Price  : {{ detail?.detailItems?.price }}</h6>
              <h6>total  : {{ detail?.detailItems?.total }}</h6>
              <h6>status  : {{ detail?.status }}</h6>
              <h6>Duedate  : {{ detail?.detailItems?.duedate }}</h6>
              <h6>Submited On  : {{ detail?.createdAt }}</h6>
              <h6>Status: {{ detail?.status }}</h6>
              <select class="form-select" aria-label="Default select example" v-model="selectedStatus">
          <option value="">Select Status</option>
          <option value="approve">Approved</option>
          <option value="reject">Rejected</option>
        </select>
        <template v-if="selectedStatus === 'reject'">
    <div class="form-group">
      <label for="message">Message</label>
      <textarea class="form-control" placeholder="Default input" rows="4" cols="50" v-model="rejectedMessage"></textarea>
    </div>
  </template>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div class="d-flex justify-content-end pb-3">
        <button @click="cancelChanges" style="margin-right: 20px; justify-content: end"  class="btn btn-secondary" type="button">Cancel</button>

    <button @click="saveChanges" class="btn btn-primary" type="button">Save</button>
  </div>
  </template>
  
      </Modal>
      
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import Modal from "@/components/Modal.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import d$procuAdmin from "@/stores/dashboard/admin/procuAdmin";
import DataTabel from "@/components/datatabels.vue"
import BasePagination from "@/components/BasePagination.vue"


export default {
  name: "procuAdmin",
  components: {
    DataTabel,
    ArgonSwitch,
    Modal,
    BasePagination
  },
  data() {
    return {
      dt: {
      columns: [
      {
          name: 'name',
          th: 'Name',
          render: ({ detailItems }) => detailItems.name,
        },
        {
          name: 'name',
          th: 'Member Name',
          render: ({ user }) => user.name,
          
        },
        {
          name: 'Total',
          th: 'total',
          render: ({ detailItems }) => detailItems.total,
        },
        { name: 'createdAt', th: ' Submit Date' },
        { name: 'status', th: ' Status' },
        
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
    modalDetail: false,
    detail: {},
    rejectedMessage: '', 
    selectedStatus: '' ,
    page: 1

  };
},
  watch: {
    async page() {
      await this.getList();
    },
  },

  computed: {
    ...mapState(d$procuAdmin, ["g$list", "g$pagination"]),
  },
  methods: {
    async saveChanges() {
      if (!this.selectedStatus) {
        console.log("Please select a status.");
        return;
      }

      const data = {
        status: this.selectedStatus,
        reason: this.selectedStatus === 'reject' ? this.rejectedMessage : ''
    };
    await this.a$update(this.detail.id, data);
    
      // Menyembunyikan pop-up setelah berhasil menyimpan
    this.closeModal();
    
    },
    cancelChanges() {
      this.selectedStatus = '';
      this.rejectedMessage = '';
      this.closeModal();
    },
    closeModal() {
      this.modalDetail = false;
      // Reset data or perform any other necessary actions
    },
    async showDetail(item){
        console.log(item);
        // this.detail = {...item};
        this.detail = {...(await this.a$getById(item.id))};
        this.modalDetail = true;
      },

    ...mapActions(d$procuAdmin, ["a$list",
"a$update",
"a$getById",]),
    async getList() {
      try {
        await this.a$list({page: this.page ? this.page - 1 : this.page });
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
