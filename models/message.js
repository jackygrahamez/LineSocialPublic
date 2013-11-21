module.exports = function(mongoose) {
  var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
	
  var messageSchema = new mongoose.Schema({ 
	    cID: ObjectId,
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

  var saveMessages = function(cID, fID, tID, messages, callback) {
	  console.log("cID "+cID+" user_messages "+messages);
	  var data = new message();
	  data.cID = cID;
	  data.fID = fID;
	  data.tID = tID;
	  data.message = messages;

	  data.save(callback);

  };
  

  
  return {
	message: message,
	findMessages: findMessages,
	saveMessages: saveMessages
  }
}
