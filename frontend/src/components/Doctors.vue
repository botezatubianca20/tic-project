<template>
  <div>
      <h1>Doctors</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <router-link :to="{ name: 'newDoctor' }" class="btn btn-primary">Add Doctor</router-link>
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
                <tr v-for="(doctor, index) in doctors" :key="index">
                  <td>{{ doctor.first_name }}</td>
                  <td>{{ doctor.last_name }}</td>
                  <td>{{ doctor.age }}</td>
                  <td>{{ doctor.phone_number }}</td>
                  <td>{{ doctor.email }}</td>
                  <td>{{ doctor.specialization }}</td>
                  <td><router-link :to="{name: 'editDoctor', params: { key: index, doctor: doctor }}" class="btn btn-primary">Edit</router-link></td>
                  <td><button class="btn btn-danger" @click="deleteDoctor(index)" >Delete</button></td>
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
      this.axios.get('http://localhost:3000/doctors').then(response => {
        this.doctors = response.data;
      });
    },
    methods: {
    deleteDoctor: function(key) {
      this.axios.delete("http://localhost:3000/doctors/" + key).then(() => {
           this.axios.get('http://localhost:3000/doctors').then(response => {
          this.doctors = response.data;
      });
        });
    }
    }
  }
</script>