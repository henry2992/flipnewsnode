var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
	"name": String,
	"birthdate": String,
	"email": String,
	"password": String
});

//TODO: Create unique index (email)
var User = mongoose.model("User", UserSchema);

module.exports = User;