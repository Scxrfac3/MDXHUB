<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 mt-5 mb-5 d-block">
        <div class="row mb-3">
          <div class="col-md-4">
            <h3 class="float-left">Activities</h3>
          </div>
          <div class="col-md-8">
            <form class="form-inline my-2 my-lg-0 float-right align-middle" @submit="search">
              <input
                class="form-control mr-sm-2"
                type="search"
                v-model="searchText"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-md-3">
              <h5 class="mb-4">Filter By</h5>
              <div class="form-group mb-3">
                <label class="float-left lead">Topic</label>
                <select class="form-control" v-model="selectedTopicFilter">
                  <option value="none">All</option>
                  <option v-bind:value="topic" v-bind:key="topic" v-for="topic in topics">{{topic}}</option>
                </select>
              </div>
              <div class="form-group mb-3">
                <label class="float-left lead">Price</label>
                <select class="form-control" v-model="selectedPriceFilter">
                  <option value="none">All</option>
                  <option v-bind:value="price" v-bind:key="price" v-for="price in prices">{{price}}</option>
                </select>
              </div>
              <div class="form-group mb-4">
                <label class="float-left lead">Review</label>
                <select class="form-control" v-model="selectedRatingFilter">
                  <option value="none">All</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              <button type="button" class="btn btn-info w-100" v-on:click="filter">Filter</button>
            </div>
            <div class="col-md-9" v-if="viewable.length > 0">
              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col" class="pointer" v-on:click="sortByTopic">Topic</th>
                    <th scope="col" class="pointer" v-on:click="sortByPrice">Price</th>
                    <th scope="col" class="pointer" v-on:click="sortByRating">Review</th>
                  </tr>
                </thead>
                <tbody v-bind:key="single.id" v-for="single in viewable">
                  <tr>
                    <th class="align-middle">{{ single.topic }}</th>
                    <td class="align-middle">{{ single.price }}</td>
                    <td class="align-middle" v-if="single.done">{{ `${single.rating} Star's` }}</td>
                    <td class="align-middle" v-else>
                      <select class="form-control w-50 d-inline align-middle" v-model="rating">
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                      </select>
                      <button
                        type="button"
                        class="btn btn-info d-inline ml-2"
                        v-bind:id="single.id"
                        v-on:click="saveReview"
                      >Save</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-9" v-else>
              <span class="d-block lead text-center mt-5">No Activities Yet!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uuid from "uuid";

