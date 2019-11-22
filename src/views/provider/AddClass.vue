<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mr-auto ml-auto p-5 d-block">
        <h3>Add Class</h3>
        <form class="form mt-5" @submit="add">
          <div class="form-group">
            <label class="float-left">Topic</label>
            <input
              type="text"
              name="topic"
              v-model="topic"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label class="float-left">Price</label>
            <input
              type="number"
              name="price"
              v-model="price"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label class="float-left">Location</label>
            <input
              type="text"
              name="location"
              v-model="location"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label class="float-left">Time</label>
            <input
              type="text"
              name="time"
              v-model="time"
              class="form-control"
              placeholder="Example: Every Sunday at 4PM"
              required
            />
          </div>
          <div class="form-group">
            <label class="float-left">Duration</label>
            <input
              type="text"
              name="length"
              v-model="duration"
              class="form-control"
              placeholder="Example: 1 Hour"
              required
            />
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
  name: "AddClass",
  data() {
    return {
      topic: "",
      price: "",
      location: "",
      time: "",
      duration: "",
      classes: []
    };
  },
  created() {
    const classes = localStorage.getItem("classes");
    if (classes) this.classes = JSON.parse(classes);
  },
  methods: {
    add(e) {
      e.preventDefault();
      if (this.price <= 0)
        return this.$toasted.show("Price must be greater than zero!!");

      let alreadyClass = this.classes.findIndex(
        className => this.topic === className.topic
      );
      if (alreadyClass !== -1)
        return this.$toasted.show("Class already exists!");

      const newClass = {
        id: uuid.v4(),
        topic: this.topic,
        price: this.price,
        location: this.location,
        time: this.time,
        duration: this.duration
      };
      this.classes.push(newClass);
      localStorage.setItem("classes", JSON.stringify(this.classes));
      this.$toasted.show("Class added successfully!");

      this.topic = "";
      this.price = "";
      this.location = "";
      this.time = "";
      this.duration = "";
    }
  }
};
</script>
