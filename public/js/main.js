  //checkin
  var x=document.getElementById("demo");
  var lineLength=0;
  var global_coords="";
  var global_cID="";
  var global_fID="";
  var global_tID="";
  var html, ajaxData;
  var lURL;
(function($, window, undefined) {
	deviceType();
	//iOS checkbox
      $('html.iphone .on_off :checkbox').iphoneStyle();
      $('html.iphone .disabled :checkbox').iphoneStyle();
      $('html.iphone .css_sized_container :checkbox').iphoneStyle({ resizeContainer: false, resizeHandle: false });
      $('html.iphone .long_tiny :checkbox').iphoneStyle({ checkedLabel: 'Very Long Text', uncheckedLabel: 'Tiny' });
      
      var onchange_checkbox = ($('.onchange :checkbox')).iphoneStyle({
        onChange: function(elem, value) { 
          $('span#status').html(value.toString());
        }
      });
      
   $("input, textarea").focus(function(){
	   
	   $(this).css("color", "black");
   });
   
   $("a").click(function(e){
	   e.preventDefault();
	   var url = $(this).attr("href");
	   if (url != "/register" && url != "/terms") {
		   if (url.indexOf("notifications") > 0) {
			   $(".notifications").addClass("active");
		   }
		   else if (url.indexOf("user_lines") > 0) {
			   var loader = '<div class="loader"></div>';
			   if ($("body > canvas").length < 1) {
				   $("body").append(loader);
				   $(".loader").canvasLoader();
				   getLocation(0, url); 						   
			   }
		   } 		   
		   else if ($(this).hasClass("facebook")) {
			   location.assign(url);
		   }
		   else if ($(this).hasClass("logout")) {
			   location.assign(url);
		   }
		   else {
			   getPage(url);   
		   }
	   }   
	   else {
		   location.assign(url);
	   }	   
   });

   $(".back.button").click(function(){
	  $(".body").last().removeClass("active"); 
	  $(".checkin").remove();
   });


   $("#user_register").click(function() {
	   var email = $("input[name='email']").val();
	   var cemail = $("input[name='cemail']").val();
	   var password = $("input[name='password']").val();
	   var cpassword = $("input[name='cpassword']").val();
	   var firstName = $("input[name='firstName']").val();
	   var lastName = $("input[name='lastName']").val();
	   var username = $("input[name='username']").val();
	   var terms = $("input[name='terms']").val();
	   var valid = true;
	   $(".register > input").each(function(){
		   	var object = $(this);
		   	var value = object.val();
		   if (value.length < 1) {
			   object.addClass("invalid");
			   valid = false;
		   }			   	
	   });
	   $(".register > input[type='email']").each(function(){
		   	var object = $(this);
		   	var value = object.val();
		   if (!isValidEmail(value)) {
			   object.addClass("invalid");
			   valid = false;
		   }			   	
	   });

	   if (email != cemail) {
		   $("input[name='email']").addClass("invalid");
		   $("input[name='cemail']").addClass("invalid");
		   valid = false;
	   } 
	   
	   if (password != cpassword) {
		   $("input[name='password']").addClass("invalid");
		   $("input[name='cpassword']").addClass("invalid");
		   valid = false;
	   }	   
	   
	   if (terms != "on") {
		   valid = false;
	   }
	   
	   if (	valid && (email === cemail) && (password === cpassword)) {
		   userRegister(email, password, firstName, lastName, username);
		} 
   });

   $(".register input").focusout(function(){
	   var object = $(this);
	   if (object.val().length > 0) {
		   object.removeClass("invalid");
	   }
   });
   	   
   $(".register input[name='username']").focusout(function(){
	   var username = $(this).val();

	   if (username.length > 0) {
		   var value = {username:username};
		   regCheck(username);
	   }
   });
   
   $(".register input[name='email']").focusout(function(){
	   var email = $(this).val();
	   
	   if (email.length > 0) {
		   var value = {email:email};
		   regCheckEmail(email);
	   }
   });   
  
   //REMOVE FB HASH
   if (window.location.href.indexOf('#_=_') > 0) {
	    window.location = window.location.href.replace(/#.*/, '');
	}   
   
   //TERMS
   $("menu.footer li").click(function(){

	   var section = $(this).next();
	   if ($(section).hasClass("expanded")) {
		   $(this).removeClass("down");
		   $(section).removeClass("expanded");
	   }
	   else {
		   $(".section").removeClass("expanded");
		   $(this).addClass("down");
		   $(section).addClass("expanded");
		   var top =  $(section).position().top;
		   $('html, body').animate({scrollTop:top - 50}, 'slow');		   
	   }
	   
   });

   
   
   
   //set global coordinates
   //getLocation(0);
   
   // autocheckout
   /*
   setInterval(function(){
	   getLocation(1);
   },60000);
   */
   
   $("html").removeClass("disabled");
})(jQuery, this)


function getLocation(lLength, pURL)
  {
	lURL = pURL;
	$("ul.checkin").canvasLoader();
	lineLength = lLength;
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}


  }
