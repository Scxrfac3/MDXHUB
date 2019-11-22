<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mr-auto ml-auto p-5 d-block">
        <h3>Add Activity</h3>
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
  name: "AddActivities",
  data() {
    return {
      topic: "",
      price: "",
      location: "",
      time: "",
      duration: "",
      activities: []
    };
  },
  created() {
    const activities = localStorage.getItem("activities");
    if (activities) this.activities = JSON.parse(activities);
  },
  methods: {
    add(e) {
      e.preventDefault();
      if (this.price <= 0)
        return this.$toasted.show("Price must be greater than zero!!");

      let alreadyExist = this.activities.findIndex(
        activity => this.topic === activity.topic
      );
      if (alreadyExist !== -1)
        return this.$toasted.show("Activity already exists!");

      const newActivities = {
        id: uuid.v4(),
        topic: this.topic,
        price: this.price,
        location: this.location,
        time: this.time,
        duration: this.duration
      };
      this.activities.push(newActivities);
      localStorage.setItem("activities", JSON.stringify(this.activities));
      this.$toasted.show("Activity added successfully!");

      this.topic = "";
      this.price = "";
      this.location = "";
      this.time = "";
      this.duration = "";
    }
  }
};
</script>
