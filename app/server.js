
var express = require("express"),
    http = require("http"),
    appTest;
	
var bodyParser = require("body-parser");

var mongoose = require("mongoose");

// create our server - listen on port 3030
appTest = express();
http.createServer(appTest).listen(3030);

// set up static file directory - acts as default routing for server
appTest.use(express.static(__dirname + "/"));
appTest.use(bodyParser());

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("Mongo Connected");
  }
 
});

mongoose.connect('mongodb://localhost/exampleDb');
// define Mongoose schema for notes
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Mongoose Connected");
});

var NoteSchema = mongoose.Schema({
"email": String,
"password": String
});

// model note
var Note = mongoose.model("Note", NoteSchema);


// Getting signup information and putting into the databse
appTest.post("/signup", function(req, res)
{	
	var newNote = new Note({
	"email":req.body.email,
	"password":req.body.password_
	});
	newNote.save(function (error, result) 
	{
		if (error !== null)
		{
		console.log(error);
		res.send("error reported");
		}
	
		else 
		{
			console.log("sign up successfull");
			res.sendfile("app.html");
	
		}
	});
});
	

// Exisitng user login information and checking in the database
appTest.post("/app", function(req, res)
{
	Note.find({"email":req.body.email,"password":req.body.password_}, function (error, result)
	{
		if (error !== null)
		{
		console.log(error);
		}

		if(result.length==0){			
			console.log("invalid login details");
			res.sendfile("index.html");			
		}
		
		else{
			console.log("successfull login");
			res.sendfile("app.html");
		}	
	});
});


 
		
	
	
  







