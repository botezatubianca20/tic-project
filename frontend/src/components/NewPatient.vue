<template>
  <div id="addPatient">
    <h3>Edit Patient</h3>
    <div class="form-group col-md-6">

<form  @submit.prevent="addPatient">
    <div class="form-group">
      <label for="first_name">First name</label>
      <input type="text" class="form-control" id="first_name" placeholder="First name" required  v-model="first_name">
    </div>
  <div class="form-group">
      <label for="last_name">Last name</label>
      <input type="text" class="form-control" id="last_name" placeholder="Last name" required v-model="last_name">
    </div>
  <div class="form-group">
    <label for="age">Age</label>
    <input type="text" class="form-control" id="age" placeholder="Age" required v-model="age">
  </div>
  <div class="form-group">
    <label for="phone_number">Phone number</label>
    <input type="text" class="form-control" id="phone_number" placeholder="Phone number" required v-model="phone_number">
  </div>
   <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" placeholder="Email" required v-model="email">
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
    name: 'addPatient',
    data () {
      return {
          first_name: "",
          last_name: "",
          age: "",
          phone_number: "",
          email: ""
      }
    },


    methods: {
      addPatient: function() {
        this.axios.post('http://localhost:3000/patients/add', {
          first_name: this.first_name,
          last_name: this.last_name,
          age: this.age,
          phone_number: this.phone_number,
          email: this.email
        })
        .then(function(){ 
            alert("The patient has been added!");
        })
        .catch(function(error){
            alert(error);
          })
      }
    }

  }
</script>