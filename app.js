
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'), 
    user = require('./routes/user'),
    mongoose = require('mongoose'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    findOrCreate = require('mongoose-findorcreate'),
    util = require('util'),
    FacebookStrategy = require('passport-facebook').Strategy,
    i18n    = require('i18n'),
    session = require('connect-mongo')(express),
    i18n_config  = require('./models/utils/i18n');

i18n_config();

var clients = {};
var app    = express();
var server = http.createServer(app);
global.io  = require('socket.io').listen(server);


app.configure(function () {
//console.log("using authenticator");
//Authenticator
//app.use(express.basicAuth('friend', 'bli8ke'));

//all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.locals({
	  'l':  i18n.__
	, 'ln': i18n.__n	
});

app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({
	store: new session({
	      db: 'heroku_app19413190',
	      host: 'ds053668.mongolab.com',
	      port: 53668,  // optional, default: 27017
	      username: 'admin', // optional
	      password: 'Swbv123()' // optional      
	    }),	
		secret: 'keyboard cat',
	    cookie: {
	        path: '/',
	        maxAge: 1000 * 60 * 60 * 24 // 1 day
	      } 
	}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });
app.set('jsonp callback', true);
app.use(passport.initialize());
app.use(passport.session());

app.use(i18n.init);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'dev')));
});

/* FACEBOOK AUTHENTICATION */
var FACEBOOK_APP_ID = "698217933545116"
var FACEBOOK_APP_SECRET = "7f8e2e6662a925a67b26d56063f3577e";


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
console.log("about to use passport");
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
	 console.log("passport callback function");
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log("profile "+JSON.stringify(profile));
      console.log("profile username "+profile.username);
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.

      var firstname = profile.name.givenName, 
      	  lastname = profile.name.familyName;
      console.log("registering id: "+profile.id+ " " + " firstname: " + firstname + " lastname: "+ lastname + " username: "+ profile.username);
      //routes.fb_register(profile.id, firstname, lastname, profile.username);
      return done(null, profile);
    });
  }
));


/* END FACEBOOK AUTHENTICATION */

/* FORGOT PASSWORD */
app.use(express.static(__dirname));

// example nodemailer config here
var forgot = require('password-reset-nodemailer')({
  uri: 'https://alpha.linesocial.mobi/password_reset',
  from: 'webmater@linesocial.mobi',
  transportType: 'SMTP',
  transportOptions: {
    service: "Gmail",
    auth: {
        user: "webmaster@linesocial.mobi",
        pass: "Tgifkfc123"
    }
  }
});

app.use(forgot.middleware);

app.post('/forgot', express.bodyParser(), function(req, res) {
	  var $1 = require('./dollar.js') // require $1 Unistroke Recognizer
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
		  var email = req.body.email;
		  var callback = {
		    error: function(err) {
		      res.end('Error sending message: ' + err);
		    },
		    success: function(success) {   	
		      //res.end('Check your inbox for a password reset message.');
		    	res.redirect('/check_inbox');
		    }
		  };
		  var reset = forgot(email, callback);
		  console.log("reset "+JSON.stringify(reset));
		  var token = reset.id;
		  
		  routes.saveToken(email, token);
		  
		  reset.on('request', function(req_, res_) {
		    req_.session.reset = {
		      email: email,
		      id: reset.id
		    };
		    console.log("req_.session.reset "+req_.session.reset);
		    console.log("fs.createReadStream");
		    fs.createReadStream(__dirname + '/forgot').pipe(res_);
		  });
	  }else{
	    res.redirect('/?error=true');
	  }
	
	});

app.post('/reset', express.bodyParser(), function(req, res) {
  //if (!req.session.reset) return res.end('reset token not set');

  var password = req.body.password;
  var confirm = req.body.confirm;
  var token = req.body.token;
  if (password !== confirm) return res.redirect('/invalid_passwords');

  routes.savePassword(password, token, res);
  // update the user db here
  //forgot.expire(req.session.reset.id);
  //delete req.session.reset;
  //res.end('password reset');
});
  
	  
/* END FORGOT PASSWORD */

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/:id', routes.home);
app.get('/:username/inbox/', routes.inbox);

app.get('/:username/fb_invite_code/', routes.fb_invite_code);
app.post('/:username/fb_invite_code/', routes.fb_invite_code);

app.get('/:username/user_check_in/', routes.user_check_in);
app.post('/:username/user_check_in/', routes.user_check_in);

app.get('/:username/user_lines/', routes.user_lines);
app.post('/:username/user_lines/', routes.user_lines);

