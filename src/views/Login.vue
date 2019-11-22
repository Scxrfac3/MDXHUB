<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mr-auto ml-auto p-5 d-block">
        <h3>Login</h3>
        <form class="form mt-5" @submit="login">
          <div class="form-group">
            <label class="float-left">Email</label>
            <input type="email" v-model="email" name="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label class="float-left">Password</label>
            <input type="password" name="password" v-model="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100 mt-4">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  created() {
    let checkLogin = localStorage.getItem("loggedIn");
    if (checkLogin) this.$router.push("/");
  },
  methods: {
    login(e) {
      e.preventDefault();
      let users = localStorage.getItem("users");
      if (!users)
        return this.$toasted.show("No user registered with this email!");

      users = JSON.parse(users);
      let userIndex = users.findIndex(user => user.email === this.email);
      if (userIndex === -1)
        return this.$toasted.show("No user registered with this email!");

      if (users[userIndex].password !== this.password)
        return this.$toasted.show("Invalid Password");

      this.$toasted.show("Login Successful!");
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("userId", users[userIndex].id);
      localStorage.setItem("userRole", users[userIndex].type);
      this.$router.go("/");
      //this.$router.push("/");
    }
  }
};
</script>
