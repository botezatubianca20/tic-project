<template>
  <div>
      <h1>Patients</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <router-link :to="{ name: 'create' }" class="btn btn-primary">Add Patient</router-link>
          </div>
        </div><br />

        <table class="table table-hover">
            <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="patient in patients" :key="patient.id">
                  <td>{{ patient.first_name }}</td>
                  <td>{{ patient.last_name }}</td>
                  <td>{{ patient.age }}</td>
                  <td>{{ patient.phone_number }}</td>
                  <td>{{ patient.email }}</td>
                  <td><router-link :to="{name: 'edit', params: { id: patient.id }}" class="btn btn-primary">Edit</router-link></td>
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
          patients: []
        }
      },
      created() {
      let uri = 'http://localhost:3000/patients';
      this.axios.get(uri).then(response => {
        this.patients = response.data;
      });
    }
  }
</script>