function showPosition(position)
  {
  
  var coord = position.coords.latitude+","+position.coords.longitude;
  global_coords = [position.coords.latitude+","+position.coords.longitude];
  global_coords_lat = position.coords.latitude;
  global_coords_lon = position.coords.longitude;
	  if (parseInt(lineLength) > 1) {
		  var url = location.pathname+"/venues/";
		  getVenues(url, coord);		  
		  $("#coords").val(position.coords.latitude+", "+position.coords.longitude);
		  $("#line_length").val(lineLength);	  
	  } else if (lineLength == 1) {
		  var d = new Date()
		  var url = location.pathname+"/auto_checkout/";
		  auto_checkout(url, position.coords.latitude, position.coords.longitude);
	  } 
	  else {
		  getLines(lURL);
	  }
  }
function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred."
      break;
    }
  }
function getPage(url) {
	     $.ajax({ 
	           url: url,
	           type: 'GET',
	           cache: false, 
	           success: function(data){
	           	  markup = data;
	           	  $("section.body.right").html(data);
	           	  setTimeout(function(){
	           		$("section.body.right").addClass("active");
	           	    $(".back.button").click(function(){
	           		  $(".body").removeClass("active");
	           		  $("section.checkin").remove();
	           	    });	           		
	           	  }, 1000);           		  	           	  
	           }
	           , error: function(jqXHR, textStatus, err){
	               //alert('text status '+textStatus+', err '+err)
	               console.log('text status '+textStatus+', err '+err);	           }
	        });
 }            
   
function getNotifications(url) {
	     $.ajax({ 
	           url: url,
	           type: 'GET',
	           cache: false, 
	           success: function(data){
	           	  markup = data;
	           	  $("body .body").last().after(data);
	           	  setTimeout(function(){
	           	    $(".back.button").click(function(){
	           		  $("section.notifications").removeClass("active"); 
	           	    });	           		
	           	  }, 1000);           		  	           	  
	           }
	           , error: function(jqXHR, textStatus, err){
	               //alert('text status '+textStatus+', err '+err)
	               console.log('text status '+textStatus+', err '+err);
	           }
	        });
 }            

function ArrNoDupe(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}

function getVenues(url, coord) {
	var availableTags = [];
    $(".checkin #wrapper > p").addClass("hide");
	     $.ajax({ 
	           url: url,
	           type: 'POST',
	           cache: false,
	           data: { coordinates: coord},
	           success: function(data){
	           	  ajaxData = data;
	           	  	html = "";
		           	for(var i=0; i<data.length; i++) {
		           		if(typeof(data[i].name) != 'undefined') {
		           			html += "<li><span>"+data[i].name+"</span></li>";
		           			availableTags.push(data[i].name);
		           		}
		           		
		           	}
		           	
		          $( "#location" ).autocomplete({
		                source: availableTags
		           });
	           	  //$(".venues").html(html);
		          $("form").removeClass("hide");
		          $("canvas").addClass("hide");
			   	   $("#checkin").click(function(e){
					   var location = $("#location").val(),
					   geolocation  = $("#coords").val(),
					   //geolocation  = global_coords,
					   line_length     = $("#line_length").val();
					   var url = $("form.checkin").attr("action");
					   checkIn(location, geolocation, line_length, global_coords_lat, global_coords_lon, url);
				   });
			   	   $("input, textarea").focus(function(){
			   		   
			   		   $(this).css("color", "black");
			   	   });			   	   
	           	  
	           }
	           , error: function(jqXHR, textStatus, err){
	               //alert('text status '+textStatus+', err '+err)
	               console.log('text status '+textStatus+', err '+err);
	           }
	        });
 }  

function updatePassword(id, password, url) {
	     $.ajax({ 
	           url: url,
	           type: 'POST',
	           cache: false,
	           data: { 
	        	   id: id,
	        	   password: password},
	           success: function(data){ 
	        	   if (data === "password updated!") {
	        		   $(".body .back").click();
	        	   }
	           }
	           , error: function(jqXHR, textStatus, err){
	               //alert('text status '+textStatus+', err '+err)
	               console.log('text status '+textStatus+', err '+err);
	           }
	        });
 }  

function userRegister(email, password, firstName, lastName, username) {
	var url = "/register";
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
        	   email: email,
        	   password: password,
        	   firstName: firstName,
        	   lastName: lastName,
        	   username: username},
           success: function(data){ 
        	   if (data == 'Account was created') {
        		   location.replace(location.origin);
        	   } else {
        		   $("form > p").first().replaceWith(data);
        	   }
           	  
           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
} 

function regCheck(username) {
	var url = "/register_value";
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
        	   username: username},
           success: function(data){ 
        	   if (data == "username taken") {
        		   $("input[name='username']").addClass("invalid");
        	   } else {
        		   $("input[name='username']").removeClass("invalid");
        	   }
           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
}  

