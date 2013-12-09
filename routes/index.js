var mongoose = require('mongoose'),
    message  = require('../models/message')(mongoose),
	account  = require('../models/account')(mongoose),
	findOrCreate = require('mongoose-findorcreate');

//mongoose.connect('mongodb://localhost/LineSocial');

//mongoose.connect('mongodb://heroku_app19397517:1kmoc0c3kdcib1g9v7hpejr8up@ds053678.mongolab.com:53678/heroku_app19397517');
mongoose.connect('mongodb://heroku_app19413190:gtqqg23kecrfldmqb2ko3bm53f@ds053668.mongolab.com:53668/heroku_app19413190');


//var db = mongoose.connection;

// foursquare
var foursquare = (require('foursquarevenues'))('Q3Q5R5RIYDOJDS2ACP3XL1WKK5W1RR3SNJULY2VDU2PXNKAB', 'UWBQRUXO0NGPQGZGFFV2WLJGEUTRABRGZKGC5LC25SAUGYDJ');


exports.index = function(req, res){
	  if ( req.session.loggedIn ) {
		  console.log("logging out");

		  req.session.destroy(function(err){
			  console.log("called destroy");
			   // cannot access session here
			  console.log(err);
			  res.render('index', 
						{ title: 'LineSocial',
						  pagename: 'login' });
			 });

		  } else {

		  res.render('index', 
					{ title: 'LineSocial',
					  pagename: 'login' });

		  }		

};

exports.register = function(req, res) {
    var firstName = req.param('firstName', ''),
        lastName  = req.param('lastName', ''),
        username  = req.param('username', ''),        
        email     = req.param('email', null),
        password  = req.param('password', null);

    if ( null == email || email.length < 1 || null == password || password.length < 1 ) {
      res.send(400);
      return;
    }

    account.register(email, password, firstName, lastName, username, function(err) {

      if (err) {
    	  console.log("errors!");
          res.send('<p class="warning">Could not register</p>');
        return console.log(err);
      }

      res.send('Account was created');
      //res.redirect('/');

    });
}

exports.fb_register = function(id, firstname, lastname, username, req, res) {
	account.findByFBId(id, function(doc) {
		console.log("doc "+doc)
	  if (typeof(doc) == 'undefined' || doc == null) {
			account.fb_register(id, firstname, lastname, username, function (err, user_created) {
				account.findByFBId(id, function(doc_after_reg) {
					console.log("doc_after_reg "+doc_after_reg);

				  	var homepage = '/'+doc_after_reg.username;
					console.log("homepage "+homepage);
				    req.session.loggedIn  = true;
				    req.session.accountId = doc_after_reg._id;	
					res.redirect(homepage);					
			        return doc_after_reg;			
				});
				console.log("returning user created");
				return user_created;
			});    			  
	  } else {
		  	var homepage = '/'+doc.username;
			console.log("homepage "+homepage);
		    req.session.loggedIn  = true;
		    req.session.accountId = doc._id;	
			res.redirect(homepage);				  
	  }
        return doc;
	});
}	


exports.fb_login = function(id, req, res) {
	console.log("fb_login id "+id);
	account.findByFBId(id, function(doc) {
		console.log("login doc " + JSON.stringify(doc));
		if (doc != 'null' && doc != null && JSON.stringify(doc) != "null") {
		  	var homepage = '/'+doc.username;
			console.log("homepage "+homepage);
		    req.session.loggedIn  = true;
		    req.session.accountId = doc._id;	
			res.redirect(homepage);				
		} 
		
		console.log("returning fb_login doc");
        return doc;
	});
}	


exports.update_password = function(req, res) {
    var id = req.param('id', ''),
    password  = req.param('password', null);

    console.log("id "+id);    
    console.log("password "+password);

if ( null == password || password.length < 1 ) {
  res.send(400);
  return;
}

  account.passwordUpdate(id, password, function(err) {
  if (err) {
	  console.log("errors!");
  }

  res.send('password updated!');
  //res.redirect('/');

});
}

exports.register_value = function(req, res) {
	var value = req.param('username', '');	
    account.findByUsername({username:value}, function(doc) {
    	if (doc) {
    		res.send("username taken");
    	} else {
    		res.send("username ok");
    	}
	});	
	
}