app.get('/:username/user_points/', routes.user_points);
app.get('/:username/user_profile/', routes.user_profile);

app.get('/:username/update_password/', routes.update_password);
app.post('/:username/update_password/', routes.update_password);

app.get('/:username/messages/', routes.messages);
app.post('/:username/messages/', routes.messages);

app.get('/:username/update_messages', routes.update_messages);
app.post('/:username/update_messages', routes.update_messages);

app.get('/:username/user_next_message/', routes.user_next_message);
app.post('/:username/user_next_message/', routes.user_next_message);

app.get('/:username/user_notifications/', routes.user_notifications);
app.post('/:username/user_notifications/', routes.user_notifications);

app.get('/:username/update_notification_messages/', routes.update_notification_messages);
app.post('/:username/update_notification_messages/', routes.update_notification_messages);

app.get('/:username/venues', routes.venues);
app.post('/:username/venues', routes.venues);

app.get('/:username/ajax', routes.ajax);
app.post('/:username/ajax', routes.ajax);

app.get('/:username/auto_checkout', routes.auto_checkout);
app.post('/:username/auto_checkout', routes.auto_checkout);

app.get('/:username/validate_email', routes.validate_email);
app.post('/:username/validate_email', routes.validate_email);

app.get('/:username/send_validate_email', routes.send_validate_email);
app.post('/:username/send_validate_email', routes.send_validate_email);

app.get('/send_validate_email_code', routes.send_validate_email_code);
app.post('/send_validate_email_code', routes.send_validate_email_code);

app.get('/:username/validate_phone', routes.validate_phone);
app.post('/:username/validate_pone', routes.validate_phone);

app.get('/:username/send_validate_phone', routes.send_validate_phone);
app.post('/:username/send_validate_phone', routes.send_validate_phone);

app.get('/send_validate_phone_code', routes.send_validate_phone_code);
app.post('/send_validate_phone_code', routes.send_validate_phone_code);

app.get('/:username/send_invite_form/', routes.send_invite_form);
app.post('/:username/send_invite_form/', routes.send_invite_form);

app.get('/:username/send_invite/', routes.send_invite);
app.post('/:username/send_invite/', routes.send_invite);

app.post('/login', routes.login);
app.post('/register', routes.register);

app.get('/register_value', routes.register_value);
app.post('/register_value', routes.register_value);

app.get('/register_email_value', routes.register_email_value);
app.post('/register_email_value', routes.register_email_value);

app.get('/grant_points', routes.grant_points);
app.post('/grant_points', routes.grant_points);

app.get('/logout', routes.logout);
app.get('/terms', routes.terms);

app.get('/send_points', routes.send_points);
app.post('/send_points', routes.send_points);

app.get('/pokes', routes.pokes);
app.post('/pokes', routes.pokes);

app.get('/contact', routes.contact);
app.post('/contact', routes.contact);

//GET /auth/facebook
//Use passport.authenticate() as route middleware to authenticate the
//request.  The first step in Facebook authentication will involve
//redirecting the user to facebook.com.  After authorization, Facebook will
//redirect the user back to this application at /auth/facebook/callback
app.get('/auth/facebook',
passport.authenticate('facebook'),
function(req, res){
// The request will be redirected to Facebook for authentication, so this
// function will not be called.
});

//GET /auth/facebook/callback
//Use passport.authenticate() as route middleware to authenticate the
//request.  If authentication fails, the user will be redirected back to the
//login page.  Otherwise, the primary route function function will be called,
//which, in this example, will redirect the user to the home page.
app.get('/auth/facebook/callback', 
passport.authenticate('facebook'),
function(req, res) {
	console.log("/auth/facebook/callback");
	console.log("user "+JSON.stringify(req.session.passport.user));
    var firstname = req.session.passport.user.name.givenName, 
	  lastname = req.session.passport.user.name.familyName,
	  id = req.session.passport.user.id,
	  username = req.session.passport.user.username;
	routes.fb_register(id, firstname, lastname, username, req, res);

});


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));

  var users = [];
  
  global.io.sockets.on('connection', function (socket) {
	  users.push(socket.id);
	  console.log('+ User '+ socket.id +' connected ('+ socket.handshake.address.address +'). Total users: '+ users.length );
	  	clients[socket.id] = socket;
	    socket.emit('message', { message: 'welcome to the chat' });
		socket.on('send', function (data) {
		console.log("global.io.sockets.emit data "+data);
			console.log("emitting data "+JSON.stringify(data));
			routes.pokes(data);
			global.io.sockets.emit('message', data);
		}); 
  });

});


