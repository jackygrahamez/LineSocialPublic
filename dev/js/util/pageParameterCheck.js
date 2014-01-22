
function checkPageParameters(){
	var page = null;
	var path = null;
	var email_validation = getURLParameter("email_validation");
	var telephone_validation = getURLParameter("telephone_validation");
	var invite_code = getURLParameter("invite_code");
	var unsubscribe = getURLParameter("unsubscribe");
	console.log("unsubscribe "+unsubscribe);

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

   // redirect to notifications
   setTimeout(function(){
	   $(".overlay").hide();
	   
	   if (page === "user_notifications") {
	   	console.log("user_notifications");
		   $("a[href$='user_notifications/']").click();
	   }	   
	   console.log("invite_code "+invite_code);
	   if (invite_code) {
	   		setCookie("invite_code", invite_code, 365);	
	   }
	   
	   if (unsubscribe) {
	   		sendUnsubscribe(unsubscribe);
	   }
	   
   }, 1000);	

   
}


function setCookie(cname,cvalue,exdays)
{
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}