export default {
  name: "ParentActivities",
  data() {
    return {
      activities: [],
      viewable: [],
      topics: [],
      prices: [],
      selectedTopicFilter: "none",
      selectedPriceFilter: "none",
      selectedRatingFilter: "none",
      searchText: "",
      rating: "1",
      sortTopic: "ASC",
      sortPrice: "ASC",
      sortRating: "ASC"
    };
  },
  created() {
    let activities = JSON.parse(localStorage.getItem("activities"));
    const userActivitiesRecord = localStorage.getItem("userActivitiesRecord");
    if (activities.length > 0) {
      let newRecord = [];
      let userId = localStorage.getItem("userId");
      let userRecord = userActivitiesRecord
        ? JSON.parse(userActivitiesRecord)
        : [];

      userRecord = userRecord.filter(record => record.userId === userId);
      if (userRecord.length > 0) {
        for (let i = 0; i < activities.length; i++) {
          let findActivity = userRecord.findIndex(
            record => record.activityId === activities[i].id
          );

          if (findActivity === -1) {
            let newObj = {
              id: uuid.v4(),
              userId: userId,
              activityId: activities[i].id,
              topic: activities[i].topic,
              price: activities[i].price,
              rating: 0,
              done: false
            };
            newRecord.push(newObj);
          }
        }
      } else {
        let newRecordsToBePushed = activities.map(act => {
          return {
            id: uuid.v4(),
            userId: userId,
            activityId: act.id,
            topic: act.topic,
            price: act.price,
            rating: 0,
            done: false
          };
        });
        newRecord = newRecordsToBePushed;
      }

      let newUserRecord = [...userRecord, ...newRecord];
      localStorage.setItem(
        "userActivitiesRecord",
        JSON.stringify(newUserRecord)
      );
      this.activities = newUserRecord;
      this.viewable = newUserRecord;
      const topics = newUserRecord.map(record => record.topic);
      this.topics = [...topics];
      const prices = newUserRecord.map(record => record.price);
      this.prices = [...prices];
    }
  },
  methods: {
    search(e) {
      e.preventDefault();
      if (!this.searchText) return (this.viewable = this.activities);

      let textToSearch = this.searchText.toLowerCase();
      let searched = this.viewable.filter(
        activity => activity.topic.toLowerCase().indexOf(textToSearch) !== -1
      );
      this.viewable = searched;
    },
    saveReview(e) {
      e.preventDefault();
      let record = JSON.parse(localStorage.getItem("userActivitiesRecord"));

      let selectedRecord = record.findIndex(rec => rec.id === e.target.id);
      if (selectedRecord === -1) return;

      record[selectedRecord].rating = this.rating;
      record[selectedRecord].done = true;
      this.viewable = record;
      localStorage.setItem("userActivitiesRecord", JSON.stringify(record));
    },
    sortByTopic() {
      let sorted = [];
      if (this.sortTopic === "ASC") {
        sorted = this.viewable.sort((a, b) =>
          a.topic[0] > b.topic[0] ? 1 : b.topic[0] > a.topic[0] ? -1 : 0
        );
        this.sortTopic = "DESC";
      } else {
        sorted = this.viewable.sort((a, b) =>
          a.topic[0] < b.topic[0] ? 1 : b.topic[0] < a.topic[0] ? -1 : 0
        );
        this.sortTopic = "ASC";
      }

      this.viewable = sorted;
    },
    sortByPrice() {
      let sorted = [];
      if (this.sortPrice === "ASC") {
        sorted = this.viewable.sort((a, b) =>
          parseInt(a.price) > parseInt(b.price)
            ? 1
            : parseInt(b.price) > parseInt(a.price)
            ? -1
            : 0
        );
        this.sortPrice = "DESC";
      } else {
        sorted = this.viewable.sort((a, b) =>
          parseInt(a.price) < parseInt(b.price)
            ? 1
            : parseInt(b.price) < parseInt(a.price)
            ? -1
            : 0
        );
        this.sortPrice = "ASC";
      }
      this.viewable = sorted;
    },
    sortByRating() {
      let sorted = [];
      if (this.sortRating === "ASC") {
        sorted = this.viewable.sort((a, b) =>
          parseInt(a.rating) > parseInt(b.rating)
            ? 1
            : parseInt(b.rating) > parseInt(a.rating)
            ? -1
            : 0
        );
        this.sortRating = "DESC";
      } else {
        sorted = this.viewable.sort((a, b) =>
          parseInt(a.rating) < parseInt(b.rating)
            ? 1
            : parseInt(b.rating) < parseInt(a.rating)
            ? -1
            : 0
        );
        this.sortRating = "ASC";
      }
      this.viewable = sorted;
    },
    filter() {
      let filtered = [...this.viewable];
      if (
        this.selectedTopicFilter === "none" &&
        this.selectedPriceFilter === "none" &&
        this.selectedRatingFilter === "none"
      ) {
        filtered = this.activities;
      }

      if (this.selectedTopicFilter !== "none")
        filtered = filtered.filter(
          record => record.topic === this.selectedTopicFilter
        );

      if (this.selectedPriceFilter !== "none")
        filtered = filtered.filter(
          record => record.price === this.selectedPriceFilter
        );

      if (this.selectedRatingFilter !== "none")
        filtered = filtered.filter(
          record => record.rating === this.selectedRatingFilter
        );

      this.viewable = filtered;
    }
  }
};
</script>


<style scoped>
.pointer {
  cursor: pointer;
}
</style>