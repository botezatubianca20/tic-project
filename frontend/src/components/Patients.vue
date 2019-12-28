<template>
  <div>
      <h1>Patients</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <router-link :to="{ name: 'newPatient' }" class="btn btn-primary">Add Patient</router-link>
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
                <tr v-for="(patient, index) in patients" v-bind:key="index">
                  <td>{{ patient.first_name }}</td>
                  <td>{{ patient.last_name }}</td>
                  <td>{{ patient.age }}</td>
                  <td>{{ patient.phone_number }}</td>
                  <td>{{ patient.email }}</td>
                  <td><router-link :to="{name: 'editPatient', params: { key: index, patient: patient }}" class="btn btn-primary">Edit</router-link></td>
                  <td><button class="btn btn-danger" @click="deletePatient(index)">Delete</button></td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
import firebase from 'firebase'
  export default {
      data() {
        return {
          patients: []
        }
      },
      created: function() {
        const token =  firebase.auth().currentUser.getIdToken();
      this.axios.get('http://localhost:3000/patients', {headers:  
          { authorization: `Bearer ${token}` }}).then(response => {
        this.patients = response.data;
      });
    },
    methods: {
    deletePatient: function(key) {
      this.axios.delete("http://localhost:3000/patients/" + key).then(() => {
           this.axios.get('http://localhost:3000/patients').then(response => {
          this.patients = response.data;
      });
        });
    }
    }
  }
</script>