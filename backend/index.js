const express = require('express')
const app = express()
const port = 3000
var faker = require("faker");
var path = require("path"); 
var firebase = require("firebase");
var cors = require ("cors"); 
var bodyPasrser = require("body-parser");

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





app.listen(port, () => console.log(`App listening on port ${port}!`))