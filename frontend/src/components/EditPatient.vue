<template>
  <div id="editPatient">
    <h3>Edit Patient</h3>
    <div class="form-group col-md-6">

<form  @submit.prevent="updatePatient">
    <div class="form-group">
      <label for="first_name">First name</label>
      <input type="text" class="form-control" id="first_name" placeholder="First name" required  v-model="patient.first_name">
    </div>
  <div class="form-group">
      <label for="last_name">Last name</label>
      <input type="text" class="form-control" id="last_name" placeholder="Last name" required v-model="patient.last_name">
    </div>
  <div class="form-group">
    <label for="age">Age</label>
    <input type="text" class="form-control" id="age" placeholder="Age" required v-model="patient.age">
  </div>
  <div class="form-group">
    <label for="phone_number">Phone number</label>
    <input type="text" class="form-control" id="phone_number" placeholder="Phone number" required v-model="patient.phone_number">
  </div>
   <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" placeholder="Email" required v-model="patient.email">
  </div>
  
  <button type="submit" class="btn btn-info">Submit</button>
    <router-link to="/patients" class="btn btn-secondary mx-sm-3">Back</router-link>
</form>

<br>

  </div>
  </div>
</template>


<script>
  export default {
    name: 'editPatient',
    data () {
      return {
          key: this.$route.params.key,
          patient: this.$route.params.patient
      }
    },

    methods: {
      updatePatient: function() {
        this.axios.put('http://localhost:3000/patients/' +  this.key, this.patient)
        .then(function(){ 
            alert("The patient has been updated!");
        })
        .catch(function(error){
            alert(error);
          })
      }
    }

  }
</script>