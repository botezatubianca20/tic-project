const express = require('express')
const app = express()
const port = 3000
var faker = require("faker");
var path = require("path"); 
var firebase = require("firebase");
var cors = require ("cors"); 
var bodyPasrser = require("body-parser");
var faker = require("faker");

app.use(bodyPasrser.json());
app.use(bodyPasrser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());


var admin = require("firebase-admin");
var serviceAccount = require("./ticproject-5936a-firebase-adminsdk-5gvit-bbc9ed2a04.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ticproject-5936a.firebaseio.com"
});


var db = admin.database();
var doctorsTable = db.ref("doctors");
var patientsTable = db.ref("patients");

var counter = 0;
var totalNumber = 0;

app.get('/addData/:number', function(req, res){
  totalNumber = totalNumber + parseInt(req.params.number);
	for (counter; counter < totalNumber; counter++) {
    var randomIdDoctor = 0 + Math.floor(Math.random()*totalNumber);
    var randomFirstNameDoctor =  faker.name.firstName();
    var randomLastNameDoctor =  faker.name.lastName();
    var randomAgeDoctor = 18 + Math.floor(Math.random() * 50);
    var randomEmailDoctor = faker.internet.email();
    var randomPhoneNumberDoctor = faker.phone.phoneNumber();
    var randomSpecializationDoctor = faker.lorem.word();

    var doctor = doctorsTable.push({ 
      id: randomIdDoctor, 
      first_name: randomFirstNameDoctor,
      last_name: randomLastNameDoctor,
      age: randomAgeDoctor,	
      email: randomEmailDoctor,
      phone_number: randomPhoneNumberDoctor,
      specialization: randomSpecializationDoctor
    });
    console.log(doctor.key); 

    var randomIdPatient = 0 + Math.floor(Math.random()*totalNumber);
    var randomFirstNamePatient =  faker.name.firstName();
    var randomLastNamePatient =  faker.name.lastName();
    var randomAgePatient = 8 + Math.floor(Math.random() * 70);
    var randomEmailPatient = faker.internet.email();
    var randomPhoneNumberPatient = faker.phone.phoneNumber();

    var patient = patientsTable.push({
      id: randomIdPatient,
      first_name: randomFirstNamePatient,
      last_name: randomLastNamePatient,
      age: randomAgePatient,	
      email: randomEmailPatient,
      phone_number: randomPhoneNumberPatient,
    })
    console.log(patient.key); 

    // var appointment = appointmentsTable.push({
    //   id: randomIdAppointment,
    // })
  }
  res.send("db filled with data");

 

})






app.listen(port, () => console.log(`App listening on port ${port}!`))