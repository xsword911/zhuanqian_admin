import "core-js/stable";
import "regenerator-runtime/runtime";
import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import "./plugins";

if (process.env.NODE_ENV === "test") {
  const { mockXHR } = require("../mock/static");
  mockXHR();
}
require("es6-promise").polyfill();
Vue.config.productionTip = false;

new Vue({
  el: "#vue-admin-beautiful",
  router,
  store,
  render: (h) => h(App),
});
