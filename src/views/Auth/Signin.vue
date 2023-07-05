<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100" style="background-color: #F5F8FA;" >
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start" style="background-color: #F5F8FA;">
                  <img :src="imm" class="col-xl-12 mb-3">
                  <h5 class="font-weight-bolder">Login</h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent="submitLogin">
                    <div class="mb-3">
                      <p>Username</p>
                      <argon-input
                        type="text"
                        v-model="input.username"
                        placeholder="Username"
                        name="username"
                        size="lg"
                      />
                    </div>
                    <div class="mb-3">
                      <p>Password</p>
                      <argon-input
                        type="password"
                        v-model="input.password"
                        placeholder="Password"
                        name="password"
                        size="lg"
                      />
                    </div>
                    <argon-switch id="rememberMe">Remember me</argon-switch>

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        style="background-color: #246AFC;"
                        fullWidth
                        size="lg"
                        type="submit"
                        >Login</argon-button
                      >
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="top-0 col-6 position-absolute end-0 ">
                <img :src="procu" class="img-fluid" style="position:absolute; " >
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import imm from "@/assets/img/imm.png"
import procu from "@/assets/img/procu.png"
import Signup from "@/views/Auth/Signup.vue";
import d$auth from "@/stores/auth";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapState,mapActions } from "pinia";

export default {
  name: "signin",
  components: {
    Navbar,
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
    Signup,
  },
  data: () => ({
    //Input
    input: {
      username: "",
      password: "",
    },
    imm, 
    procu,
  }),
  computed: {
    ...mapState(d$auth,['g$user'])
  },
  methods: {
    ...mapActions(d$auth, ["a$login"]),
    async submitLogin() {
      try {
        await this.a$login({ ...this.input });
        this.g$user.role==='member'? this.$router.replace ({ name: "dashboardmember" }): 
        this.$router.replace({name: "dashboardadmin"})
      } catch (e) {
        console.error(e);
        window.alert("Login Failed. Please Try again\n" + e);
      }
    },
  },

  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  mounted() {
    this.g$user.role==='member'? this.$router.replace ({ name: "dashboardmember" }): 
    this.$router.replace({name: "dashboardadmin"})
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
