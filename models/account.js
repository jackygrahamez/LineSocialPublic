var crypto = require('crypto'),
findOrCreate = require('mongoose-findorcreate');

module.exports = function(mongoose) {
	
  var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
	
  var userSchema = new mongoose.Schema({
      email:     { type: String, unique: true },
      password:  { type: String },
      username:  { type: String, unique: true },
      name: {
        first:   { type: String },
        last:    { type: String }
      },
      photoUrl:  { type: String },
      check_in: {
    	  cID: ObjectId,
    	  location: { type: String },
    	  geolocation: { type: {}, index: '2dsphere', sparse: true },
    	  line_length: { type: Number },
    	  check_in_time: { type: Date, expires: '24h' },
    	  check_in_expire_time: { type: Date, expires: '24h' }
      }
      
  });
  
  userSchema.plugin(findOrCreate);
  
  var account = mongoose.model('Account', userSchema);

  var login = function(email, password, callback) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);

    account.findOne({email:email,password:shaSum.digest('hex')},function(err,doc){
      callback(doc);
    });

  };

 var register = function(email, password, firstName, lastName, username, callback) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);
    var user = new account({
      email: email,
      name: {
        first: firstName,
        last: lastName
      },
      username: username.toLowerCase(),
      password: shaSum.digest('hex'),
      check_in: ""
    });
    
    account.findOne({username:username},function(err,doc){
        callback(doc);
      });

    user.save(callback);
  };
  
  var passwordUpdate = function(id, password, callback) {
	  console.log("id "+id);
	    var shaSum = crypto.createHash('sha256');
	    shaSum.update(password);
	    var shaPassword = shaSum.digest('hex');
	    var query = { "_id" : id };
	    account.update(query, {"$set" : { "password" : shaPassword }}, function(err,doc){
	    	console.log("update doc "+doc);
	        callback(doc);
	    });

	  };
  
  
  var checkInMethod = function(location, geolocation, line_length, accountId, callback) {
	  	var d1 = new Date(),
	  	  	d2 = new Date(d1);	
	  	var line_length = line_length * 60 * 1000;
	  	var expireTimeStamp = parseInt(d1.getTime()) + parseInt(line_length); 
	  	d2.setTime( expireTimeStamp );
	    var checkIn = new Object();
	    checkIn.cID = crypto.createHash('md5').update(Math.random().toString()).digest('hex').substring(0, 24);
	    checkIn.location = location;
	    checkIn.geolocation = geolocation;
	    checkIn.line_length = line_length;
	    checkIn.check_in_time = d1;
	    checkIn.check_in_expire_time = d2;
	    console.log("checkIn "+JSON.stringify(checkIn));
	    account.update(
	    {"_id" : accountId},
	    {"$set": { check_in : checkIn }},
	        function(error, account){
	           if( error ) callback(error);
	           else callback(null, account);}
	    );
	    
	    //callback();
	  };
	  
  var findAll = function(callback) {

	    account.find( function(err,doc) {
	      callback(doc);
	    });

	  };	  
	  
  var findCurrent = function(id, geolocation, callback) {
	  var now = new Date();
	  console.log(" geolocation.lat "+ geolocation.lat);
	  console.log(" geolocation.lng "+ geolocation.lng);	  
	  	console.log("query "+JSON.stringify(query));
	  	if (id && id.length > 0) {
	  	  var query = { 
	  			  'check_in.check_in_expire_time': {"$gt": now}, '_id': {'$ne': id},
				  "check_in.geolocation" : { $near : { $geometry :
			      { type : "Point" ,
				        coordinates : [ parseFloat(geolocation.lat), parseFloat(geolocation.lng) ] } },
				        $maxDistance : 500 }
		  				};	  		
	  		account.find(query, function(err,doc) {		    		
			      callback(doc);
			    });	  		
	  	} else {
	  	  var query = { 
				  "check_in.geolocation" : { $near : { $geometry :
			      { type : "Point" ,
				        coordinates : [ parseFloat(geolocation.lat), parseFloat(geolocation.lng) ] } },
				        $maxDistance : 500 }
		  				};	  		
		    account.find(query, function(err,doc) {
			      callback(doc);
			    });		  		
	  	}
	  };	  
	  
	  
	  var checkOut = function(id, geolocation, callback) {
		  	if (id && id.length > 0) {

		  	  var query = { 
		  			  '_id': id,
					  "check_in.geolocation" : { $near : { $geometry :
				      { type : "Point" ,
					        coordinates : [ parseFloat(geolocation.lat), parseFloat(geolocation.lng) ] } },
					        $maxDistance : 500 }
			  				};	 

		  		account.find(query, function(err,doc) {	
		  			  if (doc.length) {
		  				  callback("not checkedout");
		  			  } else {
		  			      account.update(
			  			    	    {"_id" : id},
			  			    	    {"$set": { 'check_in' : '' }},
			  			    	        function(error, account){
			  			    	           if( error ) callback(error);
			  			    	           else callback("checked out");
			  			    	    });			  				  
		  			  }
				    });	  		
		  	}
	  };

 var findById = function(id, callback) {
  account.findOne({_id:id}, function(err,doc) {
      callback(doc);
  });
  };

  var findBycId = function(cID, callback) {

	  account.findOne({_id:cID}, function(err,doc) {
	      callback(doc);
	  });

	  };  
  
  var findUsernameById = function(id, callback) {

	  account.findOne({_id:id}, {_id: 0, username: 1}, function(err,doc) {
	      callback(doc);
	  });

	  };
  
  var findFirstnameById = function(id, callback) {

	  account.findOne({_id:id}, {_id: 0, name: 1}, function(err,doc) {
	      callback(doc);
	  });

	  };	  

  var findByUsername = function(id, callback) {

    account.findOne({username: id.username}, function(err,doc) {
      callback(doc);
    });

  	};

    var findByEmail = function(user_email, callback) {

        account.findOne({email: user_email}, function(err,doc) {
          callback(doc);
        });

      	};
        	
  	
  var post_message = function(cID, accountId, message, username, callback) {
	  	var d1 = new Date();
	    userMessage = new Object();
	    userMessage.cID = cID;
	    userMessage.oID = accountId;
	    userMessage.message = message;
	    userMessage.username = username;
	    userMessage.time = d1;
	    account.update(
	    	    {"_id" : cID},
	    	    {"$push": { 'check_in.check_in_message.message_thread' : userMessage }},
	    	        function(error, account){
	    	           if( error ) callback(error);
	    	           else callback(null, account);
	    	    });	    

  };
  
  var ajaxTest = function(field1, field2, accountId, callback) {
	    console.log("field1 " +  field1);
	  	console.log("field2 " + field2);
	  	console.log("the accountID " + accountId);

	    account.update(
	    	    {"_id" : accountId},
	    	    {"$set": { 'field1' : field1, 'field2': field2 }},
	    	        function(error, account){
	    	           if( error ) callback(error);
	    	           else callback(null, account);
	    	    });	    

};
  

  return {
    login: login,
    register: register,
    passwordUpdate: passwordUpdate,
    findById: findById,
    findBycId: findBycId,
    findByUsername: findByUsername,
    account: account,
    checkInMethod: checkInMethod,
    findAll: findAll,
    findCurrent: findCurrent,
    checkOut: checkOut,
    post_message: post_message,
    findUsernameById: findUsernameById,
    findFirstnameById: findFirstnameById,
    findByEmail: findByEmail,
    ajaxTest: ajaxTest
  }
}
