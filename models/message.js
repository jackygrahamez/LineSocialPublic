module.exports = function(mongoose) {
  var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
	
  var messageSchema = new mongoose.Schema({ 
	    cID: { type: ObjectId },
	    fID: { type: ObjectId },
	    message: { type: String},
	    requests: { type: String}
  	});
  
  var message = mongoose.model('Message', messageSchema);  
  
  var findMessages = function(cID, fID, callback) {
	  var query = { "$or" : [
	                      { "cID" : cID,
	                    	"fID" : fID}
	                    ] }
	  	message.find( query, function(err,doc) {
	      callback(doc);
	    });
  };

  var saveMessages = function(cID, fID, tID, user_messages, callback) {
	  query = { cID: cID, fID: fID, tID: tID }
	  console.log("query1 "+JSON.stringify(query));
	  
	  message.update(query, 
			  {$set: {message: user_messages}}, 
			  {upsert: true},
			  function(err,doc) {
			  query = { cID: cID, fID: tID, tID: fID }
			  console.log("query2 "+JSON.stringify(query));			  
			  message.update(query, 
					  {$set: {message: user_messages}}, 
					  {upsert: true},
					  function(err,doc) {
			      callback(doc);
			    });
	    });
	  //data.save(callback);

  };
  
  var saveNotificationMessages = function(cID, fID, user_messages, user_requests, callback) {
	  query = { cID: cID, fID: fID}
	  message.update(query, 
			  {$set: {message: user_messages, requests: user_requests}}, 
			  {upsert: true},
			  function(err,doc) {
	      callback(doc);
	    });
	  //data.save(callback);

  };

  
  return {
	message: message,
	findMessages: findMessages,
	saveMessages: saveMessages,
	saveNotificationMessages: saveNotificationMessages
  }
}