exports.register_email_value = function(req, res) {
	var value = req.param('email', '');	
    account.findByEmail(value, function(doc) {
    	if (doc) {
    		res.send("email taken");
    	} else {
    		res.send("email ok");
    	}
	});	
	
}


exports.terms = function(req, res){
	 res.render('terms');
};

exports.login = function(req, res){
    var email    = req.body.email,
        password = req.body.password;

  if ( !email || !password ) {
    res.send(400);
    return;
  }

  account.login(email, password, function(doc) {

    if ( !doc ) {
      res.send(401);
      return;
    }
    req.session.loggedIn  = true;
    req.session.accountId = doc._id;
    res.redirect('/' + doc.username);
  });
};

exports.home = function(req, res) {
  var url = req.params.id;
  
  if ( req.session.loggedIn && url !== 'register') {
	//console.log("home "+req.session.accountId);
  	account.findUsernameById(req.session.accountId, function(username) {	
		
	if (username.username === url) {
	    account.findByUsername({username: url}, function(doc) {
	
	    		var socket = require('./socket');
		        res.render('home', {
		          title: 'LineSocial',
		          user: doc,
				  pagename: 'home'
		        });
	    	});
  		}	
	else {
		res.redirect('/' +username.username);
	}
    });


  } else if( !req.session.loggedIn && url === 'register' ) {

      res.render('register', {
		  title: 'register'	,
		  pagename: 'register'});

  }  else if( url === 'terms' ) {

      res.render('terms');

  }  else {

    res.redirect('/');

  }

}

exports.user_check_in = function(req, res) {
    var location = req.param('location', ''),
    line_length  = req.param('line_length', ''),
    lat  = parseFloat(req.param('lat', '')),
    lon  = parseFloat(req.param('lon', '')),
    geolocation = [lat, lon];
    console.log("lat type "+typeof(lat));
    
 	if ( req.session.loggedIn ) {
	account.findUsernameById(req.session.accountId, function(username) {
		if (req.params.username == username.username) {
	    account.findById(req.session.accountId, function(doc) {
	    	if (location == null | location.length == 0) {
	            res.render('user_check_in', {
	                title: 'LineSocial',
	                user: doc,
	      		  	pagename: 'user_check_in',
	          		checkin_status: ''
	              });    		
	    	}
	    	else {
	    		 account.checkInMethod(location, geolocation, line_length, req.session.accountId, function(err) {
	            if (err) {
	              return console.log(err);
	            }
				    account.findById(req.session.accountId, function(cID_doc) {
				    	res.send(cID_doc.check_in.cID);
				    });
	          });      		
	    	}
	    });
	    } else {
	    	res.redirect('/' +username.username);
	    }
    });
  } else {
    res.send(401);

  }
}

exports.user_lines = function(req, res) {
	console.log("user_lines");
    var lat = req.param('lat', ''),
    lon  = req.param('lon', ''),
    geolocation = new Object();
    geolocation.lat = lat,
    geolocation.lng = lon,
    coord = [ lat + "," + lon];
    console.log("coord "+coord);
    var test_venue;
    
	var params = {
	        "ll": coord
	    };
		console.log("params "+JSON.stringify(params));


  if ((req.session.loggedIn)) {
	  
	    foursquare.getVenues(params, function(error, venues) {
	    	console.log("returning venues");
	        if (!error) {
	        	if (typeof(venues) != "undefined" && (JSON.stringify(venues.response.venues) != "null")) {
		        	var i = Math.floor((Math.random()*venues.response.venues.length)+1);
		        	if (venues.response.venues[i]){
			            test_venue = venues.response.venues[i].name;		        		
		        	}
		            console.log("test_venue "+JSON.stringify(test_venue));	        		
	        	} else {
	        		test_venue = "McDonalds";
	        	}

	        	account.createTestUser(test_venue, geolocation, function(testUserDoc){

	        		account.findUsernameById(req.session.accountId, function(username) {
	        			if (req.params.username == username.username) {
	        		    account.findById(req.session.accountId, function(doc) {
	        			console.log("doc "+doc);
	        		    if (!doc.check_in) {
	        		    	cID = "";
	        		    } else {
	        		    	cID = doc.check_in.cID;
	        		    }
	        		    if (typeof(cID) == 'undefined') {
	        		    	cID = "";	
	        		    }
	        		    console.log("user_lines cID "+cID);
	        		    console.log("route geolocation "+geolocation);
	        		    console.log("route geolocation type "+ typeof(geolocation));
	        		    if (lat != '' && lon != '') {
	        				account.findCurrent(cID, geolocation, function(userLines) {
	        					console.log("userLines "+userLines);
	        					//res.send(userLines);
	        			        res.render('user_lines', {
	        			          title: 'LineSocial',
	        			          user: doc,
	        					  pagename: 'user_lines',
	        					  lines: userLines
	        			        });	    	
	        				});		
	        		    } else {
	        		        res.render('user_lines', {
	        			          title: 'LineSocial',
	        			          user: doc,
	        					  pagename: 'user_lines',
	        					  lines: "ad_hoc"
	        			        });	 	    	
	        		    }
	        		    });
	        		    } else {
	        		    	res.redirect('/' +username.username);
	        		    }	    
	        		});	        		
	        		
	        	});
	        }
	    });    	  
	  
	
	

  } else {

    res.send(401);

  }
}

