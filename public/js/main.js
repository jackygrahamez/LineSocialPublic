
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
	"/js/util/notifications.js"
	], 
	function (jquery, styleswitcher, socket, motionCaptcha, underscore, iphone, jquery_ui, jquery_canvas, intlTelInput, helper, notifications) {

/*
    <script src="/js/libs/styleswitcher.js" type="text/javascript" charset="utf-8"></script>
    <script src="/socket.io/socket.io.js" type="text/javascript" charset="utf-8"></script>  
    <script src="/js/motionCaptcha.js" type="text/javascript" charset="utf-8"></script>
    <script src="/js/libs/underscore.js" type="text/javascript" charset="utf-8"></script>
    <script src="/js/libs/iphone-style-checkboxes.js" type="text/javascript" charset="utf-8"></script>
	<script src="/js/libs/jquery-ui.js" type="text/javascript" charset="utf-8"></script>
	<script src="/js/libs/jquery.canvas-loader.1.3.js" type="text/javascript" charset="utf-8"></script>
    <script src="/js/intlTelInput.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="/js/main.js" type="text/javascript" charset="utf-8"></script>

*/


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
	if ((location.href.indexOf("alpha.") < 0) && ((location.href.indexOf("localhost") < 0))) {
		if (page && path) {
			location.replace("https://alpha.linesocial.mobi/"+location.pathname+"?"+page);			
			
		} else {
			location.replace("https://alpha.linesocial.mobi");			
		}
	}
	deviceType(iosCheckbox);
      
   $("input, textarea").focus(function(){
	   
	   $(this).css("color", "black");
   });
   
   
   $(".back.button").click(function(){
	  $(".body").last().removeClass("active"); 
	  $(".checkin").remove();
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
   
   
   //set global coordinates
   //getLocation(0);
   
   // autocheckout
/*
   setInterval(function(){
	   console.log("auto checkout");
	   getLocation(1);
   },60000);
*/   
   $("html").removeClass("disabled");

/* canvas loader */

var invalid = getURLParameter('invalid');
$(".overlay > div").canvasLoader();
	setTimeout(function() {
    $(".overlay").remove();
    setTimeout(function() {
   	$(".overlay > canvas").remove();
	if (invalid) {
		$("#inputPassword").after("<label class='invalid'>Invalid Login</label>");
		$("input").addClass("invalid");
	}   	
    }, 1000);
    }, 500);

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

})(jQuery, this)






function deviceType(callback) {
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
        callback();        
    }
    else if (checker.blackberry){
        $('html').addClass("blackberry");
    }
    else if (checker.windows_phone){
        $('html').addClass("IEMobile");
    }
}

function iosCheckbox() {
	//iOS checkbox
    $('.on_off :checkbox').iphoneStyle();
    $('.disabled :checkbox').iphoneStyle();
    $('.css_sized_container :checkbox').iphoneStyle({ resizeContainer: false, resizeHandle: false });
    $('.long_tiny :checkbox').iphoneStyle({ checkedLabel: 'Very Long Text', uncheckedLabel: 'Tiny' });
    var onchange_checkbox = ($('.onchange :checkbox')).iphoneStyle({
        onChange: function(elem, value) { 
          $('span#status').html(value.toString());
        }
      });    
}

function getURLParameter(name) {
	  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
	}
});	

