//Problem: Hints are shown even when form is valid
//Solution: Hide and show them at appropriate times
var $email= $("#email");
var $password = $("#password_");
var $confirmPassword = $("#confirm_password");


//Hide hints
$("form span").hide();

function passwordEvent(){	
	
	if(($email.val().indexOf('@')==-1)||($email.val().indexOf('.')==-1) || ($email.val().indexOf('')==-1))
	{			
		$email.next().show();
	}else{
		$email.next().hide();
	}
	
    //Find out if password is valid  
    if($password.val().length > 5) {
      //Hide hint if valid
      $password.next().hide();
    } else {
      //else show hint
      $password.next().show();
    }
    
	
}

function confirmPasswordEvent() {
  //Find out if password and confirmation match
  if($password.val() === $confirmPassword.val()) {
    //Hide hint if match
    $confirmPassword.next().hide();
  } else {
    //else show hint 
    $confirmPassword.next().show();
  }
}



//When event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent).focus(confirmPasswordEvent).keyup(confirmPasswordEvent);
//When event happens on confirmation input
$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent);

/*
$("#signUpForm").submit(function(){
	alert("You have successfully login");
});
*/






	
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

var NoteSchema = mongoose.Schema({
"email": String,
"password": String
});

//model note
var Note = mongoose.model("Note", NoteSchema);

appTest.post("/", function(req, res) {
var newNote = new Note({
"email":req.body.email,
"password":req.body.password
});
newNote.save(function (error, result) {
if (error !== null)
	{
console.log(error);
res.send("error reported");
}

else {
console.log("success");

Note.find({}, function (error, result) {

})
}
});
});*/