function regCheckEmail(email) {
	var url = "/register_email_value";
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
        	   email: email},
           success: function(data){ 
        	   if (data == "email taken") {
        		   $("input[name='email']").addClass("invalid");
        	   } else {
        		   $("input[name='email']").removeClass("invalid");
        	   }
           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
}  

function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
};
function updateMessages(timestamp, cID, fID, tID, messages, user, url) {
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
        	   ts: timestamp,
        	   cID: cID,
        	   fID: fID,
        	   tID: tID,
        	   user: user,
        	   messages: messages},
           success: function(data){ 
           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
} 

function updateNotificationMessages(cID, fID, messages, url, requests) {
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
        	   cID: cID,
        	   fID: fID,
        	   messages: messages,
        	   requests: requests},
           success: function(data){ 

           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
} 

function getMessages(cID, fID, url) {
    $.ajax({ 
          url: url,
          type: 'POST',
          cache: false,
          data: { 
       	   cID: cID,
       	   fID: fID},
           success: function(data){
	           	  markup = data;
	           	  $("section.body.right").html(data);
	           	  setTimeout(function(){
	           		$("section.body.right").addClass("active");
	           	    $(".back.button").click(function(){
	           		  $(".body").removeClass("active");
	           		  $("section.checkin").remove();
	           	    });	           		
	           	  }, 1000);           		  	           	  
	           }
          , error: function(jqXHR, textStatus, err){
              //alert('text status '+textStatus+', err '+err)
              console.log('text status '+textStatus+', err '+err);
          }
       });
} 

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function checkIn(location, geolocation, line_length, global_lat, global_lon, url) {

	if((location.length > 0) && (geolocation.length > 0) && (line_length.length > 0)) {
	     $.ajax({ 
	           url: url,
	           type: 'POST',
	           cache: false, 
	           data: { location: location, geolocation: geolocation, line_length: line_length, lat: global_lat, lon: global_lon }, 
	           success: function(data){
	           	  markup = data;
	              //alert('Success!');
	              $("#demo").html(data);
	              global_cID = data;
	              $(".checkin.active .back").click();
	           }
	           , error: function(jqXHR, textStatus, err){
	               alert('text status '+textStatus+', err '+err)
	               console.log('text status '+textStatus+', err '+err);
	           }
	        });
	}     
 } 

function auto_checkout(url, lat, lon) {
	if(lat) {
	     $.ajax({ 
	           url: url,
	           type: 'POST',
	           cache: false, 
	           data: { lat: lat,
	        	   	   lon: lon}, 
	           success: function(data){
	           	  markup = data;
	              //alert('Success!');
	           }
	           , error: function(jqXHR, textStatus, err){
	               //alert('text status '+textStatus+', err '+err)
	               console.log('text status '+textStatus+', err '+err);
	           }
	        });
	}     
 }


function getLines(url) {
	 if (typeof(global_coords_lat)!="undefined" && typeof(global_coords_lon)!="undefined") {
	     $.ajax({ 
	           url: url,
	           type: 'POST',
	           cache: false,
	           data: { 
	        	   lat: global_coords_lat,
	        	   lon: global_coords_lon},
		           success: function(data){
			           	  markup = data;
			           	  $("section.body.right").html(data);
			           	  setTimeout(function(){
			           		$("body > canvas").remove();
			           		$("section.body.right").addClass("active");
			           	    $(".back.button").click(function(){
			           		  $(".body").removeClass("active");
			           		  $("section.checkin").remove();
			           	    });	           		
			           	  }, 1000);           		  	           	  
			           }
	           , error: function(jqXHR, textStatus, err){
	               //alert('text status '+textStatus+', err '+err)
	               console.log('text status '+textStatus+', err '+err);
	           }
	        });		 
	 } 	else {
	     $.ajax({ 
	           url: url,
	           type: 'POST',
	           cache: false,
	           data: { 
	        	   lat: "",
	        	   lon: ""},
		           success: function(data){
			           	  markup = data;
			           	  $("section.body.right").html(data);
			           	  setTimeout(function(){
			           		$("section.body.right").addClass("active");
			           	    $(".back.button").click(function(){
			           		  $(".body").removeClass("active");
			           		  $("section.checkin").remove();
			           	    });	           		
			           	  }, 1000);           		  	           	  
			           }
	           , error: function(jqXHR, textStatus, err){
	               //alert('text status '+textStatus+', err '+err)
	               console.log('text status '+textStatus+', err '+err);
	           }
	        });			 
	 }

}  
function deviceType() {
	console.log("checking device types");
    var ua = navigator.userAgent;
    var checker = {
      iphone: ua.match(/(iPhone|iPod|iPad)/),
      windows_phone: ua.match(/IEMobile/),
      android: ua.match(/Android/)
    };
    if (checker.android){
        $('html').addClass("android");
    }
    else if (checker.iphone){
        $('html').addClass("iphone");
    }
    else if (checker.blackberry){
        $('html').addClass("blackberry");
    }
    else if (checker.windows_phone){
        $('html').addClass("IEMobile");
    }
}