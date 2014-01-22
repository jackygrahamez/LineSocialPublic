var crypto = require('crypto'),
findOrCreate = require('mongoose-findorcreate');

module.exports = function(mongoose) {
	
  	var Schema = mongoose.Schema,
  	ObjectId = Schema.ObjectId;

  	var userSchema = new mongoose.Schema({
  		email :  { type: String, index: {unique: true, dropDups: true} }
  	});

  	var blacklist = mongoose.model('Blacklist', userSchema);

  	var unsubscribe = function(email, callback) {
	  	var email = new blacklist({ "email" : email });

	    email.save(callback);
	};

	return {
		unsubscribe: unsubscribe
	}

}