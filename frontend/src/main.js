import Vue from "vue";
import App from "./App.vue";
import * as firebase from "firebase";
import router from "./routes/index";
import store from "./store";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;

const configOptions = {
  apiKey: "AIzaSyACpltbqxrDKDoqUf-IO0N7ZF5Eps-FWyU",
  authDomain: "ticproject-5936a.firebaseapp.com",
  databaseURL: "https://ticproject-5936a.firebaseio.com",
  projectId: "ticproject-5936a",
  storageBucket: "ticproject-5936a.appspot.com",
  messagingSenderId: "764982610729",
  appId: "1:764982610729:web:c87175130343502adb0538",
  measurementId: "G-8X38VKE306"
};

firebase.initializeApp(configOptions);


firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");