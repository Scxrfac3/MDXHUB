<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 mt-5 mb-5 d-block">
        <div class="row">
          <div class="col-md-8"><h3 class="float-left">Activities</h3></div>
          <div class="col-md-4">
            <button class="btn btn-primary float-right" v-on:click="add">
              Add Activity
            </button>
          </div>
        </div>
        <div v-if="activities.length > 0">
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">Topic</th>
                <th scope="col">Price</th>
                <th scope="col">Location</th>
                <th scope="col">Time</th>
                <th scope="col">Duration</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody v-bind:key="single.id" v-for="single in activities">
              <tr>
                <th class="align-middle">{{ single.topic }}</th>
                <td class="align-middle">{{ single.price }}</td>
                <td class="align-middle">{{ single.location }}</td>
                <td class="align-middle">{{ single.time }}</td>
                <td class="align-middle">{{ single.duration }}</td>
                <td>
                  <button
                    class="btn btn-secondary"
                    v-bind:id="single.id"
                    v-on:click="edit"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger ml-2"
                    v-bind:id="single.id"
                    v-on:click="del"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <span class="d-block lead text-center mt-5">No Activities Yet!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activities",
  data() {
    return {
      activities: []
    };
  },
  created() {
    const activities = localStorage.getItem("activities");
    if (activities) {
      let parsed = JSON.parse(activities);
      this.activities = parsed;
    }
  },
  methods: {
    add(e) {
      e.preventDefault();
      this.$router.push({ path: "activities/add" });
    },
    edit(e) {
      e.preventDefault();
      //console.log("ID", e.target.id);
      this.$router.push({ path: `activities/edit/${e.target.id}` });
    },
    del(e) {
      e.preventDefault();

      let newActivities = this.activities.filter(
        activity => activity.id !== e.target.id
      );
      localStorage.setItem("activities", JSON.stringify(newActivities));
      this.activities = newActivities;
      this.$toasted.show("Activities deleted successfully!");
    }
  }
};
</script>
