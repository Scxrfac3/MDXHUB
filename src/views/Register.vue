<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mr-auto ml-auto p-5 d-block">
        <h3>Register</h3>
        <form class="form mt-5" @submit="register">
          <div class="form-group">
            <label class="float-left">First Name</label>
            <input
              type="text"
              name="firstName"
              v-model="firstName"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label class="float-left">Last Name</label>
            <input
              type="text"
              name="lastName"
              v-model="lastName"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label class="float-left">Email</label>
            <input
              type="email"
              name="email"
              v-model="email"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label class="float-left">Password</label>
            <input
              type="password"
              name="password"
              v-model="password"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label class="float-left">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              v-model="confirmPassword"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label class="float-left">User Type</label>
            <select class="form-control" name="type" v-model="type" required>
              <option value="Parent">Parent/Student</option>
              <option value="Provider">Service Provider</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary w-100 mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import uuid from "uuid";

export default {
  name: "Register",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "",
      users: []
    };
  },
  created() {
    const users = localStorage.getItem("users");
    if (users) this.users = JSON.parse(users);
  },
  methods: {
    register(e) {
      e.preventDefault();
      if (this.password !== this.confirmPassword)
        return this.$toasted.show("Password doesn't match!!");

      let alreadyUsers = this.users.findIndex(
        user => this.email === user.email
      );
      if (alreadyUsers !== -1)
        return this.$toasted.show("User with email alredy exists!");

      const newUser = {
        id: uuid.v4(),
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        type: this.type
      };
      this.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(this.users));
      this.$toasted.show("User registered successfully!");

      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.type = "";
    }
  }
};
</script>
