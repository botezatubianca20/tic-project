<template>
  <div>
      <h1>Appointments</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <router-link :to="{ name: 'newAppointment' }" class="btn btn-primary">Add Appointment</router-link>
          </div>
        </div><br />

        <table class="table table-hover">
            <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Hour</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(appointment, index, i) in appointments" :key="index">
                  <td>{{ values[i].patient_name }}</td>
                  <td>{{ values[i].doctor_name }}</td>
                  <td>{{ new Date(appointment.appointment_date)  }}</td>
                  <td>{{ appointment.hour  }}</td>
                  <td><router-link :to="{name: 'editAppointment', params: { key: index, appointment: appointment }}" class="btn btn-primary">Edit</router-link></td>
                  <td><button class="btn btn-danger" @click="deleteAppointment(index)">Delete</button></td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          appointments: [],
          values: [],
        }
      },
      created() {
      this.axios.get('http://localhost:3000/appointments').then(response => {
        this.appointments = response.data;
        this.values = Object.values(this.appointments);
       this.values.forEach(async val => {
          var resPatient = await this.axios.get('http://localhost:3000/patients/byKey/' +  val.patient_id);
          this.$set(val, 'patient_name', resPatient.data)
          var resDoctor = await this.axios.get('http://localhost:3000/doctors/byKey/' +  val.doctor_id);
          this.$set(val, 'doctor_name', resDoctor.data)
        });
      });
    },
    methods: {
    deleteAppointment: function(key) {
      this.axios.delete("http://localhost:3000/appointments/" + key).then(() => {
           this.axios.get('http://localhost:3000/appointments').then(response => {
          this.appointments = response.data;
      });
        });
    },

    }
  }
</script>