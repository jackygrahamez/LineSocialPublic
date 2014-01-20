
function checkPageParameters(){
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

   // redirect to notifications
   setTimeout(function(){
	   $(".overlay").hide();
	   
	   if (page === "user_notifications") {
	   	console.log("user_notifications");
		   $("a[href$='user_notifications/']").click();
	   }	   
   }, 1000);	
}