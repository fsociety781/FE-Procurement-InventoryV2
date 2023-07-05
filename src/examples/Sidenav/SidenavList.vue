<template>
  <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      
      <!-- admin -->
      <template v-if="this.g$user.role==='admin'">
      <li class="nav-item">
        <p class="px-4 h6" style="color: white;">MENU</p>
        <sidenav-item
          url="/dashboard/admin"
          :class="getRoute() === 'dashboardadmin' ? 'active' : ''"
          navText="Dashboard"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
        <li class="nav-item">
          <sidenav-item
            url="/dashboard/MemberManagement"
            :class="getRoute() === 'MemberManagement' ? 'active' : ''"
            navText="Member Management"
          >
            <template v-slot:icon>
              <i class="ni ni-bullet-list-67 text-warning text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
      </template>
      <template v-if="this.g$user.role==='admin'">
        <li class="nav-item">
          <sidenav-item
            url="/dashboard/procuAdmin"
            :class="getRoute() === 'procuAdmin' ? 'active' : ''"
            navText="Procurement Management"
          >
            <template v-slot:icon>
              <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
      </template>

      <!-- member -->
      <template v-if="this.g$user.role==='member'">
        <li class="nav-item">
          <p class="px-4 h6" style="color: white;">MENU</p>
          <sidenav-item
            url="/dashboard/member"
            :class="getRoute() === 'dashboardmember' ? 'active' : ''"
            navText="Dashboard"
          >
            <template v-slot:icon>
              <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
        <li class="nav-item">
          <sidenav-item
            url="/dashboard/procurement"
            :class="getRoute() === 'procurement member' ? 'active' : ''"
            navText="Procurement Management"
          >
            <template v-slot:icon>
              <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
      </template>
      
    </ul>
    <li class="mt-3 nav-item">
      <h6
        v-if="this.$store.state.isRTL"
        class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
        :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
      >
        صفحات المرافق
      </h6>
    </li>
    <div class="pt-3 mx-3 mt-3 sidenav-footer">
      <sidenav-card :class="cardBg" textPrimary="Need Help?" textSecondary="Please check our docs" />
    </div>
    <div class="pt-10 mx-3 mt-10 sidenav-footer">
      <ul class="navbar-nav">
        <li class="nav-item">
          <ArgonButton @click="signOut" color="primary" full-width>
            Logout
          </ArgonButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";
import d$auth from "@/stores/auth.js";
import { mapState,mapActions } from "pinia";


export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavItem,
    SidenavCard,
    ArgonButton,
  },
  computed:{
    ...mapState(d$auth,['g$user'])
  },
  methods: {
    ...mapActions(d$auth, ["a$logout"]),
    signOut() {
      this.a$logout();
      this.$router.replace({ name: "Signin" });
    },
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>