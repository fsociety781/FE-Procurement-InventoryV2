<template>
  <div
    v-show="this.$store.state.layout === 'default'"
    class="min-height-300 position-absolute w-100"
    :class="`${this.$store.state.darkMode ? 'bg-transparent' : 'bg-dark'}`  " 
  />
  <aside
    class="overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs"
    :class="`${
      this.$store.state.isRTL
        ? 'me-3 rotate-caret fixed-end'
        : 'fixed-start'
    } 
    ${
      this.$store.state.layout === 'landing'
        ? 'bg-transparent'
        : 'bg-dark'
    } ${this.$store.state.sidebarType}`"
    id="sidenav-main"
  >
    <div class="sidenav-header" >
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <router-link class="m-0 navbar-brand" to="/">
        <img
          :src="logo"
          class="navbar-brand-img h-100"
          alt="main_logo"
          style="max-height: fit-content;"
        />
      </router-link>
    </div>
    <!-- <hr class="mt-0 horizontal dark" /> -->
    <sidenav-list :cardBg="custom_class" />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo.png";
// import logoWhite from "@/assets/img/logo-ct.png";
export default {
  name: "index",
  components: {
    SidenavList
  },
  data() {
    return {
      logo,
    };
  },
  props: ["custom_class", "layout"]
};
</script>
