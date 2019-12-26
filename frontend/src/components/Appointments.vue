<template>
  <div>
      <h1>Appointments</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <router-link :to="{ name: 'create' }" class="btn btn-primary">Add Appointment</router-link>
          </div>
        </div><br />

        <table class="table table-hover">
            <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="appointment in appointments" :key="appointment.id">
                  <td>{{ appointment.doctor_id }}</td>
                  <td>{{ appointment.patient_id }}</td>
                  <td>{{ new Date(appointment.appointment_date) |  date: 'dd/MM/yyyy' }}</td>
                  <td><router-link :to="{name: 'edit', params: { id: appointment.id }}" class="btn btn-primary">Edit</router-link></td>
                  <td><button class="btn btn-danger">Delete</button></td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          appointments: []
        }
      },
      created() {
      let uri = 'http://localhost:3000/appointments';
      this.axios.get(uri).then(response => {
        this.appointments = response.data;
      });
    }
  }
</script>