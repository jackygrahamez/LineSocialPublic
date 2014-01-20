
 var global_coords, global_coords_lat, global_coords_lon;
  var x=document.getElementById("demo");
  var lineLength=0;
  var global_coords="";
  var global_cID="";
  var global_fID="";
  var global_tID="";
  var html, ajaxData;
  var lURL; 

// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
require(
	[
	"/js/libs/jquery-1.9.1.js ",
	"/js/libs/styleswitcher.js",
	"/socket.io/socket.io.js",
	"/js/motionCaptcha.js",
	"/js/libs/underscore.js",
	"/js/libs/iphone-style-checkboxes.js",
	"/js/libs/jquery-ui.js",
	"/js/libs/jquery.canvas-loader.1.3.js",
	"/js/intlTelInput.min.js",
	"/js/util/helper.js",
	"/js/util/notifications.js",
	"/js/util/register.js",
	"/js/util/redirect.js",
	"/js/util/canvasLoader.js",
	"/js/util/telephoneValidation.js",
	"/js/util/subPageLoad.js"	
	], 
	function (jquery, 
		styleswitcher, 
		socket, 
		motionCaptcha, 
		underscore, 
		iphone,
		jquery_ui, 
		jquery_canvas, 
		intlTelInput, 
		helper, 
		notifications, 
		redirect,
		canvasLoader,
		telephoneValidation,
		subPageLoad) {

  //checkin

(function($, window, undefined) {

	var page = null;
	var path = null;
	var email_validation = getURLParameter("email_validation");
	var telephone_validation = getURLParameter("telephone_validation");

	if (email_validation) {
		codeValidate( email_validation, "/send_validate_email_code");
	}

	if (telephone_validation) {
		codeValidate( telephone_validation, "/send_validate_phone_code");
	}

	try {
		path = location.pathname;
		page = getURLParameter("pagename");
	}
	catch(err) {
	  console.log("could not find parameter pagename");		
	}	

	redirectDomain();

	deviceType(iosCheckbox);
      
   $("input, textarea").focus(function(){
	   $(this).css("color", "black");
   });
   
   $(".back.button").click(function(){
	  $(".body").last().removeClass("active"); 
	  $(".checkin").remove();
   });

   registerForm();
  
   $("input[name='terms']").click(function(){
	   $(this).removeClass("invalid");
	   $("form label").removeClass("invalid");
   });
   
   
   //REMOVE FB HASH
   if (window.location.href.indexOf('#_=_') > 0) {
	    window.location = window.location.href.replace(/#.*/, '');
	}   
   //TERMS
   $("menu.footer li").click(function(){
	 if (!$(this).hasClass("expanded")) {
		   var section = $(this).next();
		   if ($(section).hasClass("expanded")) {
			   $(this).removeClass("down");
			   $(section).removeClass("expanded");
		   }
		   else {
			   $(".down").removeClass("down");
			   $(".expanded").removeClass("expanded");
			   $(this).addClass("down");
			   $(section).addClass("expanded");
			   
			   var top =  $(section).position().top;
			   $('html, body').animate({scrollTop:top - 50}, 'slow');		   
		   }		 
	 }
   });

   
   //Themes
   $("menu.themes li").click(function(){
	   $(this).siblings().removeClass("active");
	   $(this).addClass("active");
	   var themeColor = $(this).attr("rel");
	   setActiveStyleSheet(themeColor);
   });
   
   $("menu.themes > li").first().addClass("active");
   
   $("link").each(function(){ 
	   if(!$(this).attr("disabled") && ( $(this).attr("title") != undefined)) {
		   var theme = $(this).attr("title");
		   $(".themes li[rel='"+theme+"']").click();
	   } 
	});
   
   $("input[name='telephone']").intlTelInput();
   
   // redirect to notifications
   setTimeout(function(){
	   $(".overlay").hide();
	   
	   if (page === "user_notifications") {
		   $("a[href$='user_notifications/']").click();
	   }	   
   }, 1000);

   $(".forgot_password div.back.button, .forgot div.back.button").click(function(){
	   location.assign("/");
   });
   

   $("html").removeClass("disabled");

  /* contact */

  var shape = $(".contact_captcha_shape").attr("value");
  var name = $(".contact_captcha_name").attr("value");
  var email = $(".contact_captcha_email").attr("value");
  var message = $(".contact_captcha_message").attr("value");
  var error = $(".contact_captcha_error").attr("value");
  var send_message = $(".contact_captcha_send_message").attr("value");

  if (error != "mc-invalid") { error = ""; }

    if ($("section").hasClass("password_reset")) {
		$('#captcha').motionCaptcha(shape);	   
    }

    $(".footer li[name='contact']").click(function(){
       	$("#captcha").remove(); 
		var contact_form = '<form id="captcha" method="POST" action="/contact">' +
        '	<input type="text" id="contactName" name="name" placeholder="'+name+'"> '+
        '	<input type="email" id="contactEmail" name="email" placeholder="'+email+'"> '+
        '	<input type="text" id="contactMessage" name="message" placeholder="'+message+'"> '+
		    '<div id="mc">'+
        '    <canvas id="mc-canvas" class="'+error+'"></canvas>'+
        '</div>'+  
        '<input id="submit" type="submit" value="'+send_message+'">'+
        '</form>';
        $(".footer li.contact").append(contact_form); 
        $('#captcha').motionCaptcha(shape);
    });



/* home */

if ($("body").hasClass("home")) {
	console.log("home");
	if ($(".cID").attr("value") != "undefined") {
		autocheckout();
	}	

	var username = $(".username").attr("value");
	var notification_url = "/"+username+"/user_notifications/"; 
	console.log("notification_url "+notification_url);
	getNotifications(notification_url);

}       

	   
	   $(".login a").click(function(e){
		   e.preventDefault();
		   var url = $(this).attr("href");
		   console.log("url "+url);
		   if (url.indexOf("notifications") > 0) {
			   $(".notifications").addClass("active");
		   } 	   
		   else {
		   		if (url.indexOf("messages") > 0) {
				 	global_cID = $(this).children().children().children("#cID").attr("value");
					global_fID = $(this).children().children().children("#fID").attr("value");
					global_tID = $(this).children().children().children("#tID").attr("value");
					global_toUser = $(this).children().children().children(".name").text();	
					var tester = $(this).children().children().children("#tester").attr("value");	
					var session_id = $(this).children().children().children("#session_id").attr("value");
					getMessages(global_cID, global_fID, tester, session_id, url);				  
				}
				else if (url.indexOf("user_lines") > 0) {
					console.log("user_lines");
			   		$('html, body').animate({scrollTop:top - 50}, 'slow');	
				    var loader = '<div class="loader" style="'
					    +"position: fixed;"
					    +"height: 100%;"
					    +"width: 100%;"
					    +"top: 40px;"
					    +"left: 0px;"
					    +"background: rgba(0,0,0, 0.2);"
					    +'"><div></div></div>';
				   if ($("body > canvas").length < 1) {
					   $("body").append(loader);
					   $(".loader > div").canvasLoader();
					   console.log("url "+url);
					   getLocation(0, url); 						   
				   }					
				}
				else {
				    getPage(url);
			   }  
		   }	
	   }); 

})(jQuery, this)

});	

