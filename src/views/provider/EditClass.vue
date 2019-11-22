<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mr-auto ml-auto p-5 d-block">
        <h3>Edit Class</h3>
        <form class="form mt-5" @submit="edit">
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
export default {
  name: "EditClass",
  data() {
    return {
      id: "",
      index: "",
      topic: "",
      price: "",
      location: "",
      time: "",
      duration: "",
      classes: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    let classes = localStorage.getItem("classes");
    if (!classes) return;

    classes = JSON.parse(classes);
    this.classes = classes;
    let findClass = classes.findIndex(className => className.id === this.id);

    if (findClass !== -1) {
      this.index = findClass;
      this.topic = classes[findClass].topic;
      this.price = classes[findClass].price;
      this.location = classes[findClass].location;
      this.time = classes[findClass].time;
      this.duration = classes[findClass].duration;
    }
  },
  methods: {
    edit(e) {
      e.preventDefault();
      if (this.price <= 0)
        return this.$toasted.show("Price must be greater than zero!!");

      const newObj = {
        id: this.id,
        topic: this.topic,
        price: this.price,
        location: this.location,
        time: this.time,
        duration: this.duration
      };
      this.classes[this.index] = newObj;
      localStorage.setItem("classes", JSON.stringify(this.classes));
      this.$toasted.show("Class updated successfully!");
      this.$router.push("/provider/classes");
    }
  }
};
</script>
