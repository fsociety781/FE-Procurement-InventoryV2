<template>
  <div class="container px-5 py-5">
    <div class="card shadow">
      <div class="card-header text-start mb-0 pb-0">
        <h5><b>Create Member</b></h5>
      </div>
      <div class="card-body">
        <div class="form-group">
          <InputField v-model="form.name" placeholder="Name"/>
          <InputField v-model="form.nik" placeholder="NIK"/>
          <InputField v-model="form.phone" placeholder="Nomor Telepon"/>
          <InputField v-model="form.address" placeholder="Alamat"/>
          <InputField v-model="form.username" placeholder="Username"/>
          <InputField v-model="form.email" placeholder="Email"/>
          <InputField v-model="form.password" placeholder="Password"/>
        </div>
      </div>
      <div class="card-footer p-0 pb-3">
        <div class="d-flex justify-content-end">
          <ButtonComponent @click="this.$router.back()" class="me-2" color="secondary">
            Cancel
          </ButtonComponent>
        <ButtonComponent @click="submitMember" color="primary" class="me-2">
          Submit
        </ButtonComponent>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import InputField from '@/components/ArgonInput.vue'
import ButtonComponent from '@/components/ArgonButton.vue'
import d$MemberManagement from '@/stores/dashboard/admin/MemberManagement'
import { mapActions } from "pinia";

export default {
  data() {
    return {
      form: {
        name: "",
        nik: "",
        phone: "",
        address: "",
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(d$MemberManagement, ["a$add"]),
    async submitMember() {
      try {
        await this.a$add({ ...this.form });
        this.$router.replace({ name: "MemberManagement" });
      } catch (e) {
        console.error(e.response.data.message);
        window.alert(e.response.data.message);
      }
    },
  },
  components: {
    InputField, ButtonComponent
  }
}
</script>
  