<template>
  <div class="container px-5 py-5">
    <div class="card shadow">
      <div class="card-header text-start mb-0 pb-0">
        <h5><b>{{ $route.name }}</b></h5>
      </div>
      <div class="card-body">
        <div class="form-group">
          <InputField v-model="form.name" placeholder="Nama Pengajuan"/>
          <InputField v-model="form.url" placeholder="Url"/>
          <InputField v-model="form.description" placeholder="Deskripsi"/>
          <InputField v-model="form.quantity" placeholder="Quantity" />
          <InputField v-model="form.price" placeholder="Price"/>
          <!-- <InputField v-model="form.categoryId" placeholder="Kategori"/> -->
          <select v-model="form.categoryId" class="form-select mb-3">
            <option value="">--pilih kategori--</option>
            <option value="1">barang</option>
            <option value="2">akomodasi</option>
            <option value="3">lainnya</option>
          </select>
          <InputField type="datetime-local" v-model="form.duedate" placeholder="Due date"/>
        </div>
      </div>
      <div class="card-footer p-0 pb-3">
        <div class="d-flex justify-content-end">
          <ButtonComponent @click="this.$router.back()" class="me-2" color="secondary">
            Cancel
          </ButtonComponent>
          <ButtonComponent @click="submitProcurement" color="primary" class="me-2">
            Submit
          </ButtonComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputField from "@/components/ArgonInput.vue";
import ButtonComponent from "@/components/ArgonButton.vue";
import d$procurement from "@/stores/dashboard/member/procurement";
import { mapActions } from "pinia";

export default {
  data() {
    return {
      form: {
        name: "",
        url: "",
        description: "",
        quantity: "",
        price: "",
        categoryId: "",
        duedate: "",
      },
    };
  },
  methods: {
    ...mapActions(d$procurement, ["a$add"]),
    submitProcurement() {
      try {
        // Parsing input quantity ke integer
        this.form.quantity = parseInt(this.form.quantity);
        // Parsing input price ke float
        this.form.price = parseFloat(this.form.price);
        
        this.a$add({ ...this.form })
          .then(() => {
            console.log(this.form);
            this.$router.replace({ name: "procurement member" });
          })
          .catch((e) => {
            console.error(e.response.data.message);
            window.alert(e.response.data.message);
          });
      } catch (e) {
        console.error(e);
        window.alert("Error occurred while submitting the procurement.");
      }
    },
  },
  components: {
    InputField,
    ButtonComponent,
  },
};
</script>