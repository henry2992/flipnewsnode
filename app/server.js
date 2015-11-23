
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


// set up routes
// root route
/*
 * appTest.get("/", function(req, res) { res.send("welcome to the 424 server.");
 * });
 */


// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("We are connected yahoooo");
  }
  
  db.collection('test', function(err, collection) {});
   var collection = db.collection('test');
  var doc1 = {'hello':'doc1'};
   collection.insert(doc1);
   
 
});

mongoose.connect('mongodb://localhost/exampleDb');
// define Mongoose schema for notes
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("mongoose connected");
});

var NoteSchema = mongoose.Schema({
"email": String,
"password": String
});

// model note
var Note = mongoose.model("Note", NoteSchema);


// signup information and putting into the databse
appTest.post("/signup", function(req, res)
{
	console.log("/signup SIGNUP IS CALLED........");

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
			console.log("success");
			res.sendfile("app.html");
	
		}
		console.log("SIGNUP ENDING");
	});
});
	

// login information and putting into the databse
appTest.post("/app", function(req, res)
{
	console.log("/news.html LOGIN IS CALLED........");
	Note.find({"email":req.body.email,"password":req.body.password_}, function (error, result)
	{
		if (error !== null)
		{
		console.log(error);
		}

		if(result.length==0){
			res.sendfile("index.html");			
		}
		
		else{
			res.sendfile("app.html");
		}	
	});
});


/*
 * 
 * appTest.post("/news.html", function(req, res) { console.log("/news.html is
 * called 222222 "); res.sendfile("news.html");
 * 
 * });
 * 
 */





/*
 * //login information is checked against the database
 * appTest.post("/news.html", function(req, res) {
 * 
 * console.log("THIS IS FOR LOGIN - working");
 * 
 * console.log("email : " + req.body.email); console.log("password_ : " +
 * req.body.password_);
 * Note.find({"email":req.body.email,"password":req.body.password_}, function
 * (error, result) {
 * 
 * console.log("post news is entered"); if (error !== null) {
 * console.log(error); res.send("invalid login!!!Please try again"); }
 * 
 * else { console.log("find");
 *  }
 * 
 * console.log(result.length); if(result.length==0){ console.log("could not
 * find");
 *  } else{ console.log("found match "+result); res.sendfile("news.html"); }
 * 
 * 
 * 
 * });
 * 
 * });
 * 
 * 
 */



 
		
	
	
  







