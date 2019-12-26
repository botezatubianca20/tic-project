<template>
  <div id="editPatient">
    <h3>Edit Patient</h3>
    <div class="row">
    <form @submit.prevent="updatePatient" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" id="first_name" v-model="patient.first_name" required>
          <label class="active" for="first_name">First Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" id="last_name" v-model="patient.last_name" required>
          <label class="active" for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" id="age" v-model="patient.age" required>
          <label class="active" for="age">Age</label>
        </div>
      </div>
     <div class="row">
        <div class="input-field col s12">
          <input type="text" id="phone_number" v-model="patient.phone_number" required>
          <label class="active" for="phone_number">Phone number</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" id="email" v-model="patient.email" required>
          <label class="active" for="email">Email</label>
        </div>
      </div>
      <button type="submit" class="btn red darken-4">Submit</button>
      <router-link to="/" class="btn grey">Back</router-link>
    </form>
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