const express = require('express')
const app = express()
const request = require('supertest')
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


var db = admin.database();
var doctorsTable = db.ref("doctors");
var patientsTable = db.ref("patients");
var appointmentsTable = db.ref("appointments");

test('[GET] Testing /doctors api', () => {
    app.get("/doctors", function (req, res) {
        doctorsTable.once('value', (snapshot) => {
            expect(snpashot.val).toBe(!null);
        })
    })
})

test('[GET] Testing /patients api', () => {
    app.get("/patients", function (req, res) {
        patientsTable.once('value', (snapshot) => {
            expect(snapshot.val).toBe(!null);
        })
    })
})

test('[GET] Testing /appointments api', () => {
    app.get("/appointments", function (req, res) {
        appointmentsTable.once('value', (snapshot) => {
            expect(snapshot.val).toBe(!null);
        })
    })
})

test('[GET] Testing /patients/byKey/:key api', () => {
    app.get("/patients/byKey/:key", function (req, res) {
        var key = req.params.key;
        patientsTable.child(key).once('value').then((snapshot) => {
            expect(snapshot.val).toBe(!null);
        })
    })
})

test('[GET] Testing /doctors/byKey/:key api', () => {
    app.get("/doctors/byKey/:key", function (req, res) {
        var key = req.params.key;
        doctorsTable.child(key).once('value').then((snapshot) => {
            expect(snapshot.val).toBe(!null);
        })
    })
})

test('[POST] Testing /doctors/add api', (done) => {
    request(app)
        .post('/doctors/add')
        .send({
            first_name: "testFirstNameDoctor",
            last_name: "testLastNameDoctor",
            age: "testAgeDoctor",
            email: 48,
            phone_number: "testPhoneNumberDoctor",
            specialization: "testSpecializationDoctor"
        })
        .expect(201, done);
})

test('[POST] Testing /patients/add api', (done) => {
    request(app)
        .post('/patients/add')
        .send({
            first_name: "testFirstNamePatient",
            last_name: "testLastNamePatient",
            age: 35,
            email: "testEmailPatient",
            phone_number: "testPhoneNumberPatient"
        })
        .expect(201, done);
})

test('[POST] Testing /appointments/add api', (done) => {
    var testDateAppointment = faker.date.future();
    request(app)
        .post('/appointments/add')
        .send({
            patient_id: 1,
            doctor_id: 1,
            appointment_date: new Date(testDateAppointment).getTime(),
            hour: "16:30"
        })
        .expect(201, done);
})

test('[PUT] Testing /doctors/:idDoctor api', (done) => {
    request(app)
        .put('/doctors/' + 1)
        .send({ first_name: "doctorTestName" })
        .expect(200, done);
})

test('[PUT] Testing /patients/:idPatient api', (done) => {
    request(app)
        .put('/patients/' + 1)
        .send({ first_name: "patientTestName" })
        .expect(200, done);
})

test('[PUT] Testing /appointments/:idAppointment api', (done) => {
    request(app)
        .put('/appointments/' + 1)
        .send({ hour: "16:30" })
        .expect(200, done);
})

test('[DELETE] Testing /doctors/:idDoctor api', function (done) {
    request(app)
        .delete('/doctors/' + 1)
        .expect(200, done)
});

test('[DELETE] Testing /patients/:idPatient api', (done) => {
    request(app)
        .delete('/patients/' + 1)
        .expect(200, done)
});

test('[DELETE] Testing /appointments/:idAppointment api', (done) => {
    request(app)
        .delete('/appointments/' + 1)
        .expect(200, done)
});
