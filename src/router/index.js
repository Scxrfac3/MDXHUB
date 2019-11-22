import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/provider/classes/add",
    name: "add_classes",
    component: () => import("../views/provider/AddClass.vue")
  },
  {
    path: "/provider/classes/edit/:id",
    name: "edit_classes",
    component: () => import("../views/provider/EditClass.vue")
  },
  {
    path: "/provider/classes",
    name: "manage_classes",
    component: () => import("../views/provider/Classes.vue")
  },
  {
    path: "/provider/activities/add",
    name: "add_activities",
    component: () => import("../views/provider/AddActivities.vue")
  },
  {
    path: "/provider/activities/edit/:id",
    name: "edit_activities",
    component: () => import("../views/provider/EditActivity.vue")
  },
  {
    path: "/provider/activities",
    name: "manage_activities",
    component: () => import("../views/provider/Activities.vue")
  },
  {
    path: "/parent/classes",
    name: "classes",
    component: () => import("../views/parent/Classes.vue")
  },
  {
    path: "/parent/activities",
    name: "activities",
    component: () => import("../views/parent/Activities.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
