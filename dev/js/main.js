
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
	"/js/util/subPageLoad.js",
	"/js/util/pageParameterCheck.js"		
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
		subPageLoad,
		pageParameterCheck) {

  //checkin

(function($, window, undefined) {
	PageLoader();
	checkPageParameters()
	redirectDomain();
	deviceType(iosCheckbox);
    registerForm();
	formatPage();
	termsClick();
	fbHashRemove();
	themeFormat();   
	teleFormat();
	contactFormat();
	homeFormat();

})(jQuery, this)

});	