exports.user_notifications = function(req, res) {

  if ( req.session.loggedIn ) {
	  	account.findUsernameById(req.session.accountId, function(username) {
		if (req.params.username == username.username) {
        account.findById(req.session.accountId, function(doc) {
    	console.log("doc "+doc);
    	var fID = doc._id;
	    if (!doc.check_in) {
	    	cID = "";
	    } else {
	    	cID = doc.check_in.cID;
	    }	
	    console.log("user notifications cID "+cID+" fID "+fID)
	    message.findMessages(cID, fID, function(message_doc) {
	    	if(!message_doc[0]) {
	    		console.log("message_doc empty");
		        res.render('user_notifications', {
		             title: 'LineSocial',
		             user: doc,
			         pagename: 'user_notifications',
			         cID: cID,
			         message: "",
			         requests: ""
		      		});		    		
	    	} else {
	    		if (typeof(message_doc[0].requests) == 'undefined') {
	    			message_doc[0].requests = '';
	    		}
	    		console.log("message "+JSON.stringify(message_doc));
	    		 res.render('user_notifications', {
	             title: 'LineSocial',
	             user: doc,
		         pagename: 'user_notifications',
		         cID: cID,
		         message: message_doc,
		         requests:message_doc.requests
	      		});	
	    	}
	    	});
    	});
	    } else {
	    	res.redirect('/' +username.username);
	    }	        	
    });

  } else {

    res.send(401);

  }
}

exports.user_points = function(req, res) {

	  if ( req.session.loggedIn ) {
	account.findUsernameById(req.session.accountId, function(username) {
		if (req.params.username == username.username) {
	    account.findById(req.session.accountId, function(doc) {

	        res.render('user_points', {
	          title: 'LineSocial',
	          user: doc,
			  pagename: 'user_points'
	        });
	    });
	    } else {
	    	res.redirect('/' +username.username);
	    }	  
	    });

	  } else {

	    res.send(401);

	  }
	}

exports.ajax = function(req, res) {
    var field1 = req.param('field1', ''),
    field2  = req.param('field2', '');
    
  if ( req.session.loggedIn ) {
	account.findUsernameById(req.session.accountId, function(username) {
		if (req.params.username == username.username) {  
	console.log("user logged in");
    account.findById(req.session.accountId, function(doc) {

    	if (field1 == null | field1 == 0) {
            res.render('ajax', {
                title: 'LineSocial',
                user: doc,
      		  	pagename: 'ajax'
              });    		
    	}
    	else {
    		 account.ajaxTest(field1, field2, req.session.accountId, function(err) {
    			 console.log("callback");
            if (err) {
              return console.log(err);
            }
            res.send("<p>test block</p>");
            
          });      		
    	}
	    });
	    } else {
	    	res.redirect('/' +username.username);
	    }	      	
    });

  } else {

    res.send(401);

  }
}


exports.user_profile = function(req, res) {

  if ( req.session.loggedIn ) {
	account.findUsernameById(req.session.accountId, function(username) {
		if (req.params.username == username.username) {  
    account.findById(req.session.accountId, function(doc) {

        res.render('user_profile', {
          title: 'LineSocial',
          user: doc,
		  pagename: 'user_profile'
        });
	    });
	    } else {
	    	res.redirect('/' +username.username);
	    }	  
    });

  } else {

    res.send(401);

  }
}

