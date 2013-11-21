module.exports = function(mongoose) {
  var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
	
  var messageSchema = new mongoose.Schema({ 
	    cID: { type: ObjectId },
	    fID: { type: ObjectId, unique: true },
	    tID: { type: ObjectId, unique: true},
	    message: { type: String}
  	});
  
  var message = mongoose.model('Message', messageSchema);  
  
  var findMessages = function(cID, fID, callback) {
	  console.log("cID "+cID+" fID "+fID+" tID");
	  var query = { "$or" : [
	                      { "cID" : cID,
	                    	"fID" : fID}
	                    ] }
	  console.log("query "+JSON.stringify(query));
	  	message.find( query, function(err,doc) {
	  	  console.log("findMessages "+doc);	  	
	      callback(doc);
	    });
  };

  var saveMessages = function(cID, fID, tID, user_messages, callback) {
	  console.log("cID "+cID+" user_messages "+user_messages);
	  query = { cID: cID, fID: fID, tID: tID }
	  message.update(query, 
			  {$set: {message: user_messages}}, 
			  {upsert: true},
			  function(err,doc) {
	  	  console.log("user_messages "+doc);	  	
	      callback(doc);
	    });
	  //data.save(callback);

  };
  
  var saveNotificationMessages = function(cID, fID, user_messages, callback) {
	  query = { cID: cID, fID: fID}
	  console.log("query "+query);
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
	saveMessages: saveMessages,
	saveNotificationMessages: saveNotificationMessages
  }
}
