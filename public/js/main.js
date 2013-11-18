  //checkin
  var x=document.getElementById("demo");
  var lineLength=0;
  var global_cID="";
  var global_fID="";
  var global_tID="";
  var html, ajaxData;
(function($, window, undefined) {


      $('.on_off :checkbox').iphoneStyle();
      $('.disabled :checkbox').iphoneStyle();
      $('.css_sized_container :checkbox').iphoneStyle({ resizeContainer: false, resizeHandle: false });
      $('.long_tiny :checkbox').iphoneStyle({ checkedLabel: 'Very Long Text', uncheckedLabel: 'Tiny' });
      
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
	   console.log("test");
	   var url = $(this).attr("href");
	   if (url != "/register") {
		   if (url.indexOf("notifications") > 0) {
			   $(".notifications").addClass("active");
		   } 
		   else {
			   console.log("getPage");
			   getPage(url);  
		   }
	   } else {
		   console.log("redirect");
		   location.assign(url);
	   }	   
   });

   $(".back.button").click(function(){
	  $(".body").last().removeClass("active"); 
	  $(".checkin").remove();
   });

   
   $("#user_register").click(function() {
	   var email = $("input[name='email']").val();
	   var password = $("input[name='password']").val();
	   var firstName = $("input[name='firstName']").val();
	   var lastName = $("input[name='lastName']").val();
	   var username = $("input[name='username']").val();
	   userRegister(email, password, firstName, lastName, username);
   });
  
})(jQuery, this)


function getLocation(lLength)
  {
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
  console.log(position);
  /*
  x.innerHTML="Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
   */
  var url = location.pathname+"/venues/";
  var coord = position.coords.latitude+","+position.coords.longitude;
  console.log(url);
  getVenues(url, coord);
  $("#coords").val(position.coords.latitude+", "+position.coords.longitude);
  $("#line_length").val(lineLength);
  
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
	console.log("get message");
	     $.ajax({ 
	           url: url,
	           type: 'GET',
	           cache: false, 
	           success: function(data){
	           	  markup = data;
	           	  //console.log(data);
	           	  $("section.body.right").html(data);
	           	  setTimeout(function(){
	           		$("section.body.right").addClass("active");
	           	    $(".back.button").click(function(){
	           	    	console.log("back button");
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
   
function getNotifications(url) {
	console.log("get message");
	     $.ajax({ 
	           url: url,
	           type: 'GET',
	           cache: false, 
	           success: function(data){
	           	  markup = data;
	           	  //console.log(data);
	           	  $("body .body").last().after(data);
	           	  setTimeout(function(){
	           		//$("section.body.right").addClass("active");
	           	    $(".back.button").click(function(){
	           		  $(".notifications").removeClass("active"); 
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
	console.log("getVenues at "+coord);
	var availableTags = [];
    $(".checkin #wrapper > p").addClass("hide");
	     $.ajax({ 
	           url: url,
	           type: 'POST',
	           cache: false,
	           data: { coordinates: coord},
	           success: function(data){
	           	  ajaxData = data;
	           	  //console.log(data);
	           	  	html = "";
		           	for(var i=0; i<data.length; i++) {
		           		console.log("assigning value");
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
					   console.log("checkin");
					   var location = $("#location").val(),
					   geolocation  = $("#coords").val(),
					   line_length     = $("#line_length").val();
					   checkIn(location, geolocation, line_length);
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
	        	   console.log(data);
	        	   if (data == 'Account was created') {
	        		   location.replace(location.origin);
	        	   } else {
		        	   $("form p").before(data);
	        	   }
	           	  
	           }
	           , error: function(jqXHR, textStatus, err){
	               //alert('text status '+textStatus+', err '+err)
	               console.log('text status '+textStatus+', err '+err);
	           }
	        });
 }  