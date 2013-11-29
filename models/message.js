module.exports = function(mongoose) {
  var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
	
  var messageSchema = new mongoose.Schema({
	  	ts: {type: Number },
	    cID: { type: ObjectId },
	    fID: { type: ObjectId },
	    tID: { type: ObjectId },
	    message: { type: String},
	    requests: { type: String},
	    user: { type: String},
	    time: { type: String},
	    messageDate: { type: Date }
  	});
  
  var message = mongoose.model('Message', messageSchema);  
  
  var findMessages = function(cID, fID, callback) {
	  var query = { "$or" : [
	                      { "cID" : cID,
	                    	"fID" : fID},
	                      { "cID" : cID,
	                    	"tID" : fID}	                    	
	                    ] }
	  	message.find( query, function(err,doc) {
	      callback(doc);
	    });
  };

  var saveMessages = function(ts, cID, fID, tID, user_messages, user, callback) {
	  var d = new Date();
	  var h = d.getHours();
	  var td = "am";
	  if (h > 12) { 
	  h = h - 12;
	  td = "pm"; 
	  }
	  var m = d.getMinutes();
	  if (m < 10) { m = "0"+m };   
	  var time = " " + h + ":" + m + " "+td;
	  var timestamp = d.getTime(); 
	  query = { ts: ts, cID: cID, fID: fID, tID: tID, message: user_messages, user: user, time: time, messageDate: d }
	  var im = new message(query); 
	  console.log("saveMEssages query "+JSON.stringify(query));
	  im.save(callback)
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
