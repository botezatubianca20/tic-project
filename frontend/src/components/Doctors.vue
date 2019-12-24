<template>
  <div>
      <h1>Doctors</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <router-link :to="{ name: 'create' }" class="btn btn-primary">Add Doctor</router-link>
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
              <th>Specialization</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="doctor in doctors" :key="doctor.id">
                  <td>{{ doctor.first_name }}</td>
                  <td>{{ doctor.last_name }}</td>
                  <td>{{ doctor.age }}</td>
                  <td>{{ doctor.phone_number }}</td>
                  <td>{{ doctor.email }}</td>
                  <td>{{ doctor.specialization }}</td>
                  <td><router-link :to="{name: 'edit', params: { id: doctor.id }}" class="btn btn-primary">Edit</router-link></td>
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
          doctors: []
        }
      },
      created() {
      let uri = 'http://localhost:3000/doctors';
      this.axios.get(uri).then(response => {
        this.doctors = response.data;
      });
    }
  }
</script>