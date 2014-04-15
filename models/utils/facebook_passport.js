module.exports = function() {
var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;	

/* FACEBOOK AUTHENTICATION */
var FACEBOOK_APP_ID = "698217933545116"
var FACEBOOK_APP_SECRET = "xxxxx";


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
    callbackURL: "https://alpha.xxxxx/auth/facebook/callback"
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
	
}