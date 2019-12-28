<template>
  <div id="addAppointment">
    <h3>New Appointment</h3>
    <div class="form-group col-md-6">

<form  @submit.prevent="addAppointment">
    <div class="form-group">
        <label for="last_name">Date</label>
       <date-picker name="date" v-model="date" :config="options" required></date-picker>
    </div>
  <div class="form-group">
      <label for="hour">Hour</label>
      <input type="text" class="form-control" id="hour" placeholder="Hour" required v-model="hour">
    </div>

  <div class="form-group">
      <label >Pacient</label>
    <div>
    <b-form-select v-model="selectedPatient" :options="patients"></b-form-select>
  </div>
  </div>
 
  <div class="form-group">
      <label >Doctor</label>
    <div>
    <b-form-select v-model="selectedDoctor" :options="doctors"></b-form-select>
  </div>
  </div>


  
  <button type="submit" class="btn btn-info">Submit</button>
    <router-link to="/appointments" class="btn btn-secondary mx-sm-3">Back</router-link>
</form>

<br>

  </div>
  </div>
</template>


<script>
import datePicker from 'vue-bootstrap-datetimepicker';
  import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
  export default {
    name: 'addDoctor',
    data () {
      return {
          patients: [],
          doctors: [],
          selectedPatient: null,
          selectedDoctor: null,
          hour: "",
          last_name: "",
          age: "",
          date: null,
            options: {
            format: 'DD/MM/YYYY',
             }
      }
    },
 components: {
      datePicker
    },
    created: function() {
      this.axios.get('http://localhost:3000/patients').then(response => {
        this.patients = response.data;
      });
      this.axios.get('http://localhost:3000/doctors').then(response => {
        this.doctors = response.data;
      });
    },

    methods: {
      addAppointment: function() {
        this.axios.post('http://localhost:3000/appointments/add', {
            appointment_date: this.date,
            doctor_id: this.selectedDoctor,
            patient_id: this.selectedPatient
        })
        .then(function(){ 
            alert("The appointment has been added!");
        })
        .catch(function(error){
            alert(error);
          })
      }
    }

  }
</script>