
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    util = require('util'),
    FacebookStrategy = require('passport-facebook').Strategy;

var app    = express();
var server = http.createServer(app);
global.io  = require('socket.io').listen(server);

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
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://lineout.herokuapp.com//auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));


/* END FACEBOOK AUTHENTICATION */


console.log("using authenticator");
//Authenticator
app.use(express.basicAuth('friend', 'bli8ke'));

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/:id', routes.home);
app.get('/:username/inbox/', routes.inbox);

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

app.get('/:username/user_message/', routes.user_message);
app.post('/:username/user_message/', routes.user_message);

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

app.post('/login', routes.login);
app.post('/register', routes.register);

app.get('/register_value', routes.register_value);
app.post('/register_value', routes.register_value);

app.get('/register_email_value', routes.register_email_value);
app.post('/register_email_value', routes.register_email_value);

app.get('/logout', routes.logout);


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
passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
res.redirect('/');
});


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));

  global.io.sockets.on('connection', function (socket) {
	  	console.log("sockets.on");
	    socket.emit('message', { message: 'welcome to the chat' });
		socket.on('send', function (data) {
		console.log("global.io.sockets.emit data "+data);
			global.io.sockets.emit('message', data);
		}); 
  });

});

