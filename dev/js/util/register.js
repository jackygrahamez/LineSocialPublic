function registerForm() {
//Register
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
 }  

function getCookie(cname)
{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) 
	  {
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	  }
	return "";
}