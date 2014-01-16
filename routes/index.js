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
	  var shapes = ['triangle', 'x', 'rectangle', 'circle', 'check', 'caret', 'zigzag', 'arrow', 'leftbracket', 'rightbracket', 'v', 'delete', 'star', 'pigtail'];
	  var shape = shapes[Math.floor(Math.random() * (shapes.length) )];
	  req.session.shape = shape;	
	  
	  if ( req.session.loggedIn ) {
		  req.session.destroy(function(err){
			  console.log(err);
		  
			  res.render('index', 
						{ title: 'LineSocial',
		    	    	  error: req.param('error'),				  
		    	    	  shape: shape,				  
						  pagename: 'login' });
			 });
		  } else {
		  res.render('index', 
					{ title: 'LineSocial',
	    	          error: req.param('error'),			  
	    	  		  shape: shape,				  
					  pagename: 'login' });
		  }		
};

exports.register = function(req, res) {
    var shapes = ['triangle', 'x', 'rectangle', 'circle', 'check', 'caret', 'zigzag', 'arrow', 'leftbracket', 'rightbracket', 'v', 'delete', 'star', 'pigtail'];
    var shape = shapes[Math.floor(Math.random() * (shapes.length) )];
    req.session.shape = shape;		
	
    var firstName = req.param('firstName', ''),
        lastName  = req.param('lastName', ''),
        username  = req.param('username', ''),        
        email     = req.param('email', null),
        password  = req.param('password', null),
        telephone  = req.param('telephone', null);

    if ( null == email || email.length < 1 || null == password || password.length < 1 ) {
      res.send(400);
      return;
    }

    account.register(email, password, firstName, lastName, username, telephone, function(err) {

      if (err) {
          res.send('<p class="warning">Could not register</p>');
        return console.log(err);
      }

      res.send('Account was created');
    });
}

exports.fb_register = function(id, firstname, lastname, username, req, res) {
	account.findByFBId(id, function(doc) {
	  if (typeof(doc) == 'undefined' || doc == null) {
			account.fb_register(id, firstname, lastname, username, function (err, user_created) {
				account.findByFBId(id, function(doc_after_reg) {
				  	var homepage = '/'+doc_after_reg.username;
				    req.session.loggedIn  = true;
				    req.session.accountId = doc_after_reg._id;	
					res.redirect(homepage);					
			        return doc_after_reg;			
				});
				return user_created;
			});    			  
	  } else {
		  	var homepage = '/'+doc.username;
		    req.session.loggedIn  = true;
		    req.session.accountId = doc._id;	
			res.redirect(homepage);				  
	  }
        return doc;
	});
}	


exports.fb_login = function(id, req, res) {
	account.findByFBId(id, function(doc) {
		if (doc != 'null' && doc != null && JSON.stringify(doc) != "null") {
		  	var homepage = '/'+doc.username;
		    req.session.loggedIn  = true;
		    req.session.accountId = doc._id;	
			res.redirect(homepage);				
		} 
        return doc;
	});
}	


