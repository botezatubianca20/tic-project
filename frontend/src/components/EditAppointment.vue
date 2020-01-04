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
    <b-form-select v-model="selectedPatient" :options="patientsNames"></b-form-select>
  </div>
  </div>
 
  <div class="form-group">
      <label >Doctor</label>
    <div>
    <b-form-select v-model="selectedDoctor" :options="doctorsNames"></b-form-select>
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
          doctorsValues: [],
          patientsValues: [], 
          patientsNames: [],
          doctorsNames: [],
          selectedPatient: this.$route.params.appointment.patient_id,
          selectedDoctor: this.$route.params.appointment.doctor_id,
          hour: "",
          last_name: "",
          age: "",
          date: null,
            options: {
            format: 'MM/DD/YYYY',
             }
      }
    },
 components: {
      datePicker
    },
    created: function() {
      this.axios.get('http://localhost:3000/patients').then(response => {
        this.patients = response.data;
        this.patientsValues = Object.values(this.patients);
        var patientsKeys = Object.keys(this.patients);
        for(var i=0; i<patientsKeys.length; i++){
          this.patientsNames.push({value: patientsKeys[i], text: this.patientsValues[i].last_name + ' ' + this.patientsValues[i].first_name})
        }
      });
      this.axios.get('http://localhost:3000/doctors').then(response => {
        this.doctors = response.data;
        this.doctorsValues = Object.values(this.doctors);
        var doctorsKeys = Object.keys(this.doctors);
        for(var i=0; i<doctorsKeys.length; i++){
          this.doctorsNames.push({value: doctorsKeys[i], text: this.doctorsValues[i].last_name + ' ' + this.doctorsValues[i].first_name})
        }
      });
    },

    methods: {
      updateAppointment: function() {
        this.axios.put('http://localhost:3000/appointments/' + this.key, {
            appointment_date: new Date(this.date).getTime(),
            hour: this.appointment.hour,
            patient_id: this.selectedPatient,
            doctor_id: this.selectedDoctor
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