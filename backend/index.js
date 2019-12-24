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
var appointmentsTable = db.ref("appointments");

var counter = 0;
var totalNumber = 0;

app.post('/addData/:number', function(req, res){
  totalNumber = totalNumber + parseInt(req.params.number);
	for (counter; counter < totalNumber; counter++) {
    var randomIdDoctor = counter
    var randomFirstNameDoctor =  faker.name.firstName();
    var randomLastNameDoctor =  faker.name.lastName();
    var randomAgeDoctor = 18 + Math.floor(Math.random() * 50);
    var randomEmailDoctor = faker.internet.email();
    var randomPhoneNumberDoctor = faker.phone.phoneNumber();
    var randomSpecializationDoctor = faker.lorem.word();

    doctorsTable.push({ 
      id: randomIdDoctor, 
      first_name: randomFirstNameDoctor,
      last_name: randomLastNameDoctor,
      age: randomAgeDoctor,	
      email: randomEmailDoctor,
      phone_number: randomPhoneNumberDoctor,
      specialization: randomSpecializationDoctor
    });

    var randomIdPatient = counter;
    var randomFirstNamePatient =  faker.name.firstName();
    var randomLastNamePatient =  faker.name.lastName();
    var randomAgePatient = 8 + Math.floor(Math.random() * 70);
    var randomEmailPatient = faker.internet.email();
    var randomPhoneNumberPatient = faker.phone.phoneNumber();

    patientsTable.push({
      id: randomIdPatient,
      first_name: randomFirstNamePatient,
      last_name: randomLastNamePatient,
      age: randomAgePatient,	
      email: randomEmailPatient,
      phone_number: randomPhoneNumberPatient,
    })
    
    var randomIdAppointment =  counter;
    var randomDateAppointment = faker.date.future();
    console.log(randomDateAppointment)
    
    appointmentsTable.push({
      id: randomIdAppointment,
      patient_id: randomIdPatient,
      doctor_id: randomIdDoctor,
      appointment_date: new Date(randomDateAppointment).getTime()
    })
  }
  res.send("db filled with data");
})


app.get("/doctors", function(req, res){
	doctorsTable.once('value', (snapshot)=>{
		res.status(200).send(snapshot.val());
	})
	.catch(()=>{
		res.status(500).send();
	})
})

app.get("/patients", function(req, res){
	patientsTable.once('value', (snapshot)=>{
		res.status(200).send(snapshot.val());
	})
	.catch(()=>{
		res.status(500).send();
	})
})

app.get("/appointments", function(req, res){
	appointmentsTable.once('value', (snapshot)=>{
		res.status(200).send(snapshot.val());
	})
	.catch(()=>{
		res.status(500).send();
	})
})





app.listen(port, () => console.log(`App listening on port ${port}!`))