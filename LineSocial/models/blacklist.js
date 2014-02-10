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

  	var findEmail = function(email, callback) {
	  	var query = { "email" : email };
	  	console.log("query "+JSON.stringify(query));
	    blacklist.find(query, function(err,doc){
	    	console.log("doc "+doc);
			callback(doc);    	
	    });
	};

	return {
		unsubscribe: unsubscribe,
		findEmail: findEmail
	}

}