exports.messages = function(req, res) {
	var cID = req.param('cID', ''),
	fID = req.param('fID', ''),
	tester = req.param('tester', '');
	console.log("messages route cID "+cID);
	console.log("messages route fID "+fID);
	  if ( req.session.loggedIn ) {
		account.findUsernameById(req.session.accountId, function(username) {
		if (req.params.username == username.username) {
	    account.findById(req.session.accountId, function(doc) {
		    message.findMessages(cID, fID, function(message_doc) {
		    	if ((typeof(message_doc) == 'undefined') || (typeof(message_doc[0]) == 'undefined')) {
			    	res.render('messages', {
				          title: 'LineSocial',
				          user: doc,
						  pagename: 'messages',
						  cID: cID,
						  message: '',
						  fID: fID,
						  tester: tester
			    	});	  
		    	}
		    	else {
		    		console.log("defined message_doc");
		    		console.log("message_doc[0].message "+message_doc);
		    		res.render('messages', {
				          title: 'LineSocial',
				          user: doc,
						  pagename: 'messages',
						  cID: cID,
						  message: message_doc,
						  fID: fID,
						  tester: tester	    
			    	});			    		
		    	}
  
	    	});	  		    	
	    });
	    } else {
	    	res.redirect('/' +username.username);
	    }	  
	    });

	  } else {

	    res.send(401);

	  }
	}


exports.user_message = function(req, res) {

    var user_message = req.param('message', ''),
	
    	tID = req.param('tID', ''),
    	fID = req.param('fID', req.session.accountId),
		cID = req.param('cID', ''),
	    time = new Date(),
	    counter = 0;
	        
		
    if ((cID.length > 1) && (fID.length > 1) && (tID.length > 1) && user_message.length > 0 ) {
    	account.findUsernameById(req.session.accountId, function(username) {
		if (req.params.username == username.username) {      	
    	account.findById(req.session.accountId, function(doc) {
    		message.sendMessages(cID, tID, fID, doc.name.first, user_message, time, function(message_doc) {
    			if (message_doc[0] && message_doc[0].thread) {
    			counter = message_doc[0].thread.length;
    			} else {
    			counter = 0;
    			}
    			var ticker = counter.toString();

				var ajaxMessage ="<li>" + doc.name.first + ": " + user_message + " "+time.getHours()+":"+time.getMinutes()+"</li>"; 

				res.send(ajaxMessage);

    		});
    	});
	    } else {
	    	res.redirect('/' +username.username);
	    }	 
    	});    	
        return;
        
    } else if ((cID.length > 1) && (fID.length > 1) && (tID.length > 1) && user_message.length < 1 ) {
    	account.findUsernameById(req.session.accountId, function(username) {
		if (req.params.username == username.username) {      	
	    account.findById(req.session.accountId, function(doc) {
	    account.findBycId(cID, function(cID_doc) {
	    	message.findMessages(tID, fID, function(message_doc) {
	    		if (message_doc) {
		    		console.log("message_doc "+message_doc);
	    			if (message_doc[0] && message_doc[0].thread) {  			
			    	res.render('user_message', {
			          title: 'LineSocial',
			          user: doc,
			          message_doc: message_doc,
			          cID: cID,
			          tID: tID,
			          fID: fID,
			          cID_doc: cID_doc,
					  pagename: 'user_message'
			        });
	    			} else {
			    	  res.render('user_message', {
			          title: 'LineSocial',
			          user: doc,
			          message_doc: "",
			          cID: cID,
			          tID: tID,
			          fID: fID,
			          cID_doc: cID_doc,
					  pagename: 'user_message'
			        });
	    			}
	    		}
	    	 });
	    });
	    });	    
	    } else {
	    	res.redirect('/' +username.username);
	    }	 
    	});   	    
    	return;  	
    }
    else {
    	
        res.send(401);
    	return;
    }
}

