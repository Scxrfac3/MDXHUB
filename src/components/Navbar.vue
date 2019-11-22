<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">
      <span class="text-dark">e</span>SCHOOL
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" v-if="!loggedIn">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="!loggedIn">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn && userType === 'Parent'">
          <router-link to="/parent/activities" class="nav-link">Activities</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn && userType === 'Parent'">
          <router-link to="/parent/classes" class="nav-link">Classes</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn && userType === 'Provider'">
          <router-link to="/provider/activities" class="nav-link">Activities</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn && userType === 'Provider'">
          <router-link to="/provider/classes" class="nav-link">Classes</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
          <a class="nav-link pointer" v-on:click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      loggedIn: false,
      userType: ""
    };
  },
  mounted() {
    let checkLogin = localStorage.getItem("loggedIn");
    if (checkLogin) this.loggedIn = true;

    let checkType = localStorage.getItem("userRole");
    if (checkType) this.userType = checkType;
  },
  methods: {
    logout() {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userRole");
      this.$router.push("/");
      //setTimeout(() => this.$router.push("/"), 2000);
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
