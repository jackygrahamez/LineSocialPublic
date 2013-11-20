module.exports = function(mongoose) {
  var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
	
  var messageSchema = new mongoose.Schema({ 
	    _id: ObjectId,
	    fID: ObjectId,
	    tID: ObjectId,
	    message: String
  	});
  
  var message = mongoose.model('Message', messageSchema);  
  
  var findMessages = function(cID, fID, tID, callback) {
	  console.log("cID "+cID+" fID "+fID+" tID");
	  var query = { "$or" : [
	                      { "cID" : cID,
	                    	"fID" : fID,  
							"tID" : tID},
	                      { "cID" : cID,
						    "tID" : fID,
						    "fID" : tID}
	                    ] }
	  console.log("query "+query);
	  	message.find( query, function(err,doc) {
	  	  console.log("findMessages "+doc);	  	
	      callback(doc);
	    });
  };

  var saveMessages = function(cID, fID, tID, user_messages, callback) {
	  console.log("cID "+cID+" user_messages "+user_messages);
	  query = { _id: cID, fID: fID, tID: tID }
	  message.update(query, 
			  {$set: {message: user_messages}}, 
			  {upsert: true},
			  function(err,doc) {
	  	  console.log("user_messages "+doc);	  	
	      callback(doc);
	    });
	  //data.save(callback);

  };
  

  
  return {
	message: message,
	findMessages: findMessages,
	saveMessages: saveMessages
  }
}