exports.user_next_message = function(req, res) {
	var cID = req.param('cID', ''),
	current_thread_length = req.param('current_thread_length', '');

  if ( req.session.loggedIn ) {
	account.findUsernameById(req.session.accountId, function(username) {
	if (req.params.username == username.username) {      	
	account.findById(req.session.accountId, function(doc) {
		message.findNextMessage(cID, function(message_doc) {
			if(message_doc) {
				console.log("user_next_message doc"+message_doc);
				if (message_doc[0] && message_doc[0].thread) {
				if (current_thread_length < message_doc[0].thread.length) {
					i = parseInt(current_thread_length) + 1;			
					if (message_doc[0].thread[i] && message_doc[0].thread[i]) {
						console.log("current_thread_length is less than message_doc[0].thread.length");
						console.log("message_doc[0].thread[i] "+message_doc[0].thread[i]);
						var ajaxMessage ="<li>" + message_doc[0].thread[i].username + ": " + message_doc[0].thread[i].message + "<br /> "+message_doc[0].thread[i].time+"</li>"; 
						console.log(ajaxMessage);
						res.send(ajaxMessage);	
					}
					else {
						ajaxMessage = "";
						console.log("ajaxMessage is blank");				
					}
				}
				else {
				ajaxMessage = "";
				console.log("ajaxMessage is blank");
				}	
			}
			}	
	    });
	    });
	    } else {
	    	res.redirect('/' +username.username);
	    }	 	    
    });

  } else {

    res.send(401);

  }
}




exports.inbox = function(req, res) {

  if ( req.session.loggedIn ) {

    account.findById(req.session.accountId, function(doc) {

        res.render('inbox', {
          title: 'LineSocial',
          user: doc
        });

    });

  } else {

    res.send(401);

  }
}


exports.venues = function(req, res) {
	var coord = req.param('coordinates', '');
	  if ( req.session.loggedIn ) {
	  account.findUsernameById(req.session.accountId, function(username) {
		if (req.params.username == username.username) {
	    account.findById(req.session.accountId, function(doc) {
	    	
	    	var params = {
	    	        "ll": coord
	    	    };
	    		console.log("params "+params);
	    	    foursquare.getVenues(params, function(error, venues) {
	    	        if (!error) {
	    	            console.log(venues.response.venues);
	    	            res.send(venues.response.venues);
	    	        }
	    	    });
	    });
	    } else {
	    	res.redirect('/' +username.username);
	    }	  
	    });

	  } else {

	    res.send(401);

	  }
	}


exports.auto_checkout = function(req, res) {
	var lat = req.param('lat', ''),
    lon  = req.param('lon', ''),
    geolocation = new Object();
    geolocation.lat = lat,
    geolocation.lng = lon;	
	  if ( req.session.loggedIn ) {
	  account.findUsernameById(req.session.accountId, function(username) {
		  account.checkOut(req.session.accountId, geolocation, function(error, doc) {
			   //res.send(doc);
		   });
	    });

	  } else {

	    res.send(401);

	  }
	}

exports.update_messages = function(req, res) {
	 var ts = req.param('ts', ''), 
	 cID = req.param('cID', ''),
	 tID = req.param('tID', ''),
	 fID = req.param('fID', ''),
	 messages = req.param('messages', ''),
	 user = req.param('user', '');
	 
	 console.log("messages route "+messages);
	 console.log("tID route "+tID);
	  if ( req.session.loggedIn && cID && tID && fID && messages) {
		   message.saveMessages(ts, cID, fID, tID, messages, user, function(error, doc) {
			   console.log("updated messages "+doc);
			   res.send("updated messages");
		   });

		  } else {

		    res.send(401);

		  }	

	}

exports.update_notification_messages = function(req, res) {
	 var cID = req.param('cID', ''),
	 fID = req.param('fID', ''),
	 messages = req.param('messages', ''),
	 requests = req.param('requests', '');
	 console.log("update_notification_messages");
	 console.log("fID route "+fID);
	 console.log("update_notification_messages "+messages);
	  if ( req.session.loggedIn ) {
		  if (messages){
			   message.saveNotificationMessages(cID, fID, messages, requests, function(error, doc) {
				   console.log("updated messages "+doc);
				   res.send("updated messages");
			   });
		  }
		  else {
			  res.send("no messages");
		  }


		  } else {

		    res.send(401);

		  }	

	}

exports.logout = function(req, res) {
	  if ( req.session.loggedIn ) {
		  console.log("logging out");
		  res.render('logout');
		  /*
		  req.session.destroy(function(err){
			  console.log("called destroy");
			   // cannot access session here
			  console.log(err);
			  res.render('index');
			 });
		  */
		  } else {

		    res.send(401);

		  }	

	}

