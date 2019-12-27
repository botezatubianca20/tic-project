<template>
  <div id="editDoctor">
    <h3>Edit Doctor</h3>
    <div class="form-group col-md-6">

<form  @submit.prevent="updateDoctor">
    <div class="form-group">
      <label for="first_name">First name</label>
      <input type="text" class="form-control" id="first_name" placeholder="First name" required  v-model="doctor.first_name">
    </div>
  <div class="form-group">
      <label for="last_name">Last name</label>
      <input type="text" class="form-control" id="last_name" placeholder="Last name" required v-model="doctor.last_name">
    </div>
  <div class="form-group">
    <label for="age">Age</label>
    <input type="text" class="form-control" id="age" placeholder="Age" required v-model="doctor.age">
  </div>
  <div class="form-group">
    <label for="phone_number">Phone number</label>
    <input type="text" class="form-control" id="phone_number" placeholder="Phone number" required v-model="doctor.phone_number">
  </div>
   <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" placeholder="Email" required v-model="doctor.email">
  </div>
    <div class="form-group">
    <label for="specialization">Specialization</label>
    <input type="text" class="form-control" id="specialization" placeholder="Specialization" required v-model="doctor.specialization">
  </div>
  
  <button type="submit" class="btn btn-info">Submit</button>
    <router-link to="/doctors" class="btn btn-secondary mx-sm-3">Back</router-link>
</form>

<br>

  </div>
  </div>
</template>


<script>
  export default {
    name: 'editDoctor',
    data () {
      return {
          key: this.$route.params.key,
          doctor: this.$route.params.doctor
      }
    },

    methods: {
      updateDoctor: function() {
        this.axios.put('http://localhost:3000/doctors/' +  this.key, this.doctor)
        .then(function(){ 
            alert("The doctor has been updated!");
        })
        .catch(function(error){
            alert(error);
          })
      }
    }

  }
</script>