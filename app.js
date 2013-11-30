
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path');

var app    = express();
var server = http.createServer(app);
global.io  = require('socket.io').listen(server);


console.log("using authenticator");
//Authenticator
//app.use(express.basicAuth('friend', 'bli8ke'));

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


/*
var port = 5000;
var io = require('socket.io').listen(app.listen(port));

global.io.sockets.on('connection', function (socket) {
	socket.emit('message', { message: 'welcome to the chat' });
	socket.on('send', function (data) {
		global.io.sockets.emit('message', data);
	});
});
console.log("Listening on port " + port);  
*/