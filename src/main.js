import Vue from "vue";
import Toasted from "vue-toasted";
import App from "./App.vue";
import router from "./router";
import "./assets/css/bootstrap.min.css";

const ToastOptions = {
  duration: 3000
};

Vue.config.productionTip = false;
Vue.use(Toasted, ToastOptions);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
