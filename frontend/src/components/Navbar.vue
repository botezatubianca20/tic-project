<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <router-link to="/" class="navbar-brand">Med Appointments Tool</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">

            <li class="nav-item">
              <router-link to="appointments" class="nav-link">Appointments</router-link>
            </li>
             <li class="nav-item">
              <router-link to="doctors" class="nav-link">Doctors</router-link>
            </li>
            <li class="nav-item">
              <router-link to="patients" class="nav-link">Patients</router-link>
            </li>

            
            <li class="nav-item">
              <a class="nav-link pointer" @click.prevent="signOut">Sign out</a>
            </li>
            <li class="nav-item">
              <a class="nav-link">{{user.data.displayName}}</a>
            </li>

            
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        });
    }
  }
};
</script>

<style>
.pointer{
  cursor: pointer;
}
</style>