exports.update_password = function(req, res) {
    var id = req.param('id', ''),
    password  = req.param('password', null),
    telephone = req.param('telephone', '');
    
if ( null == password || password.length < 1 ) {
  res.send(400);
  return;
}

if ( null == telephone || telephone.length < 1 ) {
	  res.send(400);
	  return;
	}


  account.passwordUpdate(id, password, telephone, function(err) {
  if (err) {
	  console.log("errors!");
  }
  res.send('password updated!');
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


exports.grant_points = function(req, res) {
	var value = req.param('cID', '');
	var user_id = req.param('user_id', '');	
    account.findBycId(value, function(doc) {
    	if (doc) {
    		account.checkOutByID(doc._id, function(checkout_doc) {
        		account.grantPoints(user_id, 5, function(addPoints_doc) {
    			});       			
    		});
    	}
	});	
}

exports.send_points = function(req, res) {
	var points = req.param('points', '');
	var fID = req.param('fID', '');	
	var tID = req.param('tID', '');	
	account.addPoints(fID, tID, points, function(doc) {
		//console.log("send points doc "+doc);
		res.send("points sent");
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
	res.redirect('/?invalid=true');
    return;
  }

  account.login(email, password, function(doc) {

    if ( !doc ) {
    	res.redirect('/?invalid=true');    	
      return;
    }
    else {
        req.session.loggedIn  = true;
        req.session.accountId = doc._id;
        res.redirect('/' + doc.username);    	
    }

  });
};

exports.home = function(req, res) {
  var shapes = ['triangle', 'x', 'rectangle', 'circle', 'check', 'caret', 'zigzag', 'arrow', 'leftbracket', 'rightbracket', 'v', 'delete', 'star', 'pigtail'];
  var shape = shapes[Math.floor(Math.random() * (shapes.length) )];
  req.session.shape = shape;	
  
  var url = req.params.id;
	  if ( req.session.loggedIn && url !== 'register') {
	  	account.findUsernameById(req.session.accountId, function(username) {	
		if (username.username === url) {
		    account.findByUsername({username: url}, function(doc) {
		    		var socket = require('./socket');
			        res.render('home', {
	    	          error: req.param('error'),			  
	    	  		  shape: shape,				        	
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
	          error: req.param('error'),			  
	  		  shape: shape,		    	  
			  title: 'register'	,
			  pagename: 'register'});
	      
	  } else if( !req.session.loggedIn && url === 'forgot_password' ) {
		  // sort a random shape for the captcha and save it on the session
		  var shapes = ['triangle', 'x', 'rectangle', 'circle', 'check', 'caret', 'zigzag', 'arrow', 'leftbracket', 'rightbracket', 'v', 'delete', 'star', 'pigtail'];
		  var shape = shapes[Math.floor(Math.random() * (shapes.length) )];
		  req.session.shape = shape;
		  
	      res.render('forgot_password', {
	    	    error: req.param('error'),
	    	    shape: shape,
			    title: 'forgot_password',
			    pagename: 'forgot_password' });
	      
	  } else if ( !req.session.loggedIn && url === 'password_reset' ) {
	     res.render('forgot');	   
	      
	  } else if ( !req.session.loggedIn && url === 'invalid_passwords' ) {
		      res.render('invalid_passwords', {
				  title: 'invalid_passwords'	,
				  pagename: 'invalid_passwords'});	      
	  }
	  else if( url === 'terms' ) {
	
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
    var lat = req.param('lat', ''),
    lon  = req.param('lon', ''),
    geolocation = new Object();
    geolocation.lat = lat,
    geolocation.lng = lon,
    coord = [ lat + "," + lon];
    var test_venue;
	var params = {
	        "ll": coord
	    };
  if ((req.session.loggedIn)) {
	  
	    foursquare.getVenues(params, function(error, venues) {
	    	console.log(venues);
	        if (!error) {
	        	if (typeof(venues) != "undefined" && (JSON.stringify(venues.response.venues) != "null")) {
		        	var i = Math.floor((Math.random()*venues.response.venues.length)+1);
		        	if (venues.response.venues[i]){
			            test_venue = venues.response.venues[i].name;		        		
		        	}
	        	} else {
	        		test_venue = "McDonalds";
	        	}

	        	account.createTestUser(test_venue, geolocation, function(testUserDoc){

	        		account.findUsernameById(req.session.accountId, function(username) {
	        			if (req.params.username == username.username) {
	        		    account.findById(req.session.accountId, function(doc) {
	        		    if (!doc.check_in) {
	        		    	cID = "";
	        		    } else {
	        		    	cID = doc.check_in.cID;
	        		    }
	        		    if (typeof(cID) == 'undefined') {
	        		    	cID = "";	
	        		    }
	        		    if (lat != '' && lon != '') {
	        				account.findCurrent(cID, geolocation, function(userLines) {
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
    	var fID = doc._id;
	    if (!doc.check_in) {
	    	cID = "";
	    } else {
	    	cID = doc.check_in.cID;
	    }	
	    message.findMessages(cID, fID, function(message_doc) {
	    	if(!message_doc[0]) {
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
	tester = req.param('tester', ''),
	session_id = req.param('session_id', '');
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
						  tester: tester,
						  session_id: session_id
			    	});	  
		    	}
		    	else {
		    		res.render('messages', {
				          title: 'LineSocial',
				          user: doc,
						  pagename: 'messages',
						  cID: cID,
						  message: message_doc,
						  fID: fID,
						  tester: tester,
						  session_id: session_id	    
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


exports.pokes = function(data) {
	var cID = data.cID,
	fID = data.fID,
	tID = data.tID;	
	console.log("cID "+ cID);
	console.log("fID "+ fID);
	console.log("tID "+ tID);
	message.linePokes(cID, fID, function(message_doc) {
		if (message_doc.length == 0) {
			account.findById(tID, function(doc) {
				console.log("user doc "+JSON.stringify(doc));
				if (JSON.stringify(doc) != "null") {
					console.log("telephone not null");
					if (JSON.stringify(doc.telephone) != undefined) {
						if (doc.telephone.length > 5) {
							// Twilio Credentials 
							var accountSid = 'AC024a4372dfdb9fafe0e7fd9d51cf4c78'; 
							var authToken = '19c22aab1c46228b020ace358f7989cb'; 
							var telephone = doc.telephone.replace(/ /g,'');
							var username = doc.username;
							console.log("username "+username);
							console.log("telephone "+telephone);
							var notification_url = "https://linesocial.mobi/"+username+"?pagename=user_notifications";
							console.log("notification_url "+notification_url); 
							//require the Twilio module and create a REST client 
							var client = require('twilio')(accountSid, authToken); 
							client.messages.create({  
								to: telephone, 
								from: "+12024172791", 
								body: "You received a line poke "+notification_url,
								//mediaUrl: "https://linesocial.mobi",
								//mediaUrl: "https://linesocial.mobi/"+username+"?pagename=user_notifications",    
							}, function(err, message) { 
								console.log(message.sid); 
							});	
						} else {
							console.log("blank telephone");
						}
					}					
				}

				
			});
		}
	});
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
				if (message_doc[0] && message_doc[0].thread) {
				if (current_thread_length < message_doc[0].thread.length) {
					i = parseInt(current_thread_length) + 1;			
					if (message_doc[0].thread[i] && message_doc[0].thread[i]) {
						var ajaxMessage ="<li>" + message_doc[0].thread[i].username + ": " + message_doc[0].thread[i].message + "<br /> "+message_doc[0].thread[i].time+"</li>"; 
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


exports.validate_email = function(req, res) {
	  var shapes = ['triangle', 'x', 'rectangle', 'circle', 'check', 'caret', 'zigzag', 'arrow', 'leftbracket', 'rightbracket', 'v', 'delete', 'star', 'pigtail'];
	  var shape = shapes[Math.floor(Math.random() * (shapes.length) )];
	  req.session.shape = shape;	
	  
	  if ( req.session.loggedIn ) {

	    account.findById(req.session.accountId, function(doc) {

	        res.render('validate_email', {
	          title: 'LineSocial',
	          error: req.param('error'),	
	          shape: shape,
	          user: doc
	        });

	    });

	  } else {

	    res.send(401);

	  }
	}



exports.validate_phone = function(req, res) {
	  var shapes = ['triangle', 'x', 'rectangle', 'circle', 'check', 'caret', 'zigzag', 'arrow', 'leftbracket', 'rightbracket', 'v', 'delete', 'star', 'pigtail'];
	  var shape = shapes[Math.floor(Math.random() * (shapes.length) )];
	  req.session.shape = shape;	
	  
	  if ( req.session.loggedIn ) {

	    account.findById(req.session.accountId, function(doc) {

	        res.render('validate_phone', {
	          title: 'LineSocial',
	          error: req.param('error'),	
	          shape: shape,
	          user: doc
	        });

	    });

	  } else {

	    res.send(401);

	  }
	}

exports.send_validate_phone = function(req, res) {

	  if ( req.session.loggedIn ) {

	    account.findById(req.session.accountId, function(doc) {

	        res.render('send_validate_phone', {
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
	    	    foursquare.getVenues(params, function(error, venues) {
	    	        if (!error) {
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
    geolocation.lng = lon,
    lat1 = lat,
    lon1 = lon,
    lat2 = lat,
    lon2 = lon;
    
    console.log("geolocation "+JSON.stringify(geolocation));
	  if ( req.session.loggedIn ) {
	  account.findById(req.session.accountId, function(user_data) {
		  if (typeof(user_data.check_in.geolocation) != "undefined") {
			  var check_in_location = user_data.check_in.geolocation;
			  lat2 = check_in_location[0];
			  lon2 = check_in_location[1];
			  
			  var distance = getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2);
			  console.log("distance "+distance +" (km)");
			  if (distance > 0.5) {
				  account.checkOut(req.session.accountId, function(error, doc) {
					  console.log("checkOut doc "+doc);
					   res.send(doc);
				   });			  
			  }	
			  else {
				  res.send("no checkout");
			  }
		  }
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
	  if ( req.session.loggedIn && cID && tID && fID && messages) {
		   message.saveMessages(ts, cID, fID, tID, messages, user, function(error, doc) {
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
	  if ( req.session.loggedIn ) {
		  if (messages){
			   message.saveNotificationMessages(cID, fID, messages, requests, function(error, doc) {
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
		  res.render('logout');
		  } else {

		    res.send(401);

		  }	

	}

exports.forgot_password = function(req, res) {
	  res.render('forgot_password');
	}

exports.forgot = function(req, res) {
	console.log("exports.forgot");
	  res.render('forgot');
	}

exports.saveToken = function(email, token) {
		console.log("save token");
	    account.saveToken(email, token, function(doc) {
	    	console.log(doc);
	    });		
	}

exports.savePassword = function(password, token, res) {
    account.savePassword(password, token, function(doc) {
    	res.redirect("/");
    });		
}

exports.send_validate_email = function(req, res) {
	  var $1 = require('../dollar.js'); // require $1 Unistroke Recognizer
	  var points = req.param('_points'); // get the points submitted on the hidden input
	  var _points_xy = points.split('|');
	  var  _points = [];
	  if ( req.session.loggedIn ) {
		  account.findById(req.session.accountId, function(user) {
			  var name = user.name.first,
		  		id = user._id,
		  		username = user.username,
		  		email = user.email;
		  
		  // convert to an array of Points
		  for(p in _points_xy){
		    var xy = _points_xy[p].split(',');
		    _points.push(new $1.Point(parseInt(xy[0]), parseInt(xy[1])));
		  }
	
		  // test the points
		  var _r = new $1.DollarRecognizer();
		  var result = _r.Recognize(_points);
		  
		  // validates the captcha or redirect
		  if(_points.length >= 10 && result.Score > 0.7 && result.Name == req.session.shape) { // valid
			  
		    var code = makeid();			  
			  
		    account.saveEmailValidationCode(id, code, function(doc) {
		    	var message = "You recieved this message "+
		    	"because you wish to validate your LineSocial "+
		    	"email address. Please copy this code "+code+" and " +
		    	"paste it in the email validation code box " +
		    	"on your profile page. Otherwise please click "+
		    	"the following hyper link. <br /><br /> "+
		    	"https://alpha.linesocial.mobi/?email_validation="+code;
		    	
				var nodemailer = require("../node_modules/nodemailer");
				// create reusable transport method (opens pool of SMTP connections)
				var smtpTransport = nodemailer.createTransport("SMTP",{
				    service: "Gmail",
				    auth: {
				        user: "webmaster@linesocial.mobi",
				        pass: "Tgifkfc123"
				    }
				});
				// setup e-mail data with unicode symbols
				var mailOptions = {
				    to: name+ " <"+email+">", // sender address
				    from: "Webmaster <webmaster@linesocial.mobi>", // list of receivers
				    subject: "LineSocial Email Validation ", // Subject line
				    text: message+" ", // plaintext body
				    html: "<b>"+message+" </b>" // html body
				}
	
				// send mail with defined transport object
				smtpTransport.sendMail(mailOptions, function(error, response){
				    if(error){
				        console.log(error);
				        res.redirect('/?error=true');
				    }else{
						res.render('send_validate_email', {
					          title: 'LineSocial',
					          user: user
					        });
					    
						//res.send("/"+user.username+"/send_validate_email");
				    }
				    // if you don't want to use this transport object anymore, uncomment following line
				    //smtpTransport.close(); // shut down the connection pool, no more messages
				});		

		    });	
		  }else{
		    res.redirect('/?error=true');
		  }	
	    });	  
	  }
}

exports.send_validate_email_code = function(req, res) {
	var code = req.param('code');
    account.sendValidateEmailCode(code, function(doc) {
    	res.render('send_validate_email_code', {
		          title: 'LineSocial'
		        });
    	//res.redirect("/");
    });		
}


exports.contact = function(req, res) {
	  var $1 = require('../dollar.js') // require $1 Unistroke Recognizer
	    , name = req.param('name') // get the points submitted on the hidden input
	    , email = req.param('email')
	    , message = req.param('message')
	    , points = req.param('_points') // get the points submitted on the hidden input
	    , _points_xy = points.split('|')
	    , _points = [];
	  
	  // convert to an array of Points
	  for(p in _points_xy){
	    var xy = _points_xy[p].split(',');
	    _points.push(new $1.Point(parseInt(xy[0]), parseInt(xy[1])));
	  }

	  // test the points
	  var _r = new $1.DollarRecognizer();
	  var result = _r.Recognize(_points);
	  
	  // validates the captcha or redirect
	  if(_points.length >= 10 && result.Score > 0.7 && result.Name == req.session.shape){ // valid
		  console.log("captcha success!");
		  var nodemailer = require("../node_modules/nodemailer");

		// create reusable transport method (opens pool of SMTP connections)
		var smtpTransport = nodemailer.createTransport("SMTP",{
		    service: "Gmail",
		    auth: {
		        user: "webmaster@linesocial.mobi",
		        pass: "Tgifkfc123"
		    }
		});

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: name+ " ✔ <"+email+">", // sender address
		    to: "Webmaster ✔ <webmaster@linesocial.mobi>", // list of receivers
		    subject: "LineSocial Contact ✔", // Subject line
		    text: message+" ✔", // plaintext body
		    html: "<b>"+message+" ✔</b>" // html body
		}

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, function(error, response){
		    if(error){
		        console.log(error);
		        res.redirect('/?error=true');
		    }else{
		        console.log("Message sent: " + response.message);
		        res.redirect('/');
		    }

		    // if you don't want to use this transport object anymore, uncomment following line
		    //smtpTransport.close(); // shut down the connection pool, no more messages
		});		  
	  }else{
	    res.redirect('/?error=true');
	  }	  
}


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = deg2rad(lon2-lon1); 
	  var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  return d;
	}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
