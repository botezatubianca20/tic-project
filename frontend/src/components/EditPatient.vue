<template>
  <div id="editPatient">
    <h3>Edit Patient</h3>
    <div class="form-group col-md-6">

<form  @submit.prevent="updatePatient">
    <div class="form-group">
      <label for="first_name">First name</label>
      <input type="text" class="form-control" id="first_name" placeholder="First name" required>
    </div>
  <div class="form-group">
      <label for="last_name">Last name</label>
      <input type="text" class="form-control" id="last_name" placeholder="Last name" required>
    </div>
  <div class="form-group">
    <label for="age">Age</label>
    <input type="text" class="form-control" id="age" placeholder="Age" required>
  </div>
  <div class="form-group">
    <label for="phone_number">Phone number</label>
    <input type="text" class="form-control" id="phone_number" placeholder="Phone number" required>
  </div>
   <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" placeholder="Email" required>
  </div>
  
  <button type="submit" class="btn btn-info">Submit</button>
    <router-link to="/" class="btn btn-secondary mx-sm-3">Back</router-link>
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
         // preluam din componenta anterioara cheia unica din firebase asociata cu actorul
          key: this.$route.params.key,
          patient: 0
      }
    },
    created () {
       // utilizam verbul get pentru a trimite request catre server si a obtine 
       // un actor pe baza id-ul unui din firebase preluata din componenta anterioara
      this.axios.get('http://localhost:3000/patients/byKey/' + this.key)
        .then(function(response){ //daca primim raspuns de la server initializam actorul
          this.patient = response.body;
        })

    },

    methods: {
      updatePatient () {
         // utilizam verbul put pentru a putea trimite date catre server si a face update la actor
        this.axios.put('http://localhost:3000/patients/' +  this.key, 
        {
            first_name: this.patient.first_name,
            last_name: this.patient.last_name,
            age: this.patient.age,
            email: this.patient.email,
            phone_number: this.patient.phone_number	
        })
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