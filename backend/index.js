const express = require('express')
const app = express()
const port = 3000
var faker = require("faker");
var path = require("path");
var firebase = require("firebase");
var cors = require("cors");
var bodyPasrser = require("body-parser");
var faker = require("faker");

app.use(bodyPasrser.json());
app.use(bodyPasrser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());


var admin = require("firebase-admin");
var serviceAccount = require("./ticproject-5936a-firebase-adminsdk-5gvit-bbc9ed2a04.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://ticproject-5936a.firebaseio.com"
});

const getAuthToken = (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		req.authToken = req.headers.authorization.split(' ')[1];
	} else {
		req.authToken = null;
	}
	next();
};


const checkIfAuthenticated = (req, res, next) => {
	getAuthToken(req, res, async () => {
		try {
			const { authToken } = req;
			const userInfo = await admin
				.auth()
				.verifyIdToken(authToken);
			req.authId = userInfo.uid;
			return next();
		} catch (e) {
			return res
				.status(401)
				.send({ error: 'You are not authorized to make this request' });
		}
	});
};


var db = admin.database();
var doctorsTable = db.ref("doctors");
var patientsTable = db.ref("patients");
var appointmentsTable = db.ref("appointments");

var counter = 0;
var totalNumber = 0;

app.post('/addData/:number', function (req, res) {
	totalNumber = totalNumber + parseInt(req.params.number);
	for (counter; counter < totalNumber; counter++) {
		var randomFirstNameDoctor = faker.name.firstName();
		var randomLastNameDoctor = faker.name.lastName();
		var randomAgeDoctor = 18 + Math.floor(Math.random() * 50);
		var randomEmailDoctor = faker.internet.email();
		var randomPhoneNumberDoctor = faker.phone.phoneNumber();
		var randomSpecializationDoctor = faker.lorem.word();

		var doctor = doctorsTable.push({
			first_name: randomFirstNameDoctor,
			last_name: randomLastNameDoctor,
			age: randomAgeDoctor,
			email: randomEmailDoctor,
			phone_number: randomPhoneNumberDoctor,
			specialization: randomSpecializationDoctor
		});

		var randomFirstNamePatient = faker.name.firstName();
		var randomLastNamePatient = faker.name.lastName();
		var randomAgePatient = 8 + Math.floor(Math.random() * 70);
		var randomEmailPatient = faker.internet.email();
		var randomPhoneNumberPatient = faker.phone.phoneNumber();

		var patient = patientsTable.push({
			first_name: randomFirstNamePatient,
			last_name: randomLastNamePatient,
			age: randomAgePatient,
			email: randomEmailPatient,
			phone_number: randomPhoneNumberPatient,
		})

		var randomDateAppointment = faker.date.future();
		console.log("randomDateAppointment", randomDateAppointment)
		var randomHourAppointment = '15:30'

		appointmentsTable.push({
			patient_id: patient.key,
			doctor_id: doctor.key,
			appointment_date: new Date(randomDateAppointment).getTime(),
			hour: randomHourAppointment
		})
	}
	res.send("db filled with data");
})


//DE ADAUGAT checkIfAuthenticated la fiecare ruta

//get doctors
app.get("/doctors", function (req, res) {
	doctorsTable.once('value', (snapshot) => {
		res.status(200).send(snapshot.val());
	})
		.catch(() => {
			res.status(500).send();
		})
})

//get patients
app.get("/patients", function (req, res) {
	patientsTable.once('value', (snapshot) => {
		res.status(200).send(snapshot.val());
	})
		.catch(() => {
			res.status(500).send();
		})
})

//get appointments
app.get("/appointments", function (req, res) {
	appointmentsTable.once('value', (snapshot) => {
		res.status(200).send(snapshot.val());
	})
		.catch(() => {
			res.status(500).send();
		})
})



//edit doctor by id
app.put("/doctors/:idDoctor", function (req, res) {
	var key = req.params.idDoctor;
	var data = req.body;
	admin.database().ref('doctors/' + key).set(data);
	res.send('The doctor with the id ' + key + ' has been successflly updated.');
});

//edit patient by id
app.put("/patients/:idPatient", function (req, res) {
	var key = req.params.idPatient;
	var data = req.body;
	admin.database().ref('patients/' + key).set(data);
	res.send('The patient with the id ' + key + ' has been successflly updated.');
});

//edit appointment by id
app.put("/appointments/:idAppointment", function (req, res) {
	var key = req.params.idAppointment;
	var data = req.body;

	data.appointment_date = new Date(data.appointment_date).getTime();

	admin.database().ref('appointments/' + key).set(data);
	res.send('The appointment with the id ' + key + ' has been successflly updated.');
});

//delete doctor by id
app.delete("/doctors/:idDoctor", function (req, res) {
	var key = req.params.idDoctor;
	doctorsTable.child(key).remove();
	res.send('The doctor with the id ' + key + ' has been successflly deleted.');
});

//delete patient by id
app.delete("/patients/:idPatient", function (req, res) {
	var key = req.params.idPatient;
	patientsTable.child(key).remove();
	res.send('The patient with the id ' + key + ' has been successflly deleted.');
});

//delete appointment by id
app.delete("/appointments/:idAppointment", function (req, res) {
	var key = req.params.idAppointment;
	appointmentsTable.child(key).remove();
	res.send('The appointment with the id ' + key + ' has been successflly deleted.');
});

//add doctor
app.post("/doctors/add", function (req, res) {
	var data = req.body;
	doctorsTable.push(data);
	res.send("The doctor has been successfully added.")
});

//add patient
app.post("/patients/add", function (req, res) {
	var data = req.body;
	patientsTable.push(data);
	res.send("The patient has been successfully added.")
});

//add appointment
app.post("/appointments/add", function (req, res) {
	var data = req.body;
	appointmentsTable.push(data);
	res.send("The appointment has been successfully added.")
});


//get patient by key
app.get("/patients/byKey/:key", function (req, res) {
	var key = req.params.key;
	patientsTable.child(key).once('value').then((snapshot) => {
		var name = snapshot.val().first_name + ' ' + snapshot.val().last_name;
		res.status(200).send(name);
	})
		.catch(() => {
			res.status(500).send();
		})
});

//get doctor by key
app.get("/doctors/byKey/:key", function (req, res) {
	var key = req.params.key;
	doctorsTable.child(key).once('value').then((snapshot) => {
		var name = snapshot.val().first_name + ' ' + snapshot.val().last_name;
		res.status(200).send(name);
	})
		.catch(() => {
			res.status(500).send();
		})
});





app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = index;