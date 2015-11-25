//Problem: Hints are shown even when form is valid
//Solution: Hide and show them at appropriate times

var $email= $("#email");
var $password = $("#password_");
$(document).ready(function() {	
	   $(".span_style").hide();
	   $('.sign_in_button').prop('disabled', true);

});

function passwordEvent(){
	var isEmailValid = false;
	var isPwdValid = false;
	if(($email.val().indexOf('@')==-1)||($email.val().indexOf('.')==-1) || ($email.val().indexOf('')==-1))
	{	
		$email.next().show();
	}else{
		$email.next().hide();
		isEmailValid = true;		
	}
	
    //Find out if password is valid  
    if($password.val().length > 0) {
      //Hide hint if valid
      $password.next().hide();
	  isPwdValid = true;
    } else {
      //else show hint
      $password.next().show();
    }
	
	if (isEmailValid && isPwdValid) {
		$('.sign_in_button').prop('disabled', false);	
	}
}

//When event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent); 
//When event happens on confirmation input

$(document).ready(function(){


});
	
/*var express = require("express"),
    http = require("http"),
    appTest;
	
var bodyParser = require("body-parser");

var mongoose = require("mongoose");

// create our server - listen on port 3030
appTest = express();
http.createServer(appTest).listen(3030);

//set up static file directory - acts as default routing for server
appTest.use(express.static(__dirname + "/app"));
appTest.use(bodyParser());

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
//define Mongoose schema for notes
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("mongoose connected");
});

appTest.post("/app.html", function(req, res) {
console.log("gone to get method");
Note.find({"email":req.body.email,"password":req.body.password}, function (error, result)
{
	
	if (error !== null)
	{
	console.log(error);
	res.send("invalid login!!!Please try again");
	}

	else
	{
	console.log("find");
		
	}
	console.log(result.length);
	if(result.length==0)
	{
		console.log("could not find");
		
	}
	else{
		console.log("found match "+result);
	}

});
});*/









