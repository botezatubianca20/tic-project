<template>
  <div id="editAppointment">
    <h3>Edit Appointment</h3>
    <div class="form-group col-md-6">

<form  @submit.prevent="updateAppointment">
    <div class="form-group">
        <label for="last_name">Date</label>
       <date-picker name="date" v-model="date" :config="options" required></date-picker>
    </div>
  <div class="form-group">
      <label for="hour">Hour</label>
      <input type="text" class="form-control" id="hour" placeholder="Hour" required v-model="appointment.hour">
    </div>

  <div class="form-group">
      <label >Pacient</label>
    <div>
    <b-form-select v-model="appointment.patient_id" :options="patients"></b-form-select>
  </div>
  </div>
 
  <div class="form-group">
      <label >Doctor</label>
    <div>
    <b-form-select v-model="appointment.doctor_id" :options="doctors"></b-form-select>
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
    name: 'editAppointment',
    data () {
      return {
          key: this.$route.params.key,
          appointment: this.$route.params.appointment,
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
      updateAppointment: function() {
        this.axios.put('http://localhost:3000/appointments/' + this.key, {
            appointment_date: new Date(this.date).getTime(),
            hour: this.appointment.hour,
            patient_id: this.appointment.patient_id,
            doctor_id: this.appointment.doctor_id
        })
        .then(function(){ 
            alert("The appointment has been updated!");
        })
        .catch(function(error){
            alert(error);
          })
      }
    }

  }
</script>